import "./styles.css";
import { Todo } from "./todos.js";
import { Project } from "./projects.js";

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




//testing:

const laundryList = [
    {
        title: 'take laundry out of washer',
        isDone: true,
    },
    {
        title: 'put in dryer',
        isDone: false,
    },
    {
        title: 'fold',
        isDone: false,
    },
    {
        title: 'put away',
        isDone: false,
}];


createProject('Personal', 2);
createProject('TOP', 1);
createProject('Baby', 0);


createTodoInProject('laundry', 'do laundry', laundryList, 'today', 0, false, projects[0].ID);

createTodoInProject('todo project', 'work on TOP Todo project', [], 'next week', 2, false, projects[1].ID);

createTodoInProject('Bedtime', 'put Adaidh to bed', [], '19:00', 2, false, projects[2].ID);

createTodoInProject('tummy time', 'do tummy time with Adaidh 10 mins', [] , '12:30', 1, false, projects[2].ID);

createTodoInProject('give medicine', 'give Adaidh Gaviscon', [] , '12:30', 0, false, projects[2].ID);

projects[0].setTitle('My Default List');
projects[0].todos[0].setTitle('Washing');

getSortedList();