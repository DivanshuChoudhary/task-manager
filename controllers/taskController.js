const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

function readTasks() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function writeTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// GET
const getTasks = (req, res) => {
    res.json(readTasks());
};

// POST
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

// DELETE
const deleteTask = (req, res) => {

    const id = Number(req.params.id);

    let tasks = readTasks();

    tasks = tasks.filter(task => task.id !== id);

    writeTasks(tasks);

    res.json({ message: "Deleted Successfully" });

};

// UPDATE
const updateTask = (req, res) => {

    const id = Number(req.params.id);

    const tasks = readTasks();

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task Not Found"
        });
    }

    task.text = req.body.text;
    task.completed = req.body.completed;

    writeTasks(tasks);

    res.json(task);

};

module.exports = {
    getTasks,
    addTask,
    deleteTask,
    updateTask
};