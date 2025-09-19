export class Project {
    constructor(title, priority) {
        this.title = title;
        this.priority = priority;
        this.ID = crypto.randomUUID();
        this.todos = [];
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    setPriority(newPriority) {
        this.priority = newPriority;
    }
    
    getTodosByPriority() {
        return this.todos.toSorted( (a, b) => a.priority - b.priority );
    }
}