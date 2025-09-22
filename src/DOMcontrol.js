import { Handler } from "./logicHandler.js";


export function displayController() {
    const handler = Handler();
    const mainDisplay = document.querySelector('#main-container');

    function generateProjects() {
        handler.projects.forEach( (project) => {
            let projectDiv = document.createElement('div');
            let projectTitle = document.createElement('h1');
            projectTitle.textContent = project.title;
            projectDiv.classList.add('project-container');
            projectDiv.appendChild(projectTitle);

            project.todos.forEach( (todo) => {
                let todoDiv = document.createElement('div');
                todoDiv.classList.add('todo-container');

                let todoTitle = document.createElement('h2');
                todoTitle.textContent = todo.title;

                let todoDesc = document.createElement('p');
                todoDesc.textContent = `Description: ${todo.desc}`;

                //let todoChecklist = document.createElement('ol');

                let todoDueDate = document.createElement('span');
                todoDueDate.textContent = `Due: ${todo.dueDate}`;

                //for todo.priority, change color of todo based on number
                //ALSO display high, medium, or low.
                let todoPriority = document.createElement('div');
                todoPriority.textContent = `Priority: H/M/L`;
                
                //for status, let user toggle
                let todoStatus = document.createElement('button');
                todoStatus.textContent = `Complete?: ${todo.isDone}`;
                todoStatus.classList.add('toggle-status-btn');
                todoStatus.id = todo.todoID;

                //delete todo button
                let delTodoBtn = document.createElement('button');
                delTodoBtn.textContent = 'delete';
                delTodoBtn.classList.add('todo-del-btn');
                delTodoBtn.id = todo.todoID;

                //edit todo button
                let editTodoBtn = document.createElement('button');
                editTodoBtn.textContent = 'edit';
                editTodoBtn.classList.add('todo-edit-btn');
                editTodoBtn.id = todo.todoID;

                todoDiv.appendChild(todoTitle);
                todoDiv.appendChild(todoDesc);
                todoDiv.appendChild(todoDueDate);
                todoDiv.appendChild(todoPriority);
                todoDiv.appendChild(todoStatus);
                todoDiv.appendChild(delTodoBtn);
                todoDiv.appendChild(editTodoBtn);

                projectDiv.appendChild(todoDiv);
            })

            mainDisplay.appendChild(projectDiv);
            
        })

        function wipeProjects() {
            const projects = document.querySelectorAll('.project-container');
            for (let i = projects.length-1; i >= 0; i--) {
                projects[i].remove();
            }
        }

        function resetProjects() {
            wipeProjects();
            generateProjects();
        }

        function deleteTodo(todoID) {

            handler.projects.forEach( (project) => {

                    project.todos.forEach( (todo) => {

                        let matchID = todo.todoID;
                        if (matchID === todoID) { //if the current 'todo' ID in the loop matches the 'todo' clicked on

                            let todoIndex = handler.getTodoIndexByID(todo.projectID, todoID);
                            let projectIndex = handler.getProjectIndexByID(todo.projectID);

                            handler.projects[projectIndex].todos.splice(todoIndex, 1);
                            wipeProjects();
                            resetProjects();

                        }
                    })
                })
        }

        let deleteBtns = document.querySelectorAll('.todo-del-btn');
        let editBtns = document.querySelectorAll('todo-edit-btns');
        let toggleStatusBtns = document.querySelectorAll('.toggle-status-btn');

        deleteBtns.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                deleteTodo(e.target.id);
            })
        })

        toggleStatusBtns.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                let clickedID = e.target.id;
                handler.projects.forEach( (project) => {
                    project.todos.forEach( ( todo ) => {
                        let matchID = todo.todoID;
                        if (matchID === clickedID) {
                            todo.toggleIsDone();
                            resetProjects();
                        }
                    })
                })
            })
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



generateProjects();

}