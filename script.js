

const todoList = document.getElementById('todo-list');
let draggedItem = null;

// Event listeners for draggable items
todoList.addEventListener('dragstart', function(event) {
    draggedItem = event.target;
    event.target.style.opacity = '0.5';
});

todoList.addEventListener('dragend', function(event) {
    draggedItem.style.opacity = '1';
    draggedItem = null;
});

// Event listeners for drop zones
todoList.addEventListener('dragover', function(event) {
    event.preventDefault();
});

todoList.addEventListener('dragenter', function(event) {
    if (event.target.classList.contains('todo-item')) {
        event.target.style.borderTop = '2px dashed #333';
    }
});

todoList.addEventListener('dragleave', function(event) {
    if (event.target.classList.contains('todo-item')) {
        event.target.style.borderTop = 'none';
    }
});

todoList.addEventListener('drop', function(event) {
    event.preventDefault();
    if (event.target.classList.contains('todo-item')) {
        event.target.style.borderTop = 'none';
        todoList.insertBefore(draggedItem, event.target);
    } else {
        todoList.appendChild(draggedItem);
    }
});

// Checkbox functionality
todoList.addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        const todoItem = event.target.closest('.todo-item');
        todoItem.classList.toggle('completed');
    }
});

// Edit and Delete functionality
todoList.addEventListener('click', function(event) {
    const todoItem = event.target.closest('.todo-item');
    if (event.target.classList.contains('edit-btn')) {
        const span = todoItem.querySelector('span');
        const newText = prompt('Enter new task:');
        if (newText !== null && newText !== '') {
            span.textContent = newText;
        }
    } else if (event.target.classList.contains('delete-btn')) {
        todoItem.remove();
    }
});

// Add Task functionality
const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date').value;
    const taskText = taskInput.value.trim();

    if (taskText !== '' && taskDate !== '') {
        const newTask = document.createElement('div');
        newTask.className = 'todo-item';
        newTask.draggable = true;
        newTask.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <div class="button-box">
                    <button class="edit-btn">
                        Edit
                    </button>
                    <button class="delete-btn">
                        Delete
                    </button>
                </div>
        `;
        todoList.appendChild(newTask);

        taskInput.value = '';
        taskDate.value = '';
    } else {
        alert('Please enter task and select date.');
    }
});
