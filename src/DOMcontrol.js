import { is } from "date-fns/locale";
import { format } from "date-fns"
import { Handler } from "./logicHandler.js";


export function displayController() {
    const handler = Handler();
    const mainDisplay = document.querySelector('#content');

        // butons in header
    const addTodoBtn = document.querySelector('#add-todo-btn');
    const addProjectBtn = document.querySelector('#add-project-btn');

    // 'add todo' dialog
    const addTodoForm = document.querySelector('#add-todo-form');
    const addTodoDialog = document.querySelector('#add-todo-dialog');
    const submitTodoBtn = document.querySelector('#submit-todo-button');

    // options in 'add todo' dialog
       //  add description
    const addDescBtn = document.querySelector('#add-desc-button');
    const addDesc = document.querySelector('#add-desc');
      //  add due date
    const addDueDateBtn = document.querySelector('#add-due-date-button');
    const addDueDate = document.querySelector('#add-due-date');
      //  add checklist
    const addChecklistBtn = document.querySelector('#add-checklist-button');
    const addChecklist = document.querySelector('#add-checklist');
      //  add checklist item
    const addListItemBtn = document.querySelector('#add-todo-list-inputs-btn');
    const addTodoListInputs = document.querySelector('#add-todo-list-inputs');

    // form fields in 'add todo' dialog
    const formTitle = document.getElementById('todo-title');
    const formDesc = document.getElementById('desc');
    const formChecklistOL = document.getElementById('add-todo-list-inputs');
    const formDueDate = document.getElementById('due-date');
    const formPHigh = document.getElementById('priority-0');
    const formPMedium = document.getElementById('priority-1');
    const formPLow = document.getElementById('priority-2');
    const formProjectDropdown = document.getElementById('select-todo-project'); 

    // 'Add' or 'Edit'?
    const addTodoHeading = document.getElementById('new-todo-heading');
    const addTodoSubmit = document.getElementById('submit-todo');
    const editTodoHeading = document.getElementById('edit-todo-heading');
    const SubmitEditsDiv = document.getElementById('change-todo');
    const SubmitEditsBtn = document.getElementById('change-todo-button');
    // record index of 'todo' being edited currently
    let targetIndex;

    // 'add project' dialog
    const addProjectDialog = document.querySelector('#add-project-dialog');
    const submitProjectBtn = document.querySelector('#submit-project-button');
    const addProjectForm = document.querySelector('#add-project-form');

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
            let projectTitle = document.createElement('button');
            let projectContent = document.createElement('div');

            projectTitle.textContent = project.title;
            projectTitle.classList.add('project-title');
            projectTitle.id = project.ID;

            projectDiv.appendChild(projectTitle);

            projectDiv.classList.add('project-container');
            projectContent.classList.add('project-content');
            projectContent.id = project.ID;
            if (!project.expanded) { 
                projectContent.classList.add('hidden');
            }

            let projectTodos = handler.filterTodosByProjectID(sortedTodos, project.ID);

            projectTodos.forEach( (todo) => {
                let todoDiv = document.createElement('div');
                todoDiv.classList.add('todo-container');

                // todo title
                let todoTitle = document.createElement('h2');
                todoTitle.classList.add('todo-title');
                todoTitle.textContent = todo.title;

                // container for hidden content
                let todoExpandedContent = document.createElement('div');
                todoExpandedContent.classList.add('todo-expanded-content');
                todoExpandedContent.id = todo.todoID;
                if (!todo.expanded) { 
                    todoExpandedContent.classList.add('hidden');
                }

                // todo status (button)
                let todoStatus = document.createElement('button');
                todoStatus.textContent = `Complete?: ${todo.isDone}`;
                todoStatus.classList.add('toggle-status-btn');
                todoStatus.id = todo.todoID;

                // delete todo button:
                let delTodoBtn = document.createElement('button');
                delTodoBtn.textContent = 'delete';
                delTodoBtn.classList.add('todo-del-btn');
                delTodoBtn.id = todo.todoID;

                // edit todo button:
                let SubmitEditsBtn = document.createElement('button');
                SubmitEditsBtn.textContent = 'edit';
                SubmitEditsBtn.classList.add('todo-edit-btn');
                SubmitEditsBtn.id = todo.todoID;

                // todo description
                let todoDesc = document.createElement('p');
                todoDesc.textContent = `Description: ${todo.desc}`;
                //  if no description, hide this element
                if (todo.desc === '') {
                    todoDesc.classList.add('hidden');
                }
  
                // todo checklist
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

                // if no checklist, hide this element
                if (todo.checklist.length === 0) {
                    todoChecklist.classList.add('hidden');
                }

                // todo due date
                let todoDueDate = document.createElement('span');
                
                // if no due date, hide this element
                // if due date, get formatted date
                if (todo.dueDate === '') {
                    todoDueDate.classList.add('hidden');
                } else {
                    let formDate = format(todo.dueDate, 'd MMM yyyy');
                    todoDueDate.textContent = `Due: ${formDate}`;
                }

                let todoExpandBtn = document.createElement('button');
                todoExpandBtn.classList.add('todo-expand-btn');
                todoExpandBtn.textContent = 'Expand...';
                todoExpandBtn.id = todo.todoID;
                
                // todo priority
                let todoPriority = document.createElement('div');
                    //  change color of todo based on number [not added yet]
                    //  display high, medium, or low:
                todoPriority.textContent = todo.getPriorityByName();

                todoDiv.appendChild(todoTitle);
                todoDiv.appendChild(todoStatus);
                todoDiv.appendChild(delTodoBtn);
                todoDiv.appendChild(SubmitEditsBtn);
                todoDiv.appendChild(todoDueDate);
                todoDiv.appendChild(todoExpandBtn);

                todoExpandedContent.appendChild(todoPriority);
                todoExpandedContent.appendChild(todoDesc);
                todoExpandedContent.appendChild(todoChecklist);

                todoDiv.appendChild(todoExpandedContent);

                projectContent.appendChild(todoDiv);

                projectDiv.appendChild(projectContent);
            })
            mainDisplay.appendChild(projectDiv);
        })

        let deleteBtns = document.querySelectorAll('.todo-del-btn');
        let editBtns = document.querySelectorAll('.todo-edit-btn');
        let toggleStatusBtns = document.querySelectorAll('.toggle-status-btn');
        let expandTodoBtn = document.querySelectorAll('.todo-expand-btn');
        let expandProjectBtn = document.querySelectorAll('.project-title');

        expandTodoBtn.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                toggleExpandedTodo(e.target.id);
            })
        })

        expandProjectBtn.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                toggleExpandedProject(e.target.id);
            })
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

        editBtns.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                targetIndex = handler.getTodoIndexByID(e.target.id);
                let targetTodo = handler.todos[targetIndex];

                //hide 'add new' options in dialog; show 'edit' ones
                addTodoHeading.classList.add('hidden');
                addTodoSubmit.classList.add('hidden');
                editTodoHeading.classList.remove('hidden');
                SubmitEditsDiv.classList.remove('hidden');

                populateProjectsDropdown();

                // populate form with existing todo properties
                formTitle.value = targetTodo.title;
                formDesc.value = targetTodo.desc;
                formDueDate.value = targetTodo.dueDate;
                //  select the Project
                for (let i = 0; i < formProjectDropdown.options.length; i++) {
                    if (formProjectDropdown.options[i].value === targetTodo.projectID) {
                        formProjectDropdown.selectedIndex = i;
                    }
                }
                
                //  select the Priority
                switch (targetTodo.priority) {
                    case 0:
                        formPHigh.checked = true;
                        break;
                    case 1:
                        formPMedium.checked = true;
                        break;
                    case 2:
                        formPLow.checked = true;
                        break;
                }
                
                //show hidden elements if the corresponding properties are not empty
                if (targetTodo.desc !== '') {
                    showDesc();
                }
                if (targetTodo.dueDate !== '') {
                    showDueDate();
                }
                if (targetTodo.checklist.length !== 0) {
                    showChecklist();
                    //generate the number of inputs corresponding to checklist length:
                    generateChecklist(targetTodo.checklist.length);
                    //get nodelist of checklist inputs that were created above
                    let checklistInputs = document.querySelectorAll('.checklist-array');
                    //loop thru above and assign value equal to todo checklist values
                    for (let i = 0; i < checklistInputs.length; i++) {
                        checklistInputs[i].value = targetTodo.checklist[i].value;
                    }
                }                
                addTodoDialog.showModal();
            })
        })
    }





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

    addChecklistBtn.addEventListener('click', () => {
        showChecklist();
        generateChecklist(3);      
    })

    function showChecklist() {
        addChecklistBtn.classList.add('hidden');
        addChecklist.classList.remove('hidden');
    }

    function generateChecklist(num) {
        for (let i = 1; i <= num; i++) {
            generateChecklistElement(i);
        }
    }
    function generateChecklistElement(index) {
        // checklist ol: addTodoListInputs
        const li = document.createElement('li');
        const label = document.createElement('label');
        label.htmlFor = `check${index}`;
        label.textContent = `${index}:`;
        label.classList.add('add-checklist-label');
        li.classList.add('add-checklist-input');
        li.innerHTML = 
        `<input type="text" id="check${index}" class="checklist-array">`;
        addTodoListInputs.appendChild(label);
        addTodoListInputs.appendChild(li);
    }

    addListItemBtn.addEventListener('click', () => {
        let index = document.querySelectorAll('.add-checklist-input').length;
        generateChecklistElement(index+1);
    })

    submitTodoBtn.addEventListener('click', () => {
        addTodo();
        resetProjects();
        addTodoDialog.close();
    })

    SubmitEditsBtn.addEventListener('click', () => {
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
        //  hide/show checklist
        if (addChecklistBtn.classList.contains('hidden')) {
            addChecklistBtn.classList.remove('hidden');
            addChecklist.classList.add('hidden');
        }
        // remove ALL input boxes(li elements):
        let listContainer = addTodoListInputs;
        let listItems = document.querySelectorAll(".add-checklist-input");
        let listLabels = document.querySelectorAll(".add-checklist-label");
        for (let i = listItems.length; i > 0; i--) {
            listContainer.removeChild(listItems[i-1]);
            listContainer.removeChild(listLabels[i-1]);
        }

    })

    function populateProjectsDropdown() {
        formProjectDropdown.options.length = 0;
        handler.projects.forEach( (project) => {
            let option = document.createElement('option');
            option.text = project.title;
            option.value = project.ID;
            formProjectDropdown.add(option);
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

    function getFormInfo() {
        const title = document.getElementById('todo-title').value;
        const desc = document.getElementById('desc').value;
        //  confirm a not-empty checklist has been added
        let nodelist = document.querySelectorAll('.checklist-array');
        const checklist = (nodelist.length !== 0)
            ? makeArrayFromNodeList(nodelist)
            : [];
        const dueDate = document.getElementById('due-date').value;
        const priority = Number(document.querySelector('input[name="todo-priority"]:checked').value);
        const isDone = false;
        const projectID = document.getElementById('select-todo-project').value;

        return { 
            title, 
            desc, 
            checklist, 
            dueDate, priority, 
            isDone, 
            projectID 
        }
    }
    function addTodo() {
        let inputs = getFormInfo();
        handler.createTodo(
            inputs.title, 
            inputs.desc, 
            inputs.checklist, 
            inputs.dueDate, 
            inputs.priority, 
            inputs.isDone, 
            inputs.projectID
        );
    }

    function editTodo(todoIndex) {
        let inputs = getFormInfo();

        handler.todos[todoIndex].changeAllProperties(
            inputs.title, 
            inputs.desc, 
            inputs.checklist, 
            inputs.dueDate, 
            inputs.priority, 
            inputs.projectID
        );
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
    }

    function toggleStatus(targetID) {
        handler.todos.forEach( (todo) => {
            if (todo.todoID === targetID) {
                todo.toggleIsDone();
                resetProjects();
            }
        })
    }

    /// Sorting and Expanding Projects and Todos

    function toggleExpandedTodo(id) {
        let todo = handler.todos[handler.getTodoIndexByID(id)];
        todo.toggleExpanded();
        resetProjects();
    }

    function toggleExpandedProject(id) {
        let project = handler.projects[handler.getProjectIndexByID(id)];
        project.toggleExpanded();
        resetProjects();
    }

    const viewProjectsBtn = document.getElementById('view-projects');

    viewProjectsBtn.addEventListener('click', () => {
        viewProjects();
    })

    function viewProjects() {
        let projects = document.querySelectorAll('.project-content');
        projects.forEach( (project) => {
            if (!project.classList.contains('hidden')) {
                project.classList.add('hidden');
            }
        })
    }



        //testing:

    
    handler.createProject('Test Project 2', 1);
    handler.createProject('Test Project 1', 0);

    handler.createTodo('Test todo 1a', 'Description', [
        {value: 'checklist item 1', isDone: false},
        {value: 'checklist item 2', isDone: false},
        {value: 'checklist item 3', isDone: false} 
    ], '2025-10-31', 0, false, handler.projects[0].ID);
    handler.createTodo('Test todo 2a', 'Description', [
        {value: 'checklist item 1', isDone: false},
        {value: 'checklist item 2', isDone: false},
        {value: 'checklist item 3', isDone: false} 
    ], '2025-10-31', 1, false, handler.projects[0].ID);
    handler.createTodo('Test todo 3a', 'Description', [
        {value: 'checklist item 1', isDone: false},
        {value: 'checklist item 2', isDone: false},
        {value: 'checklist item 3', isDone: false} 
    ], '2025-10-31', 2, false, handler.projects[0].ID);


    handler.createTodo('Test todo 2b', 'Description', [
        {value: 'checklist item 1', isDone: false},
        {value: 'checklist item 2', isDone: false},
        {value: 'checklist item 3', isDone: false} 
    ], '2025-10-31', 1, false, handler.projects[1].ID);
    handler.createTodo('Test todo 1b', 'Description', [
        {value: 'checklist item 1', isDone: false},
        {value: 'checklist item 2', isDone: false},
        {value: 'checklist item 3', isDone: false} 
    ], '2025-10-31', 0, false, handler.projects[1].ID);
    handler.createTodo('Test todo 3b', 'Description', [
        {value: 'checklist item 1', isDone: false},
        {value: 'checklist item 2', isDone: false},
        {value: 'checklist item 3', isDone: false} 
    ], '2025-10-31', 2, false, handler.projects[1].ID);

    return {
        generateProjects,
    }
}