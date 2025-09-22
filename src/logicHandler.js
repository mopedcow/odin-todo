import { Todo } from "./todos.js";
import { Project } from "./projects.js";

export function Handler() {

    let projects = [];

    function createProject(title, priority) {
        let project = new Project(title, priority);
        projects.push(project);
    }

    function getSortedProjects() {
        return projects.toSorted( (a, b) => a.priority - b.priority );
    }

    function getSortedList() {
        const sortedProjects = getSortedProjects();

        sortedProjects.forEach( project => {
            console.log(`${project.priority}: ${project.title} [ID: ${project.ID}]`);

            const sortedTodos = project.getTodosByPriority();
            sortedTodos.forEach( todo => {
                console.log(`# ${todo.title}`);
            })
    })}

    function createTodoInProject(title, desc, checklist, dueDate, priority, isDone, projectID) {

        let todo = new Todo(title, desc, checklist, dueDate, priority, isDone, projectID);
        
        let projectIndex = getProjectIndexByID(projectID);

        projects[projectIndex].todos.push(todo);
    }

    function getProjectIndexByID(id) {
        return projects.findIndex(project => project.ID === id);
    }

    function getTodoIndexByID(projectID, todoID) {
        let pIndex = getProjectIndexByID(projectID);
        return projects[pIndex].todos.findIndex(todo => todo.todoID === todoID);
    }

    return {    createProject,
                getSortedList,
                createTodoInProject,
                getProjectIndexByID,
                getTodoIndexByID,
                projects,
     }
}

