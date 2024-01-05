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

// as factory function
function Project(newTodo) {
    let todos = [];

    todos.push(newTodo);

    // not sure if 'function' is needed or not
    const addTodo = (newTodo) => {
        todos.push(newTodo);
    }

    return{ todos, addTodo };
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
let groceriesproject = Project (groceries);

groceriesproject.addTodo(groceries2);
console.log(groceriesproject.todos);
