const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

// ===========================
// Read Tasks
// ===========================

function readTasks() {

    if (!fs.existsSync(filePath)) {

        fs.writeFileSync(filePath, "[]");

    }

    const data = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(data);

}

// ===========================
// Save Tasks
// ===========================

function saveTasks(tasks) {

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

}

// ===========================
// GET All Tasks
// ===========================

exports.getAllTasks = (req, res) => {

    const tasks = readTasks();

    res.json(tasks);

};

// ===========================
// GET Task By ID
// ===========================

exports.getTaskById = (req, res) => {

    const tasks = readTasks();

    const task = tasks.find(t => t.id == req.params.id);

    if (!task) {

        return res.status(404).json({

            message: "Task Not Found"

        });

    }

    res.json(task);

};

// ===========================
// CREATE Task
// ===========================

exports.createTask = (req, res) => {

    const tasks = readTasks();

    const newTask = {

        id: Date.now(),

        text: req.body.text,

        completed: false

    };

    tasks.push(newTask);

    saveTasks(tasks);

    res.status(201).json({

        message: "Task Added Successfully",

        task: newTask

    });

};

// ===========================
// UPDATE Task
// ===========================

exports.updateTask = (req, res) => {

    const tasks = readTasks();

    const index = tasks.findIndex(t => t.id == req.params.id);

    if (index === -1) {

        return res.status(404).json({

            message: "Task Not Found"

        });

    }

    tasks[index] = {

        ...tasks[index],

        ...req.body

    };

    saveTasks(tasks);

    res.json({

        message: "Task Updated",

        task: tasks[index]

    });

};

// ===========================
// DELETE Task
// ===========================

exports.deleteTask = (req, res) => {

    const tasks = readTasks();

    const filtered = tasks.filter(t => t.id != req.params.id);

    saveTasks(filtered);

    res.json({

        message: "Task Deleted"

    });

};