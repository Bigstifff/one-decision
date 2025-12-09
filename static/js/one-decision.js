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
        let hr = document.querySelector(".countDown #hr");
        let min = document.querySelector(".countDown #min");
        let sec = document.querySelector(".countDown #sec");
        let countDownCont = document.querySelector(".timerCont");
        let setLoader = document.querySelector(".btnCont img");
        let setBtn = document.querySelector(".btnCont input");
        
        infoCont.style.display = "none";
        
        choices_1.style.display = "none";
        choices_2.style.display = "none";
        tasks = "";

        // send an auto api request to '/api/choosen_tasks', if the returned array is not empty, display timer countdown
        try {
            r = await fetch("/api/choosen_tasks")
            data = await r.json();
            console.log(data.msg);
            if ((data.msg).length != 0) {
                countDownCont.style.display = "block";
            }
        }
        catch(error) {
            console.log({error: error});
        }

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            setBtn.style.display="none";
            setLoader.style.display="block";
            
            const form_data = Object.fromEntries(new FormData(form));
            try {
                r = await fetch("/", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(form_data)
                })
                data = await r.json();
                console.log(data.msg);
                
                setTimeout(() => {
                    setBtn.style.display="block";
                    setLoader.style.display="none";
                    countDownCont.style.display = "block";
                    alert("You've successfully setup your daily tasks");
                }, 3000);
            }
            catch(error) {
                console.log({error: error});
            }
        });

        let currentHour = new Date().getHours();
        let startingHour = 20 - currentHour;
        let time = startingHour * 3600; // get full time in seconds

        function countDown() {
            let hour = Math.floor(time/3600);
            let minute = Math.floor(time/60);
            minute = minute % 60;
            seconds = time % 60;
            minute = minute < 10? '0'+minute : minute;
            seonds = seconds < 10? '0'+seconds : seconds;

            if (time === 0 || hour < 0) {
                countDownCont.style.display = "none";
            }

            hr.textContent = hour;
            min.textContent = minute;
            sec.textContent = seconds;

            time--;
        }
        setInterval(() => countDown(), 1000);

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