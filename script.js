// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    renderTask(task);
    taskInput.value = '';
}

function renderTask(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    li.innerHTML = `
        <div>
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span ${task.completed ? 'class="completed"' : ''}>${task.text}</span>
        </div>
        <button class="delete-btn" onclick="deleteTask(${task.id})">x</button>
    `;

    taskList.appendChild(li);
}

function toggleTask(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(id) {
    const tasks = getTasks().filter(t => t.id !== id);
    saveTasks(tasks);
    renderTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}
