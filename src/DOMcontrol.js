import { Handler } from "./logicHandler.js";


export function displayController() {
    //console.log('top of domcontroller!!!');

    const handler = Handler();
    const mainDisplay = document.querySelector('#content');

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

    function generateProjects() {
        //console.log('top of generate projects!!!!!');
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

                //check if description present
                //  if none, hide this div
                let todoDesc = document.createElement('p');
                todoDesc.textContent = `Description: ${todo.desc}`;

                let todoChecklist = document.createElement('div');
                todoChecklist.innerHTML = 
                    `<p>Checklist:</p>`;
                let todoChecklistOL = document.createElement('ol');
                todo.checklist.forEach((item) => {
                    let li = document.createElement('li');
                    li.textContent = item.value;
                    todoChecklistOL.appendChild(li);
                })
                todoChecklist.appendChild(todoChecklistOL);
                if (todo.checklist.length === 0) {
                    todoChecklist.classList.add('hidden');
                }

                let todoDueDate = document.createElement('span');
                todoDueDate.textContent = `Due: ${todo.dueDate}`;

                //for todo.priority, change color of todo based on number [not added yet]
                let todoPriority = document.createElement('div');
                //ALSO display high, medium, or low:
                todoPriority.textContent = todo.getPriorityByName();
                
                //for status, let user toggle:
                let todoStatus = document.createElement('button');
                todoStatus.textContent = `Complete?: ${todo.isDone}`;
                todoStatus.classList.add('toggle-status-btn');
                todoStatus.id = todo.todoID;

                //delete todo button:
                let delTodoBtn = document.createElement('button');
                delTodoBtn.textContent = 'delete';
                delTodoBtn.classList.add('todo-del-btn');
                delTodoBtn.id = todo.todoID;

                //edit todo button:
                let editTodoBtn = document.createElement('button');
                editTodoBtn.textContent = 'edit';
                editTodoBtn.classList.add('todo-edit-btn');
                editTodoBtn.id = todo.todoID;

                todoDiv.appendChild(todoTitle);
                todoDiv.appendChild(todoDesc);
                todoDiv.appendChild(todoChecklist);
                todoDiv.appendChild(todoDueDate);
                todoDiv.appendChild(todoPriority);
                todoDiv.appendChild(todoStatus);
                todoDiv.appendChild(delTodoBtn);
                todoDiv.appendChild(editTodoBtn);

                projectDiv.appendChild(todoDiv);
            })
            mainDisplay.appendChild(projectDiv);
        })

        let deleteBtns = document.querySelectorAll('.todo-del-btn');
        let editBtns = document.querySelectorAll('.todo-edit-btn');
        let toggleStatusBtns = document.querySelectorAll('.toggle-status-btn');

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

        editBtns.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                console.log('edit btn clicked: ' + e.target.id);
            })
        })
    }

    const addTodoForm = document.querySelector('#add-todo-form');
    const addTodoDialog = document.querySelector('#add-todo-dialog');
    const addTodoBtn = document.querySelector('#add-todo-btn');
    const submitTodoBtn = document.querySelector('#submit-todo-button');

    const addDescBtn = document.querySelector('#add-desc-button');
    const addDesc = document.querySelector('#add-desc');

    const addDueDateBtn = document.querySelector('#add-due-date-button');
    const addDueDate = document.querySelector('#add-due-date');

    const addChecklistBtn = document.querySelector('#add-checklist-button');
    const addChecklist = document.querySelector('#add-checklist');

    const addListItemBtn = document.querySelector('#add-todo-list-inputs-btn');
    const addTodoListInputs = document.querySelector('#add-todo-list-inputs');

    addTodoBtn.addEventListener('click', () => {
        //generate projects as options in dropdown
        let projectDropdown = document.querySelector('#select-todo-project');
        projectDropdown.options.length = 0;
        handler.projects.forEach( (project) => {
            let option = document.createElement('option');
            option.text = project.title;
            option.value = project.ID;
            projectDropdown.add(option);
        })
        
        addTodoDialog.showModal();
    })

    addDescBtn.addEventListener('click', () => {
        addDescBtn.classList.add('hidden');
        addDesc.classList.remove('hidden');
    })
    addDueDateBtn.addEventListener('click', () => {
        addDueDateBtn.classList.add('hidden');
        addDueDate.classList.remove('hidden');
    })
    addChecklistBtn.addEventListener('click', () => {
        addChecklistBtn.classList.add('hidden');
        addChecklist.classList.remove('hidden');      
    })
    addListItemBtn.addEventListener('click', () => {
        let newItemInput = document.createElement('li');
        newItemInput.classList.add('extra-checklist-input');
        newItemInput.innerHTML = 
            `<input type="text" name="checklist-array" id="todo-checklist">`;
        addTodoListInputs.appendChild(newItemInput);
    })
    submitTodoBtn.addEventListener('click', () => {
        addTodo();
        resetProjects();
        addTodoDialog.close();
    })
    addTodoDialog.addEventListener('close', () => {
        addTodoForm.reset();
        if (addDueDateBtn.classList.contains('hidden')) {
            addDueDateBtn.classList.remove('hidden');
            addDueDate.classList.add('hidden');
        }
        if (addDescBtn.classList.contains('hidden')) {
            addDescBtn.classList.remove('hidden');
            addDesc.classList.add('hidden');
        }
        if (addChecklistBtn.classList.contains('hidden')) {
            addChecklistBtn.classList.remove('hidden');
            addChecklist.classList.add('hidden');
            //  remove any extra input boxes:
            let listContainer = document.querySelector('#add-todo-list-inputs');
            let extraItems = document.querySelectorAll(".extra-checklist-input");
            for (let i = extraItems.length; i > 0; i--) {
                listContainer.removeChild(extraItems[i-1]);
            }
        }
    })

    function addTodo() {
        const title = document.getElementById('todo-title').value;
        const desc = document.getElementById('desc').value;
        const checklist = 
            (addChecklistBtn.classList.contains('hidden')) 
            ? document.getElementsByName('checklist-array') 
            : [];
        const dueDate = document.getElementById('due-date').value;
        const priority = document.querySelector('input[name="todo-priority"]:checked').value;
        const isDone = false;
        const projectID = document.getElementById('select-todo-project').value;
        
        handler.createTodo(title, desc, checklist, dueDate, priority, isDone, projectID);
    }

    const addProjectDialog = document.querySelector('#add-project-dialog');
    const addProjectBtn = document.querySelector('#add-project-btn');
    const submitProjectBtn = document.querySelector('#submit-project-button');

    const addProjectForm = document.querySelector('#add-project-form');

    addProjectBtn.addEventListener('click', () => {
        addProjectDialog.showModal();
    })

    submitProjectBtn.addEventListener('click', (e) => {
        //e.preventDefault();
        addProject();
        resetProjects();
        addProjectDialog.close();
    })

    addProjectDialog.addEventListener('close', () => {
        addProjectForm.reset();
    })

    function addProject() {
        const title = document.getElementById('project-title').value;
        const priority = document.querySelector('input[name="project-priority"]:checked').value;
        handler.createProject(title, priority);
    }

    function editTodo(todoID) {
        
    }

    function deleteTodo(targetID) {
        let todoIndex = handler.getTodoIndexByID(targetID);
        handler.todos.splice(todoIndex, 1);
        resetProjects();
        console.log(handler.todos);
    }

    function toggleStatus(targetID) {
        handler.todos.forEach( (todo) => {
            if (todo.todoID === targetID) {
                todo.toggleIsDone();
                resetProjects();
            }
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
    handler.createTodo('Order groceries','Place order for groceries from Waitrose', [{value:'bread'},{value:'cheese'},{value:'milk'}], 'weekend', 0, false, handler.projects[0].ID);

//['bread','cheese','milk']
//[{value:'bread'},{value:'cheese'},{value:'milk'}]



    return {
        generateProjects,
    }
}