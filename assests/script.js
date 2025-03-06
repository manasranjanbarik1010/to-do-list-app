// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Event listener for adding tasks
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Function to add a task
function addTask() {
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    const taskItem = createTaskElement(taskText, false);
    taskList.appendChild(taskItem);

    saveTasks();
    taskInput.value = "";
}

// Function to create a task element
function createTaskElement(taskText, completed) {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between");

    // Task text span
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    if (completed) {
        taskSpan.classList.add("completed");
    }

    // Checkbox to mark task as completed
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = completed;
    checkBox.classList.add("me-2");
    checkBox.addEventListener("change", function () {
        taskSpan.classList.toggle("completed", checkBox.checked);
        saveTasks();
    });

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("btn", "btn-warning", "btn-sm", "me-2");
    editBtn.addEventListener("click", function () {
        let newTaskText = prompt("Edit your task:", taskSpan.textContent);
        if (newTaskText) {
            taskSpan.textContent = newTaskText.trim();
            saveTasks();
        }
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    // Button container
    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    // Append elements to task item
    li.appendChild(checkBox);
    li.appendChild(taskSpan);
    li.appendChild(buttonContainer);

    return li;
}

// Function to save tasks in local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("input").checked,
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
        const taskItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskItem);
    });
}
