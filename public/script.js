// ===================================
// DOM Elements
// ===================================

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const searchTask = document.getElementById("searchTask");
const taskList = document.getElementById("taskList");
const toast = document.getElementById("toast");

let tasks = [];

// ===================================
// Toast Notification
// ===================================

function showToast(message, color = "#16a34a") {

    toast.innerText = message;

    toast.style.background = color;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// ===================================
// Load Tasks
// ===================================

async function loadTasks() {

    try {

        const response = await fetch("/api/tasks");

        tasks = await response.json();

        displayTasks(tasks);

    }

    catch (error) {

        console.error(error);

        showToast("Unable to connect to server", "#dc2626");

    }

}

// ===================================
// Display Tasks
// ===================================

function displayTasks(taskArray) {

    taskList.innerHTML = "";

    if (taskArray.length === 0) {

        taskList.innerHTML = `
            <li style="justify-content:center;">
                No Tasks Available
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

        taskList.appendChild(li);

    });

}

// ===================================
// Complete Task
// ===================================

li.querySelector(".complete-btn").addEventListener("click", async () => {

    try {

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

        showToast("Task Updated Successfully");

        loadTasks();

    }

    catch (error) {

        console.error(error);

        showToast("Update Failed", "#dc2626");

    }

});

// ===================================
// Edit Task
// ===================================

li.querySelector(".edit-btn").addEventListener("click", async () => {

    const newText = prompt("Edit Task", task.text);

    if (!newText || newText.trim() === "") return;

    try {

        await fetch(`/api/tasks/${task.id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                text: newText.trim(),

                completed: task.completed

            })

        });

        showToast("Task Edited Successfully");

        loadTasks();

    }

    catch (error) {

        console.error(error);

        showToast("Edit Failed", "#dc2626");

    }

});

// ===================================
// Delete Task
// ===================================

li.querySelector(".delete-btn").addEventListener("click", async () => {

    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) return;

    try {

        await fetch(`/api/tasks/${task.id}`, {

            method: "DELETE"

        });

        showToast("Task Deleted Successfully", "#dc2626");

        loadTasks();

    }

    catch (error) {

        console.error(error);

        showToast("Delete Failed", "#dc2626");

    }

});

// ===================================
// Add New Task
// ===================================

addBtn.addEventListener("click", async () => {

    const text = taskInput.value.trim();

    if (text === "") {

        showToast("Please Enter a Task", "#f59e0b");

        return;

    }

    try {

        const response = await fetch("/api/tasks", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                text: text

            })

        });

        if (!response.ok) {

            throw new Error("Failed to add task");

        }

        taskInput.value = "";

        showToast("Task Added Successfully");

        loadTasks();

    }

    catch (error) {

        console.error(error);

        showToast("Unable to Add Task", "#dc2626");

    }

});

// ===================================
// Search Tasks
// ===================================

searchTask.addEventListener("keyup", () => {

    const keyword = searchTask.value.toLowerCase();

    const filtered = tasks.filter(task =>

        task.text.toLowerCase().includes(keyword)

    );

    displayTasks(filtered);

});

// ===================================
// Enter Key Support
// ===================================

taskInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        addBtn.click();

    }

});

// ===================================
// Initial Load
// ===================================

loadTasks();