const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

// Read Tasks
const getTasks = (req, res) => {

    const data = fs.readFileSync(filePath);

    const tasks = JSON.parse(data);

    res.json(tasks);

};

// Add Task
const addTask = (req, res) => {

    const { text } = req.body;

    const data = fs.readFileSync(filePath);

    const tasks = JSON.parse(data);

    const newTask = {
        id: Date.now(),
        text,
        completed: false
    };

    tasks.push(newTask);

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    res.status(201).json(newTask);

};

module.exports = {
    getTasks,
    addTask
};