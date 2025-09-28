import { Handler } from "./logicHandler.js";


export function displayController() {
    console.log('top of domcontroller!!!');

    const handler = Handler();
    const mainDisplay = document.querySelector('#content');

    function generateProjects() {
        console.log('top of generate projects!!!!!');
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

    const addTodoDialog = document.querySelector('#add-todo-dialog');
    const addProjectDialog = document.querySelector('#add-project-dialog');

    const addTodoBtn = document.querySelector('#add-todo-btn');
    const addProjectBtn = document.querySelector('#add-project-btn');

    const submitTodoBtn = document.querySelector('#submit-todo-button');
    const submitProjectBtn = document.querySelector('#submit-project-button');

    addTodoBtn.addEventListener('click', () => {
        let projectDropdown = document.querySelector('#select-todo-project');
        handler.projects.forEach( (project) => {
            let option = document.createElement('option');
            option.text = project.title;
            option.value = project.ID;
            projectDropdown.add(option);
        })
        
        addTodoDialog.showModal();
    })

    submitTodoBtn.addEventListener('click', () => {
        const title = document.getElementById('todo-title').value;
        const desc = document.getElementById('desc').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.querySelector('input[name="todo-priority"]:checked').value;
        const isDone = false;
        const projectID = document.getElementById('select-todo-project').value;

        handler.createTodo(title, desc, [], dueDate, priority, isDone, projectID);

        resetProjects();
        addTodoDialog.close();
    })

    addProjectBtn.addEventListener('click', () => {
        addProjectDialog.showModal();
        let projectScreen = document.querySelector('#add-project-container');
        let testDiv = document.createElement('div');
        testDiv.textContent = 'HELLO!';
        projectScreen.appendChild(testDiv);
    })

    submitProjectBtn.addEventListener('click', (e) => {
        //e.preventDefault();
        const title = document.getElementById('project-title').value;
        const priority = document.querySelector('input[name="project-priority"]:checked').value;

        handler.createProject(title, priority);
        resetProjects();

        addProjectDialog.close();
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

    function addTodo() {

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
    handler.createTodo('Order groceries','Place order for groceries from Waitrose', ['bread','cheese','milk'], 'weekend', 0, false, handler.projects[0].ID);





    return {
        generateProjects,
    }
}