export class Todo {
    constructor(title, desc, dueDate, priority, isDone) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
        this.todoID = crypto.randomUUID();
        //this.projectID = projectID;
    }

    setDueDate(newDate) {
        this.dueDate = newDate;
    }

    setPriority(newPriority) {
        this.priority = newPriority;
    }

    toggleIsDone() {
        (!this.isDone) ? this.isDone = true : this.isDone = false;
    }

    getInfo() {
        console.log(`to-do: ${this.title}`);
        console.log(``);
    }
}