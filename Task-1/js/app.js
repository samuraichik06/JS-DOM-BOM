let topInfo = document.querySelector("#Tasks .top p");
let bottom = document.querySelector("#Tasks .bottom");
let AddButton = document.getElementById("Add");
AddButton.addEventListener("click", () => {
    let NewTask = document.getElementById("NewTask").value.trim();
    if (NewTask != "") {
        document.querySelector("#Tasks .bottom").innerHTML += `<div class="task-box mb-2 px-5"><div class="d-flex align-items-center fs-5"><i class="fa-regular fa-square"></i><p class="mb-0 ms-3">${NewTask}</p></div><div><button class="btn btn-warning text-light"><i class="fa-solid fa-pen"></i></button><button class="btn btn-danger ms-1"><i class="fa-solid fa-trash"></i></button></div></div>`;
        let unfinished = document.querySelectorAll(".fa-square");
        if (unfinished.length === 1) topInfo.innerHTML = `<i>You have <span class="text-success">1</span> unfinished task</i>`;
        else topInfo.innerHTML = `<i>You have <span class="text-success">${unfinished.length}</span> unfinished tasks</i>`;
        document.getElementById("NewTask").value = "";
    }
    let CheckBoxes = document.querySelectorAll(".fa-regular");
    for (let box of CheckBoxes) {
        box.addEventListener("click", () => {
            let task = box.parentElement.lastElementChild;
            if(box.className.includes("fa-square-check")) {
                box.classList.replace("fa-square-check", "fa-square");
                task.style.textDecoration = "none";
                task.style.color = "#000000";
            }
            else {
                box.classList.replace("fa-square", "fa-square-check");
                task.style.textDecoration = "line-through";
                task.style.color = "#999999";
            }
            let unfinished = document.querySelectorAll(".fa-square");
            if (unfinished.length === 0) topInfo.innerHTML = "<i>You have no tasks left to do</i> 🥳";
            else if (unfinished.length === 1) topInfo.innerHTML = `<i>You have <span class="text-success">1</span> unfinished task</i>`;
            else topInfo.innerHTML = `<i>You have <span class="text-success">${unfinished.length}</span> unfinished tasks</i>`;
        })
    }
    let EditButtons = document.querySelectorAll(".btn-warning");
    for (let btn of EditButtons) {
        btn.addEventListener("click", () => {
            let previous = btn.parentElement.parentElement.firstElementChild.lastElementChild;
            let edit = document.getElementById("NewTask");
            let SaveButton = document.getElementById("Save");
            edit.value = previous.innerHTML;
            AddButton.classList.add("d-none");
            SaveButton.classList.remove("d-none")
            document.querySelector("input").placeholder = "Edit your task";
            SaveButton.onclick = () => {
                if(edit.value != "" && edit.value != previous.innerHTML) {
                    previous.innerHTML = edit.value;
                }
                edit.value = "";
                AddButton.classList.remove("d-none");
                SaveButton.classList.add("d-none");
                document.querySelector("input").placeholder = "Add a new task";
            }
        })
    }
    let DeleteButtons = document.querySelectorAll(".btn-danger");
    for (let btn of DeleteButtons) {
        btn.addEventListener("click", () => {
            btn.parentElement.parentElement.remove();
            let unfinished = document.querySelectorAll(".fa-square");
            if (unfinished.length === 0) topInfo.innerHTML = "<i>You have no tasks left to do</i> 🥳";
            else if (unfinished.length === 1) topInfo.innerHTML = `<i>You have <span class="text-success">1</span> unfinished task</i>`;
            else topInfo.innerHTML = `<i>You have <span class="text-success">${unfinished.length}</span> unfinished tasks</i>`;
            if (bottom.innerHTML === "") topInfo.innerHTML = "<i>No tasks here yet</i>";
        })
    }
})