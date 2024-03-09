// https://www.theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern

// current: 
// create Todos
// tie all functionality to DOM
// DOM interactivity (add/remove buttons)
// extra individual todos (within each project) after viewing all 
// expand a single todo to see/edit its deatils
// -- localStorage
// delete a todo / project
// each project is grouped separately

// addproject via html/dom
// adding checklist items (instead of setting through radio)

// need to add a form for user entering a project or todo, look back at old projects


// 02/20/2024: working on form submission for adding Project/Todo
// 03/07/2024: adding project title with form submissions from html
//      using allProjects.display(). search function not working?

function Todo(title, description, dueDate, priority, notes, checklist) {
    // control or reshape data as it comes in, form validation
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist; // need to expand as array, which is later put into list
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

    // const returnProject = (index) => {
    //     return projectArr[index];
    // }

    // change later
    const display = () => {
        for (let index in projectArr) {
            console.log('project title = ' + projectArr[index].title());
            // console.log(projectArr[index]);
            // console.log(arr[index].showTodos());
        }
        // return arr;
    }

    // this is just to find if the project exists 
    // separate functionality of returning index for search
    // and for using it to add/amend an existing project
    const find = (project, todo) => {
        // console.log('project =');
        // console.log(project);   // the actual project itself, presumably matching if everything identical

        // if there exists a project with the same title already, add Todo to existing project
        // or prompt?


        // simply returning index

        // why does it need to be keys() here (?)
        // console.log('keys = ', projectArr.keys());
        // adding new Project to array
        console.log(projectArr);
        for (let index in projectArr) {
            console.log(projectArr[index].title());
            // console.log(projectArr[index].title(), ' == ', project);

            // if there exists a project with the same title already, add Todo to existing project
            // or prompt?
            if (projectArr[index].title() == project.title()) {
                if (todo == null) {
                    prompt("There exists a project, adding todo to existing project ");
                    projectArr[index].addTodo(todo);
                }
                return index;
            }
            else if (projectArr[index] == project) {
                console.log("This exact project and todos already exist");
                console.log("not adding");
                return index;
            }
            else {
                return -1;
            }
        }
    }

    // const findTitle = (pTitle) => {
    //     for(let index in projectArr){
    //         if(projectArr[index].title()==pTitle){
    //             console.log('findTitle: there exists a project with this title');
    //             return index;
    //         }
    //     }
    //     return -1;
    // }

    // untested
    const remove = (project) => {
        project.removeAllTodos();
        let index = find(project);
        projectArr.splice(index, 1);
        delete project;
        // remove from memory as well ?
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
        // can't delete last / if only one Todo in project
        if (todos.length > 1) {
            todos = todos.splice(index, 1);
        }
        else {
            todos = [];
        }
        return;
    }

    const removeAllTodos = () => {
        todos = [];
    }

    const editTodo = (editedTodo) => {
        let newName = prompt("change the name of this Todo", editedTodo.title.concat(' ' + 'edited'));
        editedTodo.title = newName;
        return;
        // test in console
    }

    return { todos, addTodo, showTodos, removeTodo, findTodo, title, getTodos, removeAllTodos, editTodo };
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
}


// deleteTodoButton.addEventListener('click', removeTodo);
// https://stackoverflow.com/questions/16310423/addeventlistener-calls-the-function-without-me-even-asking-it-to

function printTodo(data, project) {
    // console.log('data.super)() = ' + data.super());
    let output = document.getElementById('output');

    let tbody = document.getElementsByTagName('tbody');

    let tr = document.createElement('tr');

    let outputrow = document.getElementById('outputrow');
    for (let index in data) {
        let td = document.createElement('td');
        td.textContent = data[index];
        tr.appendChild(td);
    }

    let flag = 1;

    let editTodoButton = document.createElement('button');
    editTodoButton.textContent = 'edit';
    tr.appendChild(editTodoButton);
    editTodoButton.addEventListener('click', function () {
        project.editTodo(data);
    });

    let deleteTodoButton = document.createElement('button');
    deleteTodoButton.textContent = 'delete';
    tr.appendChild(deleteTodoButton);
    deleteTodoButton.addEventListener('click', function () {
        project.removeTodo(data);
        // should rerun printTodo but avoviding repeated outputrow and tbody[0] appends
        flag = 0;
        clearTable();
        // printTodo(data, project);
        printAllProjects();
        return;
    });


    // not sure if flag still needed
    if (flag) {
        outputrow.appendChild(tr);
        tbody[0].appendChild(tr);
    }

    flag = 1;
    return;
}

