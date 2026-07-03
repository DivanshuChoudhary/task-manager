const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

// Read File
function readTasks() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Write File
function writeTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// GET Tasks
const getTasks = (req, res) => {

    const tasks = readTasks();

    res.json(tasks);

};

// POST Task
const addTask = (req, res) => {

    const tasks = readTasks();

    const newTask = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };

    tasks.push(newTask);

    writeTasks(tasks);

    res.status(201).json(newTask);

};

// DELETE Task

const deleteTask = (req, res) => {

    const id = Number(req.params.id);

    let tasks = readTasks();

    tasks = tasks.filter(task => task.id !== id);

    writeTasks(tasks);

    res.json({
        message: "Task Deleted"
    });

};

module.exports = {
    getTasks,
    addTask,
    deleteTask
};