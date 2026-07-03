const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

// Dashboard Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Tasks Page
app.get("/tasks", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "tasks.html"));
});

// Completed Page
app.get("/completed", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "completed.html"));
});

// Pending Page
app.get("/pending", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pending.html"));
});

// Analytics Page
app.get("/analytics", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "analytics.html"));
});

// About Page
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log("====================================");
    console.log(`🚀 Server Running Successfully`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("====================================");
});