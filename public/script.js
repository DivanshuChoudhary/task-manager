const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load Tasks
async function loadTasks() {

    const response = await fetch("/api/tasks");

    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task.text}</span>
        `;

        taskList.appendChild(li);

    });

}

// Add Task
addBtn.addEventListener("click", async () => {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Enter a task");
        return;
    }

    await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    taskInput.value = "";

    loadTasks();

});

// Load tasks when page opens
loadTasks();