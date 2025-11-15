import { Todo } from "./todos.js";
import { Project } from "./projects.js";
import { parseJSON } from "date-fns";

export function Handler() {

    let projects = [];
    let todos = [];

    if (localStorage.length > 0) {
        let restoredProjects = JSON.parse(localStorage.getItem("projects"));
        let restoredTodos = JSON.parse(localStorage.getItem("todos"));

        restoredProjects.forEach( (item) => {
            createProject(item.title, item.priority, item.ID);
        })

        restoredTodos.forEach( (item) => {
            createTodo(item.title, item.desc, item.checklist, item.dueDate, item.priority, item.isDone, item.todoID, item.projectID);
        })
    } else {
        createProject('Personal Projects', 'Low', crypto.randomUUID());
        createTodo('Clean my room', 'Make it tidy!', [
                {value: 'Pick up dirty clothes', isDone: false},
                {value: 'Dust furniture', isDone: false},
                {value: 'Hoover', isDone: false}
            ], '2025-10-31', 0, false, crypto.randomUUID(), projects[0].ID);
    }
    


    function updateLsProjects() {
        console.log('update local storage(projects) reached');
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    function updateLsTodos() {
        console.log('update local storage(todos) reached');
        localStorage.setItem('todos', JSON.stringify(todos));

    }

    function createProject(title, priority, ID) {
        console.log('in createProject');
        let project = new Project(title, priority, ID);
        projects.push(project);
        updateLsProjects();
    }

    function createTodo(title, desc, checklist, dueDate, priority, isDone, todoID, projectID) {
        console.log('in createTodos');
        let todo = new Todo(title, desc, checklist, dueDate, priority, isDone, todoID, projectID);
        todos.push(todo);
        console.log(todos);
        updateLsTodos();
    }

    function updateTodo(todoIndex, inputs) {
        todos[todoIndex].changeAllProperties(
            inputs.title, 
            inputs.desc, 
            inputs.checklist, 
            inputs.dueDate, 
            inputs.priority, 
            inputs.projectID
        );
        updateLsTodos();
    }

    function deleteTodo(targetID) {
        let todoIndex = getTodoIndexByID(targetID);
        todos.splice(todoIndex, 1);
        updateLsTodos();
    }

    function getProjectIndexByID(id) {
        return projects.findIndex(project => project.ID === id);
    }

    function getTodoIndexByID(todoID) {
        return todos.findIndex(todo => todo.todoID === todoID);
    }

    function sortArrayByPriority(array) {
        return array.toSorted( (a, b) => (a.priority - b.priority));
    }

    function filterTodosByProjectID(todoArray, projectID) {
        return todoArray.filter( (todo) => todo.projectID === projectID);
    }

    return {    createProject,
                createTodo,
                updateTodo,
                deleteTodo,
                getProjectIndexByID,
                getTodoIndexByID,
                sortArrayByPriority,
                projects,
                todos,
                filterTodosByProjectID,
     }
}

