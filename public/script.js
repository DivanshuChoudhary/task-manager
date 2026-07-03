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

                <button class="delete-btn">
                    🗑
                </button>

            </div>
        `;

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

    if (text === "") {

        alert("Please Enter Task");

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

loadTasks();