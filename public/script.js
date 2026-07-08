

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const searchTask = document.getElementById("searchTask");
const taskList = document.getElementById("taskList");
const toast = document.getElementById("toast");

let tasks = [];



function showToast(message, color = "#16a34a") {

    toast.innerText = message;
    toast.style.background = color;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}



async function loadTasks() {

    try {

        const response = await fetch("/api/tasks");

        tasks = await response.json();

        displayTasks(tasks);

    } catch (error) {

        console.error(error);

        showToast("Server Error", "#dc2626");

    }

}



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

                <button class="complete-btn">✔</button>

                <button class="edit-btn">✏</button>

                <button class="delete-btn">🗑</button>

            </div>

        `;

       

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

            showToast("Task Updated");

            loadTasks();

        });

        

        li.querySelector(".edit-btn").addEventListener("click", async () => {

            const newText = prompt("Edit Task", task.text);

            if (!newText) return;

            await fetch(`/api/tasks/${task.id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    text: newText,

                    completed: task.completed

                })

            });

            showToast("Task Edited");

            loadTasks();

        });

       

        li.querySelector(".delete-btn").addEventListener("click", async () => {

            if (!confirm("Delete this task?")) return;

            await fetch(`/api/tasks/${task.id}`, {

                method: "DELETE"

            });

            showToast("Task Deleted", "#dc2626");

            loadTasks();

        });

        taskList.appendChild(li);

    });

}



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



searchTask.addEventListener("keyup", () => {

    const keyword = searchTask.value.toLowerCase();

    const filtered = tasks.filter(task =>
        task.text.toLowerCase().includes(keyword)
    );

    displayTasks(filtered);

});



taskInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        addBtn.click();

    }

});



loadTasks();