function printProject(project) {
    for (todo in project.getTodos()) {
        printTodo(project.getTodos()[todo], project);
    }
    return;
}

// add styling later
function printAllProjects() {
    for (let index in allProjects.getProjects()) {
        // project divider


        let trs = document.getElementsByTagName('tr');
        let dividerRow = document.createElement('tr');

        let divider = document.createElement('td');
        divider.textContent = 'project title: ' + allProjects.getProjects()[index].title();

        let deleteProjectButton = document.createElement('button');


        dividerRow.appendChild(divider);

        deleteProjectButton.textContent = 'delete project';
        deleteProjectButton.addEventListener('click', function () {
            allProjects.remove(allProjects.getProjects()[index]);
            flag = 0;
            clearTable();
            // printTodo(data, project);
            printAllProjects();
            return;
        });
        dividerRow.appendChild(deleteProjectButton);
        // if array is empty, say that all todos are done / project is complete
        trs[trs.length - 1].parentNode.appendChild(dividerRow);


        printProject(allProjects.getProjects()[index]);
        //

        // let trs = document.getElementsByTagName('tr');
        // let divider = document.createElement('tr');
        // divider.textContent = '___';
        // trs[trs.length-1].parentNode.appendChild(divider);

        // https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend
        // trs[trs.length-1].parentNode.prepend('___', document.createElement('tr'));

    }
    return;
}



let displayProjs = document.getElementById('displayProjects');

displayProjs.addEventListener('click', printAllProjects);

function clearTable() {
    let table = document.getElementsByTagName('tbody');
    table[0].remove();

    let thead = document.getElementsByTagName('thead')
    let tbody = document.createElement('tbody');

    thead[0].after(tbody);
    let outputrow = document.createElement('tr');
    outputrow.setAttribute('id', 'outputrow')

    tbody.appendChild(outputrow);

    return;
}

let clearDoc = document.getElementById('clearDoc');

clearDoc.addEventListener('click', clearTable);


function addProject() {
    //
    console.log('add project button clicked');
    return;
}

let addProjectBtn = document.getElementById('addProjectButton');
addProjectBtn.addEventListener('click', addProject);

// needs title, description, dueDate, priority, notes, checklist
$(function () {
    $('#addProjectForm').on("submit", function (e) {
        e.preventDefault();
        //   var formData = $(this).serialize();
        var fD = $(this).serializeArray();

        console.log(fD);

        //   for(let key of fD.keys()){
        //     console.log(fD[key].value);
        //   };

        let pTitle = fD[0].value;
        if(pTitle==""){
            console.log('please enter a title');
            // return;
        }
        //   console.log('pTitle = ', pTitle);

        // should be adding a project instead?
        // project name, todo title, email, due date, priority, notes, checklist
        let tempTodo = Todo(
            fD[1].val,
            fD[2].val,
            fD[3].val,
            fD[4].val,
            fD[5].val,
            fD[6].val,
        );

        let tempProject = Project(tempTodo , pTitle);

        // still not adding to existing project
        let index = allProjects.find(tempProject, tempTodo);
        if (index != -1) {
            console.log('found project');
            console.log(allProjects[index]);

            // need link to the project itself
            allProjects[index].addTodo(tempTodo);
        }

        else {
            allProjects.add(Project(tempTodo, pTitle));
        }

        console.log('updated project list');
        console.log(allProjects.display());
        // clear tempTodo memory


    });
});


