export class Todo {
    constructor(title, desc, checklist, dueDate, priority, isDone) {
        this.title = title;
        this.desc = desc;
        this.checklist = checklist;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
        this.todoID = crypto.randomUUID();
        //this.projectID = projectID;
    }

    //setDueDate(newDate) { this.dueDate = newDate; }

    //setPriority(newPriority) { this.priority = newPriority; }

    toggleIsDone() {
        (!this.isDone) ? this.isDone = true : this.isDone = false;
    }

    toggleChecklistItemStatus(itemNo) {
        if (itemNo >= this.checklist.length) {
            return console.log('no item');
        }

        console.log('toggled!');
        return (!this.checklist[itemNo].isDone) 
            ? this.checklist[itemNo].isDone = true 
            : this.checklist[itemNo].isDone = false ;
    }

    getInfo() {
        console.log(`to-do: ${this.title}`);
        console.log(`priority: ${this.priority}`);
        console.log(`ID: ${this.todoID}`);
        console.log(`desc: ${this.desc}`);
        console.log(`due: ${this.dueDate}`);
        console.log(`done?: ${this.isDone}`);
    }
    getChecklist() {
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