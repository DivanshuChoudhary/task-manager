const express = require("express");
const cors = require("cors");
const path = require("path");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ===========================
// Middleware
// ===========================
app.use(cors());
app.use(express.json());

// ===========================
// Serve Frontend (public folder)
// ===========================
app.use(express.static(path.join(__dirname, "public")));

// ===========================
// API Routes
// ===========================
app.use("/api/tasks", taskRoutes);

// ===========================
// Default Route (Dashboard)
// ===========================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// ===========================
// Start Server
// ===========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});