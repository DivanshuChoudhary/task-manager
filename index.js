const express = require("express");
const cors = require("cors");
const path = require("path");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ================================
// Middleware
// ================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// API Routes
// ================================

app.use("/api/tasks", taskRoutes);

// ================================
// Frontend Routes
// ================================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/tasks", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "tasks.html"));
});

app.get("/completed", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "completed.html"));
});

app.get("/pending", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pending.html"));
});

app.get("/analytics", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "analytics.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
});

// ================================
// Static Files (CSS, JS, Images)
// ================================

app.use(express.static(path.join(__dirname, "public")));

// ================================
// 404 Route
// ================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ================================
// Server
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("=================================");
    console.log("🚀 Server Running");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("=================================");
});