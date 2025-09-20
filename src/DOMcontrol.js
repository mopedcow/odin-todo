import { Handler } from "./logicHandler.js";


export function display() {
    const handler = Handler();
    const mainDisplay = document.querySelector('#main-container');

    function displayProjects() {
        handler.projects.forEach( (project) => {
            let projectDiv = document.createElement('div');
            let projectTitle = document.createElement('h1');
            projectTitle.textContent = project.title;
            projectDiv.appendChild(projectTitle);

            project.todos.forEach( (todo) => {
                let todoTitle = document.createElement('h2');
                todoTitle.textContent = todo.title;

                let todoDesc = document.createElement('p');
                todoDesc.textContent = `Description: ${todo.desc}`;

                //let todoChecklist = document.createElement('ol');

                let todoDueDate = document.createElement('span');
                todoDueDate.textContent = todo.dueDate;

                //for todo.priority, change color of todo based on number
                //ALSO display high, medium, or low.
                let todoPriority = document.createElement('div');
                todoPriority.textContent = `H/M/L`;
                
                //for status, let user toggle
                let todoStatus = document.createElement('button');
                todoStatus.textContent = todo.isDone;



                projectDiv.appendChild(todoTitle);
                projectDiv.appendChild(todoDesc);
                projectDiv.appendChild(todoDueDate);
                projectDiv.appendChild(todoPriority);
                projectDiv.appendChild(todoStatus);
            })

            mainDisplay.appendChild(projectDiv);
        })
    }

















//placeholder projects & todos:
    const laundryList = [
        {   title: 'put laundry in washer',
            isDone: false,
        },
        {
            title: 'take laundry out of washer',
            isDone: false,
        },
        {
            title: 'put in dryer',
            isDone: false,
        },
        {
            title: 'fold',
            isDone: false,
        },
        {
            title: 'put away',
            isDone: false,
}];
handler.createProject('Baby', '0');
handler.createTodoInProject('Bath','Give Adaidh a bath', [], 'evening', 0, true, handler.projects[0].ID);
handler.createTodoInProject('Feed','Feed Adaidh', [], 'afternoon', 0, false, handler.projects[0].ID);

handler.createProject('TOP', '1');
handler.createTodoInProject('Complete app logic', 'Write app internal logic, not including DOM', [], 'evening', 1, true, handler.projects[1].ID);
handler.createTodoInProject('Complete DOM logic', 'Write DOM logic (displaying and sorting todos)', [], 'Sunday', 1, false, handler.projects[1].ID);

handler.createProject('House', '2');
handler.createTodoInProject('Laundry','Do a load of claundry', laundryList, 'Monday', 0, false, handler.projects[2].ID);


//testing in console:
//handler.getSortedList();
//handler.projects[2].todos[0].getChecklist();



displayProjects();

}