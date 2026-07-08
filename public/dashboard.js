

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const recentTaskList = document.getElementById("recentTaskList");



async function loadDashboard() {

    try {

        const response = await fetch("/api/tasks");

        const tasks = await response.json();

        // Total Tasks
        totalTasks.innerText = tasks.length;

        // Completed Tasks
        const completed = tasks.filter(task => task.completed);

        completedTasks.innerText = completed.length;

        // Pending Tasks
        const pending = tasks.filter(task => !task.completed);

        pendingTasks.innerText = pending.length;

        // Recent Tasks
        recentTaskList.innerHTML = "";

        if (tasks.length === 0) {

            recentTaskList.innerHTML = `
                <li>No Tasks Available</li>
            `;

            return;
        }

        // Latest 5 Tasks
        tasks
            .slice(-5)
            .reverse()
            .forEach(task => {

                const li = document.createElement("li");

                li.innerHTML = `
                    <span class="${task.completed ? "completed" : ""}">
                        ${task.text}
                    </span>
                `;

                recentTaskList.appendChild(li);

            });

    }

    catch (error) {

        console.error(error);

        recentTaskList.innerHTML = `
            <li>Unable to Load Tasks</li>
        `;

    }

}



loadDashboard();