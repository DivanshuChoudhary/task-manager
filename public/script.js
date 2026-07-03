const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const searchTask = document.getElementById("searchTask");
const taskList = document.getElementById("taskList");
const toast = document.getElementById("toast");

let tasks = [];

// =============================
// Toast Notification
// =============================

function showToast(message, color = "#16a34a") {

    toast.innerText = message;
    toast.style.background = color;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// =============================
// Load Tasks
// =============================

async function loadTasks() {

    try {

        const response = await fetch("/api/tasks");

        tasks = await response.json();

        displayTasks(tasks);

    } catch (error) {

        console.log(error);

        showToast("Server Error", "#dc2626");

    }

}

// =============================
// Display Tasks
// =============================

function displayTasks(taskArray) {

    taskList.innerHTML = "";

    if (taskArray.length === 0) {

        taskList.innerHTML = `
        <li style="justify-content:center;">
            No Tasks Found
        </li>
        `;

        return;

    }

    taskArray.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `

        <span class="${task.completed ? "completed" : ""}">

            ${task.text}

        </span>

        <div class="task-actions">

            <button class="complete-btn">

                ✔

            </button>

            <button class="edit-btn">

                ✏

            </button>

            <button class="delete-btn">

                🗑

            </button>

        </div>

        `;

        // Complete

        li.querySelector(".complete-btn").onclick = async () => {

            await fetch(`/api/tasks/${task.id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    text: task.text,

                    completed: !task.completed

                })

            });

            showToast("Task Updated");

            loadTasks();

        };

        // Edit

        li.querySelector(".edit-btn").onclick = async () => {

            const newTask = prompt("Edit Task", task.text);

            if (!newTask) return;

            await fetch(`/api/tasks/${task.id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    text: newTask,

                    completed: task.completed

                })

            });

            showToast("Task Edited");

            loadTasks();

        };

        // Delete

        li.querySelector(".delete-btn").onclick = async () => {

            const confirmDelete = confirm("Delete this task?");

            if (!confirmDelete) return;

            await fetch(`/api/tasks/${task.id}`, {

                method: "DELETE"

            });

            showToast("Task Deleted", "#dc2626");

            loadTasks();

        };

        taskList.appendChild(li);

    });

}

// =============================
// Add Task
// =============================

addBtn.addEventListener("click", async () => {

    const text = taskInput.value.trim();

    if (text === "") {

        showToast("Please Enter Task", "#f59e0b");

        return;

    }

    await fetch("/api/tasks", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            text

        })

    });

    taskInput.value = "";

    showToast("Task Added Successfully");

    loadTasks();

});

// =============================
// Search
// =============================

searchTask.addEventListener("keyup", () => {

    const keyword = searchTask.value.toLowerCase();

    const filtered = tasks.filter(task =>

        task.text.toLowerCase().includes(keyword)

    );

    displayTasks(filtered);

});

// =============================
// Enter Key Support
// =============================

taskInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        addBtn.click();

    }

});

// =============================

loadTasks();