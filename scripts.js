let todoList = [];
let completedList = [];

loadFromStorage();

function loadFromStorage() {
  todoList1 = JSON.parse(localStorage.getItem('todoList'));
  completedList1 = JSON.parse(localStorage.getItem('completedList'));
  
  if (todoList1) {
    todoList = todoList1;
  }
  if (completedList1) {
    completedList = completedList1;
  }

  renderTodoList();
  renderCompletedList();
} 

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
  localStorage.setItem('completedList', JSON.stringify(completedList));
}

renderTodoList();

function renderTodoList() {
  sortByDate();

  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const {name, dueDate} = todoObject;
    const html = `
      
        <input type="radio" class="radio-button js-radio-button">
        <div class="todo-name">${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-todo-button" data-index="${index}">Delete</button>
        <button class="edit-todo-button js-edit-todo-button" data-index="${index}">Edit</button>
      
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-edit-todo-button')
      .forEach((editButton, index) => {
        editButton.addEventListener('click', (event) => {
          editTask(index);
        });
      });

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        saveToStorage()
        renderTodoList();
      }
      );
    });

    document.querySelectorAll('.js-radio-button')
    .forEach((radioButton, index) => {
      radioButton.addEventListener('click', () => {
        completedList.push(todoList[index]);
        moveToComplete(index);
        todoList.splice(index, 1);
        saveToStorage();
        renderTodoList();
        renderCompletedList();
      }
      );
    }); 
} 

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function sortByDate() {
  todoList.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB;
  });
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({name: name, dueDate: dueDate});
  

  inputElement.value = '';

  saveToStorage();
  renderTodoList();
}

function moveToComplete(index) {
  const item = todoList[index];
  const html = `
    <div class="todo-name">${item.name}</div>
    <div>${item.dueDate}</div>
  `;

  document.querySelector(`.complete-todo-grid`).innerHTML += html;
  saveToStorage();
  renderTodoList();
  renderCompletedList();
}

function editTask(index) {
  const item = todoList[index];
  const html = `
    <div class="edit-grid">
      <input type="text" class="edit-name-input" value="${item.name}">
      <input type="date" class="edit-due-date-input" value="${item.dueDate}">
      <button class="save-edit-button" data-index="${index}">Save</button>
      <button class="cancel-edit-button" data-index="${index}">Cancel</button>
    </div>
  `;

  document.querySelector(`.todo-grid`).innerHTML = html;

  document.querySelector('.save-edit-button').addEventListener('click', (event) => {
    const index = event.target.getAttribute('data-index');
    saveEdit(index);
  });

  document.querySelector('.cancel-edit-button').addEventListener('click', (event) => {
    const index = event.target.getAttribute('data-index');
    renderTodoList();
  });
}

function saveEdit(index) {
  const newName = document.querySelector('.edit-name-input').value;
  const newDueDate = document.querySelector('.edit-due-date-input').value;

  todoList[index].name = newName;
  todoList[index].dueDate = newDueDate;

  saveToStorage();
  renderTodoList();
}


function clearAll() {
  todoList = [];
  localStorage.removeItem('todoList');
  renderTodoList();
}

function clearCompleted() {
  completedList = [];
  localStorage.removeItem('completedList');
  renderCompletedList();
}

function renderCompletedList() {
  let completedListHTML = '';

  completedList.forEach((completedObject) => {
    const {name, dueDate} = completedObject;
    const html = `
      <div class="todo-name">${name}</div>
      <div>${dueDate}</div>
    `;
    completedListHTML += html;
  });

  document.querySelector('.complete-todo-grid').innerHTML = completedListHTML;
}

function showCompletedTask() {
  const button = document.querySelector('.js-clear-completed-button');
  const tasks = document.querySelector('.todo-grid');
  const title = document.querySelector('.complete-title');
  const grid = document.querySelector('.todo-input-grid');
  const grid2 = document.querySelector('.complete-todo-grid');

  
  tasks.classList.toggle("hidden");
  grid.classList.toggle("hidden");
  title.classList.toggle("show");
  button.classList.toggle("show");
  grid2.classList.toggle("show2");
  

  renderCompletedList();
}