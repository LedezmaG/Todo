import { TodoList } from './classes';
import { createTodo } from './js/componentes';
import './styles.css';

export const todoList = new TodoList()

console.log( todoList );

todoList.todos.forEach( createTodo );