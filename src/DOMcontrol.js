import { Handler } from "./logicHandler.js";


export function displayController() {
    const handler = Handler();
    const mainDisplay = document.querySelector('#content');

    function wipeProjects() {
        const projects = document.querySelectorAll('.project-container');
        for (let i = projects.length-1; i >= 0; i--) {
            projects[i].remove();
    }}

    function resetProjects() {
        wipeProjects();
        generateProjects();
    }

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

                //todo title
                let todoTitle = document.createElement('h2');
                todoTitle.textContent = todo.title;

                //todo description
                let todoDesc = document.createElement('p');
                todoDesc.textContent = `Description: ${todo.desc}`;
                //  if no description, hide this element
                if (todo.desc === '') {
                    todoDesc.classList.add('hidden');
                }
/* */   
                //todo checklist
                let todoChecklist = document.createElement('div');
                todoChecklist.innerHTML = 
                    `<p>Checklist:</p>`;
                let todoChecklistOL = document.createElement('ol');
                todo.checklist.forEach((item) => {
                    let li = document.createElement('li');
                    //  add button to toggle list item complete/incomplete
                    li.textContent = item.value;
                    todoChecklistOL.appendChild(li);
                })
                todoChecklist.appendChild(todoChecklistOL);

                //  if no checklist, hide this element
                if (todo.checklist.length === 0) {
                    todoChecklist.classList.add('hidden');
                }

                let todoDueDate = document.createElement('span');
                todoDueDate.textContent = `Due: ${todo.dueDate}`;

                //todo priority
                let todoPriority = document.createElement('div');
                //  change color of todo based on number [not added yet]
                //  display high, medium, or low:
                todoPriority.textContent = todo.getPriorityByName();
                
                //todo status (button)
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
                let SubmitEditsBtn = document.createElement('button');
                SubmitEditsBtn.textContent = 'edit';
                SubmitEditsBtn.classList.add('todo-edit-btn');
                SubmitEditsBtn.id = todo.todoID;

                todoDiv.appendChild(todoTitle);
                todoDiv.appendChild(todoDesc);
                todoDiv.appendChild(todoChecklist);
                todoDiv.appendChild(todoDueDate);
                todoDiv.appendChild(todoPriority);
                todoDiv.appendChild(todoStatus);
                todoDiv.appendChild(delTodoBtn);
                todoDiv.appendChild(SubmitEditsBtn);

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
            
                targetIndex = handler.getTodoIndexByID(e.target.id);
                let targetTodo = handler.todos[targetIndex];

                console.log('Editing: ' + targetTodo.title);

                //hide 'add new' options in dialog; show 'edit' ones
                addTodoHeading.classList.add('hidden');
                addTodoSubmit.classList.add('hidden');
                editTodoHeading.classList.remove('hidden');
                SubmitEditsDiv.classList.remove('hidden');

                populateProjectsDropdown();

                //populate form with existing todo properties
                formTitle.value = targetTodo.title;
                formDesc.value = targetTodo.desc;
                formDueDate.value = targetTodo.dueDate;
                
                //show hidden elements if the corresponding properties are not empty
                if (targetTodo.desc !== '') {
                    showDesc();
                }
                if (targetTodo.dueDate !== '') {
                    showDueDate();
                }
/* */
                if (targetTodo.checklist.length !== 0) {
                    //showChecklist();
                    //populate the checklist items
                    targetTodo.checklist.forEach((tick) => {
                        const makeLi = document.createElement('li');
                        const makeInput = document.createElement('input');
                        makeLi.id = 'todo-checklist';
                        makeInput.name = 'checklist-array';
                        makeInput.type = 'text';
                        makeInput.value = tick.value;
                        makeLi.appendChild(makeInput);
                        addTodoListInputs.appendChild(makeLi);
                        console.log('in editbtns e listener (tick): ' + tick);
                        console.log('in editbtns e listener (tick.value): ' + tick.value);
                    })
                }                
                addTodoDialog.showModal();
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
/** */
    const addChecklistBtn = document.querySelector('#add-checklist-button');
    const addChecklist = document.querySelector('#add-checklist');

    const addListItemBtn = document.querySelector('#add-todo-list-inputs-btn');
    const addTodoListInputs = document.querySelector('#add-todo-list-inputs');

    //(Add Todo dialog) form fields:
    const formTitle = document.getElementById('todo-title');
    const formDesc = document.getElementById('desc');
    const formChecklistOL = document.getElementById('add-todo-list-inputs');
    const formDueDate = document.getElementById('due-date');
    const formPHigh = document.getElementById('todo-0');
    const formPMedium = document.getElementById('todo-1');
    const formPLow = document.getElementById('todo-2');
    const formProjectDropdown = document.getElementById('select-todo-project'); 

    //Hide or show depending on whether adding to editing a todo
    const addTodoHeading = document.getElementById('new-todo-heading');
    const addTodoSubmit = document.getElementById('submit-todo');
    const editTodoHeading = document.getElementById('edit-todo-heading');
    const SubmitEditsDiv = document.getElementById('change-todo');
    const SubmitEditsBtn = document.getElementById('change-todo-button');
    //records index of 'todo' being edited currently
    let targetIndex;

    const addProjectDialog = document.querySelector('#add-project-dialog');
    const addProjectBtn = document.querySelector('#add-project-btn');
    const submitProjectBtn = document.querySelector('#submit-project-button');

    const addProjectForm = document.querySelector('#add-project-form');

    addTodoBtn.addEventListener('click', () => {

        //hide 'edit' options in dialog; show 'add new' ones
        editTodoHeading.classList.add('hidden');
        SubmitEditsDiv.classList.add('hidden');
        addTodoHeading.classList.remove('hidden');
        addTodoSubmit.classList.remove('hidden');

        populateProjectsDropdown();

        addTodoDialog.showModal();
    })

    

    addDescBtn.addEventListener('click', () => {
        showDesc();
    })
    function showDesc() {
        addDescBtn.classList.add('hidden');
        addDesc.classList.remove('hidden');
    }
    addDueDateBtn.addEventListener('click', () => {
        showDueDate();
    })
    function showDueDate() {
        addDueDateBtn.classList.add('hidden');
        addDueDate.classList.remove('hidden');
    }
/** 
    addChecklistBtn.addEventListener('click', () => {
        showChecklist();
        generateChecklist();      
    })

    function showChecklist() {
        addChecklistBtn.classList.add('hidden');
        addChecklist.classList.remove('hidden');
    }
*/
    function generateChecklist() {
        for (let i = 3; i > 0; i--) {
            const makeLi = document.createElement('li');
            makeLi.id = 'todo-checklist';
            makeLi.innerHTML = 
            `<input type="text" name="checklist-array">`;
            addTodoListInputs.appendChild(makeLi);
        }
    }
/** 
    addListItemBtn.addEventListener('click', () => {
        let newItemInput = document.createElement('li');
        newItemInput.id = 'todo-checklist';
        newItemInput.innerHTML = 
            `<input type="text" name="checklist-array">`;
        addTodoListInputs.appendChild(newItemInput);
    })
*/
    submitTodoBtn.addEventListener('click', () => {
        addTodo();
        resetProjects();
        addTodoDialog.close();
    })

    SubmitEditsBtn.addEventListener('click', () => {
        console.log('Make changes clicked: ' + handler.todos[targetIndex].title);
        editTodo(targetIndex);
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

        /** //  hide/show checkboxes
        if (addChecklistBtn.classList.contains('hidden')) {
            addChecklistBtn.classList.remove('hidden');
            addChecklist.classList.add('hidden');
        }
        */
         
        /** // remove ALL input boxes(li elements):
        
        let listContainer = document.querySelector('#add-todo-list-inputs');
        let listItems = document.querySelectorAll("#todo-checklist");
        for (let i = listItems.length; i > 0; i--) {
            console.log('deleted an item');
            listContainer.removeChild(listItems[i-1]);
        }
         */
    })

    function populateProjectsDropdown() {
        let projectDropdown = document.querySelector('#select-todo-project');
        projectDropdown.options.length = 0;
        handler.projects.forEach( (project) => {
            let option = document.createElement('option');
            option.text = project.title;
            option.value = project.ID;
            projectDropdown.add(option);
        })
    }

    function makeArrayFromNodeList(nodeList) {
        let makeArray = [];
        nodeList.forEach ((node) => {
            let obj = {
                value: '',
                isDone: false
                };
            if (node.value !== ''){      //skip empty values
                obj.value = node.value;
                makeArray.push(obj);
        }})
        return makeArray;
    }

    function addTodo() {
        const title = document.getElementById('todo-title').value;
        const desc = document.getElementById('desc').value;
/**/    //  confirm a not-empty checklist has been added
        let nodelist = document.querySelectorAll('.checklist-array');
        const checklist = (nodelist.length !== 0)
            ? makeArrayFromNodeList(nodelist)
            : [];
        const dueDate = document.getElementById('due-date').value;
        const priority = document.querySelector('input[name="todo-priority"]:checked').value;
        const isDone = false;
        const projectID = document.getElementById('select-todo-project').value;
        
        handler.createTodo(title, desc, checklist, dueDate, priority, isDone, projectID);
    }

    function editTodo(todoIndex) {
        const title = document.getElementById('todo-title').value;
        const desc = document.getElementById('desc').value;
/** */  //  confirm a not-empty checklist has been added
        let nodelist = document.querySelectorAll('.checklist-array');
        const checklist = (nodelist[0].value !== '')
            ? makeArrayFromNodeList(nodelist)
            : [];
        const dueDate = document.getElementById('due-date').value;
        const priority = document.querySelector('input[name="todo-priority"]:checked').value;
        const projectID = document.getElementById('select-todo-project').value;

        handler.todos[todoIndex].changeAllProperties(title, desc, checklist, dueDate, priority, projectID);
    }

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
    handler.createTodo('Order groceries','Place order for groceries from Waitrose', [{value:'bread', isDone: true},{value:'cheese', isDone: false},{value:'milk', isDone: false}], 'weekend', 0, false, handler.projects[0].ID);

    return {
        generateProjects,
    }
}