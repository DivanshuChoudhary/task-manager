const express = require("express");

const router = express.Router();

const {

    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask

} = require("../controllers/taskController");

// ===============================
// GET All Tasks
// ===============================

router.get("/", getAllTasks);

// ===============================
// GET Single Task
// ===============================

router.get("/:id", getTaskById);

// ===============================
// CREATE Task
// ===============================

router.post("/", createTask);

// ===============================
// UPDATE Task
// ===============================

router.put("/:id", updateTask);

// ===============================
// DELETE Task
// ===============================

router.delete("/:id", deleteTask);

module.exports = router;