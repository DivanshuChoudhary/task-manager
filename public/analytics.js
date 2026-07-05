const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

async function loadAnalytics() {

    try {

        const response = await fetch("/api/tasks");

        const tasks = await response.json();

        const total = tasks.length;

        const completed = tasks.filter(task => task.completed).length;

        const pending = total - completed;

        totalTasks.innerText = total;
        completedTasks.innerText = completed;
        pendingTasks.innerText = pending;

        const ctx = document.getElementById("taskChart");

        new Chart(ctx, {

            type: "pie",

            data: {

                labels: [

                    "Completed",

                    "Pending"

                ],

                datasets: [

                    {

                        data: [

                            completed,

                            pending

                        ],

                        backgroundColor: [

                            "#22c55e",

                            "#ef4444"

                        ]

                    }

                ]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    }

    catch (error) {

        console.log(error);

    }

}

loadAnalytics();