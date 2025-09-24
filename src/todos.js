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
    }

    setTitle(newTitle) { this.title = newTitle; }
    
    setDesc(newDesc) { this.desc = newDesc; }

    setDueDate(newDate) { this.dueDate = newDate; }

    setPriority(newPriority) { this.priority = newPriority; }

    setProjectID(newProjectID) { this.projectID = newProjectID; }

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

    getPriorityByName() {
        return (this.priority === 0) ? 'High'
            : (this.priority === 1 ) ? 'Medium'
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