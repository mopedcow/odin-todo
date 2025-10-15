export class Project {
    constructor(title, priority) {
        this.title = title;
        this.priority = priority;
        this.ID = crypto.randomUUID();
        this.expanded = false;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    setPriority(newPriority) {
        this.priority = newPriority;
    }

    toggleExpanded() {
        this.expanded = (this.expanded)
            ? false
            : true;
    }
}