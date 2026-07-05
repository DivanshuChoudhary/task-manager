const pendingList = document.getElementById("pendingList");

async function loadPendingTasks() {

    try {

        const response = await fetch("/api/tasks");

        const tasks = await response.json();

        const pendingTasks = tasks.filter(task => !task.completed);

        pendingList.innerHTML = "";

        if (pendingTasks.length === 0) {

            pendingList.innerHTML = `
                <li>No Pending Tasks</li>
            `;

            return;

        }

        pendingTasks.forEach(task => {

            const li = document.createElement("li");

            li.innerHTML = `

                <span>

                    ${task.text}

                </span>

            `;

            pendingList.appendChild(li);

        });

    }

    catch (error) {

        console.error(error);

        pendingList.innerHTML = `
            <li>Unable to Load Tasks</li>
        `;

    }

}

loadPendingTasks();