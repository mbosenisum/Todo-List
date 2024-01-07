// https://www.theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern

function Todo(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    return { title, description, dueDate, priority, notes, checklist }
}

// make a private variable
// allProjects = [];
function projectGroup (newProject) {
    let arr = [];

    const add = (newProject) => {
        arr.push(newProject);
        return;
    }

    const display = () => {
        return arr;
    }

    return { add, display };
}

let allProjects = projectGroup();

// as factory function
function Project(newTodo) {
    let todos = [];

    todos.push(newTodo);
    allProjects.add(newTodo);

    // not sure if 'function' is needed or not
    const addTodo = (newTodo) => {
        todos.push(newTodo);
        return;
        // allProjects.push(newTodo)
    }

    const showTodos = () => {
        // for(let todo in todos){
        //     return todo;
        // }
        return todos;
    }

    return { todos, addTodo, showTodos };
}


const groceries = Todo("groceries", "butter, milk, eggs", "01/05/2023", "high", "use coupons", "a, b");
const groceries2 = Todo("groceries2", "lettuce", "01/05/2023", "high", "use coupons", "a, b");

// console.log(groceries);

// let groceries
// let groceriesproject = Project(groceries);
let groceriesproject = Project(groceries);

groceriesproject.addTodo(groceries2);
// console.log(groceriesproject.todos);

// second project to test DisplayProjects
const bills = Todo("bills", "utility", "01/06/2023", "high", "pay by phone", "a, b");
const bills2 = Todo("bills", "rent", "01/06/2023", "high", "pay by phone", "a, b");

let billsproject = Project(bills);
billsproject.addTodo(bills2);

// insert function to print to DOM
let content = document.getElementsByClassName('content');

function displayProjects() {
    console.log(allProjects.display());
    // for(let project in allProjects){
    //     console.log(allProjects.display());
    //     // print to DOM
    // }
}

let displayProjs = document.getElementById('displayProjects');

displayProjs.addEventListener('click', displayProjects);
