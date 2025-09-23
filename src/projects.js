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
}