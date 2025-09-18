import "./styles.css";
import { Todo } from "./todos.js";
import { Project } from "./projects.js";


const projects = [];
const todos = [];

function createProject(title, priority) {
    let project = new Project(title, priority);
    projects.push(project);
}

function getSortedProjects() {
    //sort by priority high-low
    projects.sort( (a, b) => a.priority - b.priority );

    projects.forEach(project => {
    console.log(`${project.priority}: ${project.title} [ID: ${project.ID}]`);
})
}

createProject('Personal', 3);
createProject('TOP', 2);
createProject('Baby', 1);

getSortedProjects();

console.log(projects[1].ID);



//testing:

/*
const testList = [
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

console.log('project id: ' + defaultProject.ID);

const test = new Todo('laundry', 'do laundry', testList, 'today', '1', false, defaultProject.ID);

console.log('match: ' + test.projectID);

*/