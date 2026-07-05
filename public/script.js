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

