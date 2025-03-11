const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const attachmentInput = document.getElementById("attachment");
const taskNotes = document.getElementById("taskNotes");
const taskList = document.getElementById("taskList");
const darkModeToggle = document.getElementById("darkModeToggle");

// Function to Add Task
function addTask() {
    let taskText = taskInput.value.trim();
    let dueDate = dueDateInput.value;
    let notes = taskNotes.value.trim();
    let attachment = attachmentInput.files[0];

    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerHTML = `
        <div class="task-header">
            <span>${taskText}</span>
            <button onclick="removeTask(this)">❌</button>
        </div>
        ${dueDate ? `<p>📅 Due: ${dueDate}</p>` : ""}
        ${notes ? `<p>📝 ${notes}</p>` : ""}
        ${attachment ? `<p>📎 <a href="${URL.createObjectURL(attachment)}" target="_blank">${attachment.name}</a></p>` : ""}
    `;

    taskList.appendChild(li);
    clearInputs();
    setReminder(taskText, dueDate);
}

// Function to Set Reminder
function setReminder(task, dueDate) {
    if (!dueDate) return;
    let dueTime = new Date(dueDate).getTime();
    let now = new Date().getTime();
    let timeLeft = dueTime - now;

    if (timeLeft > 0) {
        setTimeout(() => {
            alert(`Reminder: ${task} is due today!`);
        }, timeLeft);
    }
}

// Function to Clear Input Fields
function clearInputs() {
    taskInput.value = "";
    dueDateInput.value = "";
    taskNotes.value = "";
    attachmentInput.value = "";
}

// Function to Remove Task
function removeTask(button) {
    button.parentElement.parentElement.remove();
}

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

