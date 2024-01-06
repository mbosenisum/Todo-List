// https://www.theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern

// item
function Todo(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    return { title, description, dueDate, priority, notes, checklist }
}

// contains multiple Todos
// do as class constructor?
// need to create way to add multiple todos for project, using objects of arrays?
// class Project {
//     constructor(Todo) {
//         let todos = [];
//         todos.push(Todo);
//     }
//     // get allTodos() {
//     //     return todos;
//     // }
// }

// put in function to make as a private variable
// global for now (testing)
let allProjects = [];

// as factory function
function Project(newTodo) {
    let todos = [];

    todos.push(newTodo);
    allProjects.push(newTodo)

    // not sure if 'function' is needed or not
    const addTodo = (newTodo) => {
        todos.push(newTodo);
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

// function Project(newTodo){
//     let todos = [];

//     addTodo
// }


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
    for(let project in allProjects){
        console.log(allProjects[project]);
        // print to DOM
    }
}

let displayProjs = document.getElementById('displayProjects');

displayProjs.addEventListener('click', displayProjects);

// displayProjs.addEventListener('click', () => {
//     // displayProjects()
//     console.log('clicked');
//     for (let project in allProjects) {
//         console.log('project');
//         console.log(project);
//         // console.log(project.showTodos());
//     }
// });