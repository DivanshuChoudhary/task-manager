const express = require("express");
const path = require("path");

const app = express();

const PORT = 5000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});