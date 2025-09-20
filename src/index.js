import "./styles.css";


import { Handler } from "./logicHandler.js";
import { displayTodos } from "./DOMcontrol.js";

//testing:

const laundryList = [
    {
        title: 'take laundry out of washer',
        isDone: true,
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

const handler = Handler();



handler.createProject('Baby', '0');
handler.createTodoInProject('Bath','Give Adaidh a bath', [], 'evening', 0, true, handler.projects[0].ID);
handler.createTodoInProject('Feed','Feed Adaidh', [], 'afternoon', 0, false, handler.projects[0].ID);

handler.createProject('TOP', '1');
handler.createTodoInProject('Complete app logic', 'Write app internal logic, not including DOM', [], 'evening', 1, false, handler.projects[1].ID);

handler.getSortedList();