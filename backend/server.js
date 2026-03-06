const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// ── Connect to MongoDB Atlas ──────────────────────────────────────────────
connectDB();

// ── Middleware ────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── API Routes ────────────────────────────────────────────────────────────
app.get("/api", (req, res) => {
    res.json({ message: "The Design Theory API is running ✅" });
});

app.use("/api", userRoutes);

// ── Serve Next.js Standalone Build ────────────────────────────────────────
const NEXT_BUILD = path.join(__dirname, "../frontend/.next/standalone");
const NEXT_STATIC = path.join(__dirname, "../frontend/.next/static");
const NEXT_PUBLIC = path.join(__dirname, "../frontend/public");

// Serve Next.js static chunks and public assets
app.use("/_next/static", express.static(NEXT_STATIC));
app.use("/", express.static(NEXT_PUBLIC));

// Hand everything else to the Next.js request handler
let nextHandler;
try {
    const NextServer = require(path.join(NEXT_BUILD, "node_modules/next/dist/server/next.js"));
    const nextApp = NextServer.default({
        dev: false,
        dir: NEXT_BUILD,
        conf: require(path.join(NEXT_BUILD, ".next/required-server-files.json")).config,
    });
    nextHandler = nextApp.getRequestHandler();
    nextApp.prepare().then(() => {
        console.log("✅  Next.js handler ready");
    });
} catch (e) {
    console.warn("⚠️  Next.js standalone build not found. Run `npm run build` first.");
    console.warn("   Falling back: non-API routes will return 404 until build exists.");
}

// ── Catch-all → Next.js or 404 ────────────────────────────────────────────
app.use((req, res) => {
    if (nextHandler) {
        return nextHandler(req, res);
    }
    res.status(404).json({
        success: false,
        message: "Frontend not built yet. Run `npm run build` first.",
    });
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅  Server running on http://localhost:${PORT}`);
    console.log(`   API  → http://localhost:${PORT}/api`);
    console.log(`   App  → http://localhost:${PORT}`);
});