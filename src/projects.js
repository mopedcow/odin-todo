export class Project {
    constructor(title, priority) {
        this.title = title;
        this.priority = priority;
        this.ID = crypto.randomUUID();
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    setPriority(newPriority) {
        this.priority = newPriority;
    }

    getID() {
        return this.ID;
    }
}

export function createProject(title, priority) {
    let project = new Project(title, priority);
    projects.push(project);
}

export function getSortedProjects() {
    //sort by priority high-low
    projects.sort( (a, b) => a.priority - b.priority );

    projects.forEach(project => {
    console.log(`${project.priority}: ${project.title} [ID: ${project.ID}]`);
})
}