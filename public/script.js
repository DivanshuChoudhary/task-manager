const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");

// Add Task
addBtn.addEventListener("click", addTask);

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskText}</span>

        <div class="task-actions">

            <button class="complete-btn">✔</button>

            <button class="edit-btn">✏</button>

            <button class="delete-btn">🗑</button>

        </div>
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    // Complete Task
    li.querySelector(".complete-btn").addEventListener("click", () => {

        li.querySelector("span").classList.toggle("completed");

    });

    // Delete Task
    li.querySelector(".delete-btn").addEventListener("click", () => {

        li.remove();

    });

    // Edit Task
    li.querySelector(".edit-btn").addEventListener("click", () => {

        const span = li.querySelector("span");

        const updatedTask = prompt("Edit Task", span.innerText);

        if (updatedTask !== null && updatedTask.trim() !== "") {

            span.innerText = updatedTask;

        }

    });

}

// Search Task

searchTask.addEventListener("keyup", () => {

    const filter = searchTask.value.toLowerCase();

    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {

        const text = task.innerText.toLowerCase();

        if (text.includes(filter)) {

            task.style.display = "flex";

        } else {

            task.style.display = "none";

        }

    });

});
