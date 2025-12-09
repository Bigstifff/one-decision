document.addEventListener("DOMContentLoaded", async () => {
    if (document.body.id === "index") {
        let form = document.querySelector("main form");
        let count = document.querySelector("form .setCont .count span");
        let choices_1 = document.querySelector("form .choices_1");
        let choices_2 = document.querySelector("form .choices_2");
        let loader = document.querySelector(".load");
        let infoImg = document.querySelector(".indexH img");
        let infoCont = document.querySelector(".infoCont");
        let info = infoCont.querySelector(".infoCont .info");
        
        infoCont.style.display = "none";
        
        choices_1.style.display = "none";
        choices_2.style.display = "none";

        infoImg.addEventListener("click", () => {
            if (infoCont.style.display === "none") {
                infoCont.style.display = "block";
            }
            else {
                infoCont.style.display = "none";
            }
        });
        infoCont.addEventListener("click", () => {
            if (infoCont.style.display === "block") {
                infoCont.style.display = "none";
            }
            else {
                infoCont.style.display = "block";
            }
        });
        info.addEventListener("click", (e) => {
            e.stopPropagation();
        });


        async function get_tasks() {
            try {
                r = await fetch("/api/tasks");
                data = await r.json();
                let tasks = data.msg;

                for (let i=0; i < 10; i++) {
                    let choice = document.createElement("div");
                    let check = document.createElement("input");
                    let label = document.createElement("label");

                    choice.classList.add("choice");
                    check.classList.add("check");
                    check.id=`check ${i+1}`;
                    check.value=tasks[i];
                    check.name=`check ${i+1}`;
                    check.type="checkbox";

                    label.setAttribute("for", check.id);
                    label.textContent = tasks[i];

                    // console.log(label.textContent);
                    choices_1.appendChild(choice);
                    choice.appendChild(check);
                    choice.appendChild(label);
                }
                for (let i=10; i < 20; i++) {
                    let choice = document.createElement("div");
                    let check = document.createElement("input");
                    let label = document.createElement("label");

                    choice.classList.add("choice");
                    check.classList.add("check");
                    check.id=`check ${i+1}`;
                    check.value=tasks[i];
                    check.name=`check ${i+1}`;
                    check.type="checkbox";

                    label.setAttribute("for", check.id);
                    label.textContent = tasks[i];

                    choices_2.appendChild(choice);
                    choice.appendChild(check);
                    choice.appendChild(label);

                    choices_1.style.display = "grid";
                    choices_2.style.display = "grid";
                    loader.style.display = "none";
                }
            }
            catch(error) {
                console.log({error: error});
                setTimeout(() => alert("request is taking longer than expected, try refreshing this page"), 10000);
            }
            
        }
        await get_tasks()

        let checks = document.querySelectorAll("form .check");

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