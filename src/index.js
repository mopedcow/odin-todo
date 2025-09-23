import "./styles.css";
import { Handler } from "./logicHandler.js";

//testing:

const handler = Handler();

handler.createProject('House', '1');
handler.createProject('Baby', '0');

handler.createTodo('Change nappy','Change Adaidh\'s nappy', [], 'today', '1', false, handler.projects[1].ID);
handler.createTodo('Feed','Feed Adaidh', [], 'today', '0', true, handler.projects[1].ID);
handler.createTodo('Give medicine','Give Adaidh his Gaviscon', [], 'today', '1', false, handler.projects[1].ID);

handler.createTodo('Wash dishes','Wash dishes', [], 'today', '2', true, handler.projects[0].ID);
handler.createTodo('Make dinner','Make dinner', [], 'tonight', '0', false, handler.projects[0].ID);
handler.createTodo('Order groceries','Place order for groceries from Waitrose', ['bread','cheese','milk'], 'weekend', '0', false, handler.projects[0].ID);


console.log(handler.sortArrayByPriority(handler.todos));
handler.getSortedList();