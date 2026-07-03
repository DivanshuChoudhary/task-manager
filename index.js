const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server Running at http://localhost:${PORT}`);
});