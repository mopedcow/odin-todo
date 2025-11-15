export class Project {
    constructor(title, priority, ID) {
        this.title = title;
        this.priority = priority;
        this.ID = ID;
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