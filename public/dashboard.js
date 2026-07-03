// =====================================
// Dashboard Script
// =====================================

async function loadDashboard() {

    try {

        const response = await fetch("/api/tasks");
        const tasks = await response.json();

        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;

        animateCounter("totalTasks", total);
        animateCounter("completedTasks", completed);
        animateCounter("pendingTasks", pending);

        // Progress Bar
        const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

        const progressBar = document.getElementById("progressBar");
        const progressText = document.getElementById("progressText");

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

        if (progressText) {
            progressText.innerText = progress + "% Completed";
        }

        // Recent Tasks
        const recentList = document.getElementById("recentTaskList");

        if (recentList) {

            recentList.innerHTML = "";

            if (tasks.length === 0) {

                recentList.innerHTML = `
                    <li>No Tasks Available</li>
                `;

            } else {

                tasks
                    .slice(-5)
                    .reverse()
                    .forEach(task => {

                        const li = document.createElement("li");

                        li.innerHTML = `
                            <span>
                                ${task.completed ? "✅" : "⏳"} ${task.text}
                            </span>

                            <strong>
                                ${task.completed ? "Completed" : "Pending"}
                            </strong>
                        `;

                        recentList.appendChild(li);

                    });

            }

        }

    } catch (err) {

        console.error(err);

    }

}

// =====================================
// Counter Animation
// =====================================

function animateCounter(id, target) {

    const element = document.getElementById(id);

    if (!element) return;

    let current = 0;

    const timer = setInterval(() => {

        current++;

        element.innerText = current;

        if (current >= target) {

            clearInterval(timer);

        }

    }, 25);

}

loadDashboard();