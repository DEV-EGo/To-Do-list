// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions

function addTodo(event) {

    //prevent form from submitting
    event.preventDefault();

    // todo div

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // creating Li

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // ADD Todo to local storage

    SaveLocalTodos(todoInput.value);

    // CheckMark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // APPEND

    todoList.appendChild(todoDiv);

    //clar todo list

    todoInput.value = "";
}

function deleteCheck(e) {

    const item = e.target;

    // delete todo

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

        // adding animation for deleting

        todo.classList.add("fall");
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });

    }

    // check mark marked as completed


    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;

    todos.forEach(function (todo) {

        switch (e.target.value) {

            case "all":
                todo.style.display = 'flex';

                break;

            case "completed":

                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';

                }
                else {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

// saving into local storage

function SaveLocalTodos(todo) {

    // checking to see if anything is already saved inside local storage
    let todos;

    if (localStorage.getItem("todos") === null) {

        todos = []; // if it doesnt exist it will create an empty array

    } else {

        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {


    let todos;

    if (localStorage.getItem("todos") === null) {

        todos = []; // if it doesnt exist it will create an empty array

    } else {

        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // creating Li

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);


        // CheckMark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // APPEND

        todoList.appendChild(todoDiv);
    });
}