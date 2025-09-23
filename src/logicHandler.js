import { Todo } from "./todos.js";
import { Project } from "./projects.js";

export function Handler() {

    let projects = [];
    let todos = [];

    function createProject(title, priority) {
        let project = new Project(title, priority);
        projects.push(project);
    }

    function createTodo(title, desc, checklist, dueDate, priority, isDone, projectID) {
        let todo = new Todo(title, desc, checklist, dueDate, priority, isDone, projectID);
        todos.push(todo);
    }

    function getProjectIndexByID(id) {
        return projects.findIndex(project => project.ID === id);
    }

    function getTodoIndexByID(projectID, todoID) {
        let pIndex = getProjectIndexByID(projectID);
        return projects[pIndex].todos.findIndex(todo => todo.todoID === todoID);
    }

    function sortArrayByPriority(array) {
        return array.toSorted( (a, b) => (a.priority - b.priority));
    }

    function getSortedList() { // for testing in console
        let sortedProjects = sortArrayByPriority(projects);
        let sortedTodos = sortArrayByPriority(todos);
        sortedProjects.forEach( (project) => {
            console.log(`${project.title.toUpperCase()} (priority ${project.priority})`);
            sortedTodos.forEach( (todo) => {
                if (todo.projectID === project.ID) {
                    console.log(` - ${todo.title} (${todo.priority})`);
                }
            })
        })
    }





    return {    createProject,
                getSortedList,
                createTodo,
                getProjectIndexByID,
                getTodoIndexByID,
                sortArrayByPriority,
                projects,
                todos,
     }
}

