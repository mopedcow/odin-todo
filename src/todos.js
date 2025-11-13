export class Todo {
    constructor(title, desc, checklist, dueDate, priority, isDone, projectID) {
        this.title = title;
        this.desc = desc;
        this.checklist = checklist;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
        this.todoID = crypto.randomUUID();
        this.projectID = projectID;
        this.expanded = false;
    }

    changeAllProperties(newTitle, newDesc, newChecklist, newDueDate, newPriority, newProjectID) {
        this.title = newTitle;
        this.desc = newDesc;
        this.checklist = newChecklist;
        this.dueDate = newDueDate;
        this.priority = newPriority;
        this.projectID = newProjectID;
    }

    toggleIsDone() {
        this.isDone = (!this.isDone)
            ? true
            : false;
    }

    toggleExpanded() {
        this.expanded = (this.expanded)
            ? false
            : true;
    }

    getPriorityByName() {
        return (Number(this.priority) === 0) ? 'High'
            : (Number(this.priority) === 1 ) ? 'Medium'
            : 'Low';
    }

}