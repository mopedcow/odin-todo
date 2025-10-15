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
        (!this.isDone) ? this.isDone = true : this.isDone = false;
    }

    toggleChecklistItemStatus(itemNo) {
        if (itemNo >= this.checklist.length) {
            return console.log('error: no checklist item');
        }
        return (!this.checklist[itemNo].isDone) 
            ? this.checklist[itemNo].isDone = true 
            : this.checklist[itemNo].isDone = false ;
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

    // methods for testing in console:
    getInfo() {
        console.log(`to-do: ${this.title}`);
        console.log(`priority: ${this.priority}`);
        console.log(`ID: ${this.todoID}`);
        console.log(`Project ID: ${this.projectID}`);
        console.log(`desc: ${this.desc}`);
        console.log(`due: ${this.dueDate}`);
        console.log(`done?: ${this.isDone}`);
    }
    getChecklist() {
        if (this.checklist.length === 0) { return console.log('no checklist'); }

        let status = '';
        let no = 0;

        console.log((`${this.title} checklist:`).toUpperCase());

        this.checklist.forEach(item => {
            status = (item.isDone) ? 'complete' : 'incomplete';
            console.log(`${no}: ${item.title} [${status}]`);
            no++;
        });
    }
}