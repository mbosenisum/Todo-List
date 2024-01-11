// https://www.theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern

// current: 
// tie all functionality to DOM
// extra individual todos (within each project) after viewing all 
// expand a single todo to see/edit its deatils
// delete a todo
// -- localStorage



function Todo(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    return { title, description, dueDate, priority, notes, checklist }
}

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

function Project(newTodo) {
    let todos = [];

    todos.push(newTodo);
    allProjects.add(newTodo);

    const addTodo = (newTodo) => {
        todos.push(newTodo);
        return;
    }

    // just returns todos
    const showTodos = () => {
        for(let index in todos){
            console.log(todos[index]);
            // print to DOM
        }
        // return todos;
    }

    const findTodo = (newTodo) => {
        // iterate through Project
        for(let index in todos){
            console.log('title = ' + todos[index].title);
            // if(todos[todo].title == newTodo.title){
            //     console.log('titles match');
            // }
            if(todos[index] == newTodo){
                console.log('todos match');
                // break;  // do something else
                return index;
            }
        }
        return;
    }

    const removeTodo = (newTodo) => {
        // search function

        // console.log('old todo');
        // console.log(todos);

        let index = findTodo(newTodo);


        todos = todos.splice(index, 1);

        // console.log('changed todo');
        // console.log(todos);
        return;
    }

    return { todos, addTodo, showTodos, removeTodo, findTodo };
}


const groceries = Todo("groceries", "butter, milk, eggs", "01/05/2023", "high", "use coupons", "a, b");
const groceries2 = Todo("groceries2", "lettuce", "01/05/2023", "high", "use coupons", "a, b");

let groceriesproject = Project(groceries);

groceriesproject.addTodo(groceries2);

// second project to test DisplayProjects
const bills = Todo("bills", "utility", "01/06/2023", "high", "pay by phone", "a, b");
const bills2 = Todo("bills", "rent", "01/06/2023", "high", "pay by phone", "a, b");

let billsproject = Project(bills);
billsproject.addTodo(bills2);

console.log('finding todo');
billsproject.removeTodo(bills);

allProjects.add(billsproject);
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

