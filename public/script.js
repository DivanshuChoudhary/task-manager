const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const searchTask = document.getElementById("searchTask");
const taskList = document.getElementById("taskList");

let tasks = [];

// Load Tasks
async function loadTasks() {
    try {
        const response = await fetch("/api/tasks");
        tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error(error);
    }
}

// Display Tasks
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

                <button class="complete-btn">✔</button>

                <button class="edit-btn">✏</button>

                <button class="delete-btn">🗑</button>

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

            loadTasks();

        };

        // Delete
        li.querySelector(".delete-btn").onclick = async () => {

            if (!confirm("Delete this task?")) return;

            await fetch(`/api/tasks/${task.id}`, {
                method: "DELETE"
            });

            loadTasks();

        };

        taskList.appendChild(li);

    });

}

// Add Task
addBtn.addEventListener("click", async () => {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
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

    loadTasks();

});

// Search Task
searchTask.addEventListener("keyup", () => {

    const keyword = searchTask.value.toLowerCase();

    const filtered = tasks.filter(task =>
        task.text.toLowerCase().includes(keyword)
    );

    displayTasks(filtered);

});

// Initial Load
loadTasks();