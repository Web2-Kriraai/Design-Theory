const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Connect to MongoDB Atlas
connectDB();

// ── Middleware ────────────────────────────────────────────────────────────
app.use(
    cors({
        origin: [
            "http://localhost:3000",  // Next.js dev
            process.env.FRONTEND_URL || "",
        ].filter(Boolean),
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.json({ message: "The Design Theory API is running ✅" });
});

app.use("/api", userRoutes);

// ── 404 Handler ───────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global Error Handler ──────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later.",
    });
});

// ── Start Server ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅  Server running on http://localhost:${PORT}`);
});