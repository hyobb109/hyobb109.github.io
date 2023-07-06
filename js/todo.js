const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
    if (!toDos.length)
        toDoList.style.backgroundColor = "transparent";
}

function checkToDo(event) {
    const li = event.target.parentElement;
    const span = li.querySelector("span");
    if (span.style.textDecoration !== "line-through") {
        event.target.setAttribute("class", "fa-regular fa-square-check");
        span.style.textDecoration = "line-through";
    } else {
        event.target.setAttribute("class", "fa-regular fa-square");
        span.style.textDecoration = "none";
    }
}

function applyEdit(event) {
    const li = event.target.parentElement;
    const input = li.querySelector("input");
    const span = document.createElement("span");
    span.innerText = input.value;
    toDos.find((toDo) => toDo.id === parseInt(li.id)).text = span.innerText;
    saveToDos();
    const button = document.createElement("i");
    button.setAttribute("class", "fa-solid fa-trash");
    button.addEventListener("click", deleteToDo);
    const edit = document.createElement("i");
    edit.setAttribute("class", "fa-solid fa-pen-to-square");
    edit.addEventListener("click", editToDo);
    li.removeChild(input);
    li.removeChild(event.target);
    li.appendChild(span);
    li.appendChild(edit);
    li.appendChild(button);
}

function editToDo(event) {
    const li = event.target.parentElement;
    const text = li.querySelector("span").innerText;
    const checkBox = document.createElement("i");
    checkBox.setAttribute("class", "fa-regular fa-square");
    const input = document.createElement("input");
    input.type = "text";
    input.value = text;
    while (li.hasChildNodes()) {
        li.removeChild(li.firstChild);
    }
    const check = document.createElement("i");
    check.setAttribute("class", "fa-solid fa-check");
    li.appendChild(checkBox);
    li.appendChild(input);
    li.appendChild(check);
    check.addEventListener("click", applyEdit);
    checkBox.addEventListener("click", checkToDo);
}

function paintToDo(newToDo) {
    const li = document.createElement("li");
    li.id = newToDo.id;
    const checkBox = document.createElement("i");
    checkBox.setAttribute("class", "fa-regular fa-square");
    checkBox.addEventListener("click", checkToDo);
    const span = document.createElement("span");
    span.innerText = newToDo.text;
    const del = document.createElement("i");
    del.setAttribute("class", "fa-solid fa-trash");
    del.addEventListener("click", deleteToDo);
    const edit = document.createElement("i");
    edit.setAttribute("class", "fa-solid fa-pen-to-square");
    edit.addEventListener("click", editToDo);
    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(edit);
    li.appendChild(del);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    };
    if (newToDoObj.text !== "") {
        toDos.push(newToDoObj);
        paintToDo(newToDoObj);
        saveToDos();
        if (toDos.length) {
            toDoList.style.backgroundColor = "white";
            toDoList.style.opacity = "0.6";
        }
    } else {
        alert("Please write something!");
    }
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (!toDos.length)
    toDoList.style.backgroundColor = "transparent";

if (savedToDos != null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
    if (toDos.length) {
        toDoList.style.backgroundColor = "white";
        toDoList.style.opacity = "0.6";
    }
}
