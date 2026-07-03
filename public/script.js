const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

async function loadTasks() {

    const response = await fetch("/api/tasks");

    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {

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

        li.querySelector(".complete-btn").addEventListener("click", async () => {

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

        });

        // Edit

        li.querySelector(".edit-btn").addEventListener("click", async () => {

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

        });

        // Delete

        li.querySelector(".delete-btn").addEventListener("click", async () => {

            await fetch(`/api/tasks/${task.id}`, {

                method: "DELETE"

            });

            loadTasks();

        });

        taskList.appendChild(li);

    });

}

addBtn.addEventListener("click", async () => {

    const text = taskInput.value.trim();

    if (!text) return;

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

loadTasks();