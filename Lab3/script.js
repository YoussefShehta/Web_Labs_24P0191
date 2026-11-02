let todos = []; 

let currentFilter = 'all';

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const itemsLeft = document.getElementById('itemsLeft');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderTodos() {
    todoList.innerHTML = '';
    
    let filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';

        const taskLeftDiv = document.createElement('div');
        taskLeftDiv.className = 'task-left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(todo.id));

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.addEventListener('dblclick', () => {
            const inputEdit = document.createElement('input');
            inputEdit.type = 'text';
            inputEdit.value = todo.text;
            inputEdit.style.flex = '1';
            inputEdit.style.padding = '4px';
            
            const saveEdit = () => {
                if (inputEdit.value.trim() !== '') {
                    todo.text = inputEdit.value.trim();
                    renderTodos();
                }
            };

            inputEdit.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') saveEdit();
            });

            inputEdit.addEventListener('blur', saveEdit);

            taskLeftDiv.replaceChild(inputEdit, span);
            inputEdit.focus();
        });

        taskLeftDiv.appendChild(checkbox);
        taskLeftDiv.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        li.appendChild(taskLeftDiv);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${activeCount} items left`;
}
function addTodo() {
    const text = todoInput.value.trim();
    if (text !== '') {
        todos.push({
            id: Date.now(),
            text: text,
            completed: false
        });
        todoInput.value = '';
        renderTodos();
    }
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});
function toggleTodo(id) {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    renderTodos();
});

clearAllBtn.addEventListener('click', () => {
    todos = [];
    renderTodos();
});
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderTodos();
    });
});
renderTodos();