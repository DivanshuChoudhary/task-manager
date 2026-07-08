const express = require("express");
const cors = require("cors");
const path = require("path");

const taskRoutes = require("./routes/taskRoutes");

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/tasks", taskRoutes);



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



app.use(express.static(path.join(__dirname, "public")));



app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("=================================");
    console.log("🚀 Server Running");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("=================================");
});