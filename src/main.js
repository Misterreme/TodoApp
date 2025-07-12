const themeButton = document.getElementById("theme-button");
const themeButtonBall = document.getElementById("theme-button-ball");
const root = document.querySelector("html");

const currentTheme = localStorage.getItem("theme");
themeButton.addEventListener("click", (event) => {
    if (themeButtonBall.classList.contains("left-0")) {
        themeButtonBall.classList.remove("left-0")
        themeButtonBall.classList.add("left-[55%]");
        root.classList.add("dark");
        root.classList.remove("light");

    } else {
        themeButtonBall.classList.add("left-0")
        themeButtonBall.classList.remove("left-[55%]");
        root.classList.remove("dark");
        root.classList.add("light");
    };

    const theme = root.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
});

if (currentTheme === "dark") {
    root.classList.add("dark");
}

const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
let escribirInterval;

loadTaskToLocalStorage()
randomPlaceholder(taskInput);
addButton.addEventListener("click", app);

// const currentTheme = localStorage.getItem("theme");

// toggleThemeButton.addEventListener("click", (event) => {
//     const isDark = document.body.classList.toggle("dark");

//     if (isDark) {
//         document.body.classList.remove("light")
//         document.body.style.colorScheme = "dark";
//     } else  {
//         document.body.classList.add("light")
//         document.body.style.colorScheme = "light";
//     };

//     const theme = document.body.classList.contains("dark") ? "dark" : "light";
//     localStorage.setItem("theme", theme);
// });

// if (currentTheme === "dark") {
//     document.body.classList.add("dark");
//     document.body.style.colorScheme = "dark"
// }

function app(event) {
    event.preventDefault()

    if (taskInput.value.trim() === "") {
        showError("Complete this input");
        return;
    };

    const taskElement = createTaskElement(taskInput.value);
    createButtons();
    hiddeError();
    saveTaskOnLocalStorage(taskInput.value);
    taskInput.value = "";
};

function createTaskElement(text) {
    const taskElement = document.createElement("li");
    taskElement.setAttribute("class", "w-full h-12 bg-[#f5f5f5] border-0 rounded-md py-2 px-4 text-lg flex items-start justify-between font-bold dark:bg-[#7cd86c]");
    taskElement.textContent = text;
    const buttons = createButtons();
    taskElement.append(buttons);
    taskList.append(taskElement);

    randomPlaceholder(taskInput);
    return taskElement;
};

function createButtons() {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "flex gap-2");
    
    const editButton = document.createElement("span");
    editButton.setAttribute("class", "inline-block w-8 h-8 cursor-pointer bg-[url('public/icons/edit-icon.png')] bg-no-repeat bg-cover bg-center");
    editButton.addEventListener("click", (event) => {
        editTask(event.target.parentElement.parentElement);
        console.log("editing")
    });

    const deleteButton = document.createElement("span");
    deleteButton.setAttribute("class", "inline-block w-8 h-8 cursor-pointer bg-[url('public/icons/remove-icon.webp')] bg-no-repeat bg-cover bg-center");
    deleteButton.addEventListener("click", (event) => {
        const task = event.target.parentElement.parentElement.textContent;
        const deleteTask = confirm("Are you sure you want to delete that task?");
        if (deleteTask) {
            event.target.parentElement.parentElement.remove();
            deleteTaskFromLocalStorage(task);
            console.log(task);
            console.log("deleting")
        };
    });

    buttonsContainer.append(editButton, deleteButton);
    return buttonsContainer;
};

function editTask(task) {
    const taskEdited = prompt("Editing Task...", `${task.textContent}`);
    console.log(taskEdited);
    
    if (!taskEdited) {
        alert("This field must not be empty");
        // showError("This field must not be empty");
        return
    } else {
        task.firstChild.textContent = taskEdited;
        updateLocalStorage()
    }
};

function randomPlaceholder(input) {    
    const placeholderList = [
        "Escribe tu próxima app millonaria...",
        "¿Bug o feature? Describe aquí...",
        "Inserta código mágico ✨",
        "¿function o frustration? Cuéntanos...",
        "Pon aquí tu mejor variable",
        "Define un nuevo 'undefined'",
        "documentar() // algún día",
        "console.log('Escribe algo aquí')",
        "Describe tu error favorito",
        "¿Tu compilador también llora?",
        "Input para genios (como tú)",
        "¿Nombre de variable? ¿Algo mejor que 'x'?",
        "Sudo escribe algo importante",
        "¿Stack Overflow ya respondió?",
        "Pon tu 'Hello, World!' aquí",
        "Refactoriza tus pensamientos...",
        "¿Merge conflict en tu vida?",
        "Aquí va tu commit emotivo 😭",
        "No olvides ; al final",
        "Escribe algo... luego lo debuggeamos"
      ];

      const placeholderIndex = Math.floor(Math.random() * placeholderList.length);
      const placeholder = placeholderList[placeholderIndex];

      if (escribirInterval) {
        clearInterval(escribirInterval);
      }

      let index = 0;
      input.placeholder = "";
      
      escribirInterval = setInterval(() => {
        input.placeholder += placeholder.charAt(index);
        index++;

        if (index > placeholder.length) {
            clearInterval(escribirInterval);
        } 
      }, 50);
};

function showError(message) {
    taskInput.placeholder = message;
    taskInput.classList.add("placeholder:font-bold");
    taskInput.classList.add("placeholder:text-red-600");
    clearInterval(escribirInterval);
    return;
};

function hiddeError() {
    taskInput.classList.remove("placeholder:font-bold");
    taskInput.classList.remove("placeholder:text-red-600");
    return;
};

function saveTaskOnLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function loadTaskToLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    tasks.forEach(task => {
        createTaskElement(task);
    });
};

function updateLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => li.firstChild.textContent)
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function deleteTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updateTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
};