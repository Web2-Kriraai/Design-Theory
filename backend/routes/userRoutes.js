const express = require("express");
const router = express.Router();
const Enquiry = require("../model/enquiry");

// ── POST /api/enquiry ── Submit a new enquiry ──────────────────────────────
router.post("/enquiry", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, projectType, message } =
      req.body;

    // --- Manual validation (mirrors frontend validation) ---
    const errors = {};

    if (!firstName || firstName.trim() === "") {
      errors.firstName = "First name is required";
    }
    if (!lastName || lastName.trim() === "") {
      errors.lastName = "Last name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    const validProjectTypes = [
      "residential",
      "commercial",
      "architecture",
      "renovation",
      "visualization",
      "turnkey",
      "consultation",
    ];
    if (!projectType || !validProjectTypes.includes(projectType)) {
      errors.projectType = "Please select a valid project type";
    }

    if (!message || message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // --- Save to MongoDB via Mongoose ---
    const enquiry = await Enquiry.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.replace(/\s/g, ""),
      projectType,
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      id: enquiry._id,
    });
  } catch (error) {
    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ success: false, errors });
    }

    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting your enquiry. Please try again later.",
    });
  }
});

// ── GET /api/enquiries ── Fetch all enquiries (admin use) ─────────────────
router.get("/enquiries", async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: enquiries });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries.",
    });
  }
});

// ── PATCH /api/enquiries/:id/status ── Update enquiry status ─────────────
router.patch("/enquiries/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["new", "contacted", "closed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Must be: new, contacted, or closed.",
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found." });
    }

    return res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ success: false, message: "Failed to update status." });
  }
});

module.exports = router;
