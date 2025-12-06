document.addEventListener("DOMContentLoaded", async () => {
    if (document.body.id === "index") {
        let form = document.querySelector("main form");
        let checks = document.querySelectorAll("main form .check");
        let count = document.querySelector("form .setCont .count span");

        async function get_tasks() {
            try {
                r = await fetch("/api/tasks");
                data = await r.json();
                console.log(data.msg);
            }
            catch(error) {
                console.log({error: error});
            }
            
        }
        await get_tasks()

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("this page is under construction...")
        })

        for (let i=0; i < checks.length; i++) {
            checks[i].addEventListener("click", (e) => {
                let task = e.target;
                // alert("you just checked a box");
                count.textContent = 0;
                for (let choice of checks) {
                    if (choice.checked === true) {
                        count.textContent = eval(Number(count.textContent) + 1);
                    }
                }

                if (count.textContent === "6") {
                    task.checked = false;
                    alert("You can only choose 5 of 20 tasks for now.");
                    count.textContent = eval(Number(count.textContent) - 1);
                }
            });
        };
    };
});