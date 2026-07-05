const completedList = document.getElementById("completedList");

async function loadCompletedTasks() {

    try {

        const response = await fetch("/api/tasks");

        const tasks = await response.json();

        const completedTasks = tasks.filter(task => task.completed);

        completedList.innerHTML = "";

        if (completedTasks.length === 0) {

            completedList.innerHTML = `
                <li>No Completed Tasks</li>
            `;

            return;

        }

        completedTasks.forEach(task => {

            const li = document.createElement("li");

            li.innerHTML = `

                <span class="completed">

                    ${task.text}

                </span>

            `;

            completedList.appendChild(li);

        });

    }

    catch (error) {

        console.error(error);

        completedList.innerHTML = `
            <li>Unable to Load Tasks</li>
        `;

    }

}

loadCompletedTasks();