const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");



const readTasks = () => {

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]");
    }

    const data = fs.readFileSync(filePath, "utf8");

    return JSON.parse(data);

};


const saveTasks = (tasks) => {

    fs.writeFileSync(
        filePath,
        JSON.stringify(tasks, null, 2)
    );

};



exports.getAllTasks = (req, res) => {

    try {

        const tasks = readTasks();

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



exports.getTaskById = (req, res) => {

    try {

        const tasks = readTasks();

        const task = tasks.find(
            task => task.id == req.params.id
        );

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        res.status(200).json(task);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



exports.createTask = (req, res) => {

    try {

        const { text } = req.body;

        if (!text || text.trim() === "") {

            return res.status(400).json({
                success: false,
                message: "Task text is required"
            });

        }

        const tasks = readTasks();

        const newTask = {

            id: Date.now(),

            text: text.trim(),

            completed: false,

            createdAt: new Date().toISOString()

        };

        tasks.push(newTask);

        saveTasks(tasks);

        res.status(201).json({
            success: true,
            message: "Task Created Successfully",
            task: newTask
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



exports.updateTask = (req, res) => {

    try {

        const tasks = readTasks();

        const index = tasks.findIndex(
            task => task.id == req.params.id
        );

        if (index === -1) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        tasks[index] = {

            ...tasks[index],

            ...req.body

        };

        saveTasks(tasks);

        res.status(200).json({
            success: true,
            message: "Task Updated Successfully",
            task: tasks[index]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


exports.deleteTask = (req, res) => {

    try {

        const tasks = readTasks();

        const task = tasks.find(
            task => task.id == req.params.id
        );

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        const updatedTasks = tasks.filter(
            task => task.id != req.params.id
        );

        saveTasks(updatedTasks);

        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};