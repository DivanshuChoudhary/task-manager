async function loadDashboard() {

    const response = await fetch("/api/tasks");

    const tasks = await response.json();

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const pending = total - completed;

    document.getElementById("totalTasks").innerText = total;

    document.getElementById("completedTasks").innerText = completed;

    document.getElementById("pendingTasks").innerText = pending;

    const recentTaskList = document.getElementById("recentTaskList");

    recentTaskList.innerHTML = "";

    tasks.slice(-5).reverse().forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${task.completed ? "✅" : "⏳"} ${task.text}
        `;

        recentTaskList.appendChild(li);

    });

}

loadDashboard();