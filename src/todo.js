// https://www.theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern

// current: 
// tie all functionality to DOM
// extra individual todos (within each project) after viewing all 
// expand a single todo to see/edit its deatils
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

function projectGroup(newProject) {
    let projectArr = [];

    const add = (newProject) => {
        projectArr.push(newProject);
        return;
    }

    const getProjects = () => {
        return projectArr;
    }

    // change later
    const display = () => {
        for (let index in projectArr) {
            console.log('project title = ' + projectArr[index].title());
            console.log(projectArr[index]);
            // console.log(arr[index].showTodos());
        }
        // return arr;
    }

    const find = (project) => {
        for (let index in projectArr) {
            if (projectArr[index].title() == project) {
                return index;
            }
        }
    }

    // untested
    const remove = (project) => {
        let index = find(project);
        projectArr.splice(index, 1);
    }

    return { add, display, find, remove, getProjects };
}

let allProjects = projectGroup();

function Project(newTodo, titleName) {
    this.titleName = titleName;

    const title = () => { return titleName; }

    let todos = [];

    todos.push(newTodo);
    // allProjects.add(newTodo); // should be adding the project instead

    const addTodo = (newTodo) => {
        todos.push(newTodo);
        return;
    }

    // just returns todos
    const showTodos = () => {
        for (let index in todos) {
            console.log(todos[index]);
            // print to DOM
        }
        // return todos;
    }

    const getTodos = () => {
        return todos;
    }

    const findTodo = (newTodo) => {
        for (let index in todos) {
            if (todos[index] == newTodo) {
                console.log('todos match');
                return index;
            }
        }
        return;
    }

    const removeTodo = (newTodo) => {
        let index = findTodo(newTodo);
        todos = todos.splice(index, 1);
        return;
    }

    return { todos, addTodo, showTodos, removeTodo, findTodo, title, getTodos };
}


const groceries = Todo("groceries", "butter, milk, eggs", "01/05/2023", "high", "use coupons", "a, b");
const groceries2 = Todo("groceries2", "lettuce", "01/05/2023", "high", "use coupons", "a, b");

let groceriesproject = Project(groceries, 'groceries');

groceriesproject.addTodo(groceries2);
allProjects.add(groceriesproject); // re-integrate later

// second project to test DisplayProjects
const bills = Todo("bills", "utility", "01/06/2023", "high", "pay by phone", "a, b");
const bills2 = Todo("bills", "rent", "01/06/2023", "high", "pay by phone", "a, b");

let billsproject = Project(bills, 'bills');
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


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
// splice() return value: if only one element is removed, 
// an array of one element is returned

// perhaps splice(index, 1) is not done correctly 
// in both delete functions

// testing removeProject
// console.log('all projects');
// allProjects.display();

// console.log('remove bills');
// allProjects.remove('bills');

// console.log('new projects');
// allProjects.display();

// works with todos

// rename as printTodo?


function printTodo(data) {
    let output = document.getElementById('output');

    let tbody = document.getElementsByTagName('tbody');

    let tr = document.createElement('tr');

    let outputrow = document.getElementById('outputrow');
    // let td = document.createElement('td');
        for (let index in data) {
            let td = document.createElement('td');
            td.textContent = data[index];
            tr.appendChild(td);
        }

    outputrow.appendChild(tr);
    // tr.appendChild('\n');
    // add new row if function is called again

    tbody[0].appendChild(tr);

    return;
}

function printProject(project){
    for(todo in project.getTodos()){
        printTodo(project.getTodos()[todo]);
    }
    return;
}

// todo (these are public variables in the code, not being accessed from getter)
// printToDOM(groceries2);
// printToDOM(bills2);

// let groceriestodos = groceriesproject.getTodos();
// printTodo(groceriestodos[0]);
// printProject(groceriesproject);

function printAllProjects() {
    for(let index in allProjects.getProjects()){
        printProject(allProjects.getProjects()[index]);
    }
    return;
}

printAllProjects();
// trying Projects now

// printToDOM(groceriesproject);   // prints the
