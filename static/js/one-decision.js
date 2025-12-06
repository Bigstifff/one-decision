document.addEventListener("DOMContentLoaded", () => {
    if (document.body.id === "index") {
        let form = document.querySelector("main form");
        let checks = document.querySelectorAll("main form .check");
        let count = document.querySelector("form .setCont .count span");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("this page is under construction...")
        })

        for (let i=0; i < checks.length; i++) {
            checks[i].addEventListener("click", () => {
                // alert("you just checked a box");
                count.textContent = 0;
                for (let choice of checks) {
                    if (choice.checked === true) {
                        count.textContent = eval(Number(count.textContent) + 1);
                    }
                }
            });
        };
    };
});