import "./styles.css";
import { Todo } from "./todos.js";

const testList = [
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

const testList2 = [];

const testProjID = crypto.randomUUID();

const test = new Todo('laundry', 'do laundry', testList, 'today', '1', false, testProjID);

test.getInfo();

test.getChecklist();