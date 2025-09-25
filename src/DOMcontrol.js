import { Handler } from "./logicHandler.js";


export function displayController() {
    const handler = Handler();
    const mainDisplay = document.querySelector('#content');

    function generateProjects() {
        let sortedProjects = handler.sortArrayByPriority(handler.projects);
        let sortedTodos = handler.sortArrayByPriority(handler.todos);

        sortedProjects.forEach( (project) => {
            let projectDiv = document.createElement('div');
            let projectTitle = document.createElement('h1');
            projectTitle.textContent = project.title;
            projectDiv.classList.add('project-container');
            projectDiv.appendChild(projectTitle);

            let projectTodos = handler.filterTodosByProjectID(sortedTodos, project.ID);

            projectTodos.forEach( (todo) => {
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
                let pName = todo.getPriorityByName();
                todoPriority.textContent = todo.getPriorityByName();
                
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

        function deleteTodo(targetID) {
            let todoIndex = handler.getTodoIndexByID(targetID);
            handler.todos.splice(todoIndex, 1);
            resetProjects();
        }

        function toggleStatus(targetID) {
            handler.todos.forEach( (todo) => {
                if (todo.todoID === targetID) {
                    todo.toggleIsDone();
                    resetProjects();
                }
            })
        }

        function editTodo(todoID) {
            
        }


        const addTodoBtn = document.querySelector('#add-todo-btn');
        const addTodoDialog = document.querySelector('#add-todo-dialog');
        const addProjectBtn = document.querySelector('#add-project-btn');
        const addProjectDialog = document.querySelector('#add-project-dialog');

        let deleteBtns = document.querySelectorAll('.todo-del-btn');
        let editBtns = document.querySelectorAll('todo-edit-btns');
        let toggleStatusBtns = document.querySelectorAll('.toggle-status-btn');

        addTodoBtn.addEventListener('click', () => {
            addTodoDialog.showModal();
        })
        addProjectBtn.addEventListener('click', () => {
            addProjectDialog.showModal();
        })
        deleteBtns.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                deleteTodo(e.target.id); 
            })
        })

        toggleStatusBtns.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                toggleStatus(e.target.id);
            })
        })
    }


        //testing:


    handler.createProject('House', '1');
    handler.createProject('Baby', '0');

    handler.createTodo('Change nappy','Change Adaidh\'s nappy', [], 'today', 1, false, handler.projects[1].ID);
    handler.createTodo('Feed','Feed Adaidh', [], 'today', 0, true, handler.projects[1].ID);
    handler.createTodo('Give medicine','Give Adaidh his Gaviscon', [], 'today', 1, false, handler.projects[1].ID);

    handler.createTodo('Wash dishes','Wash dishes', [], 'today', 2, true, handler.projects[0].ID);
    handler.createTodo('Make dinner','Make dinner', [], 'tonight', 1, false, handler.projects[0].ID);
    handler.createTodo('Order groceries','Place order for groceries from Waitrose', ['bread','cheese','milk'], 'weekend', 0, false, handler.projects[0].ID);




    generateProjects();

}