const express = require("express");

const router = express.Router();

const {
    getTasks,
    addTask,
    deleteTask,
    updateTask
} = require("../controllers/taskController");

router.get("/", getTasks);

router.post("/", addTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;