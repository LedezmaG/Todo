import { Todo } from "../classes";
import { todoList } from "../index";

const divTodoList = document.querySelector('.todo-list')
const txtNewTodo = document.querySelector('.new-todo')
const btnDeleteCompleted = document.querySelector('.clear-completed')
const ulFilters = document.querySelector('.filters')
const aFilters = document.querySelectorAll('.filtro')

export const createTodo = ( todo ) => {
    const htmlTodo = `<li class="${todo.done && 'completed'}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.done && 'checked'}>
            <label>${ todo.task }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append( div.firstElementChild );
}

txtNewTodo.addEventListener( 'keyup', (e) => {
    if ( e.keyCode === 13 && e.target.value.length > 0 ) {
        const task = new Todo( e.target.value );
        todoList.newTodo( task );
        createTodo( task )
        e.target.value = '';
    }
})

divTodoList.addEventListener( 'click', ({target}) => {
    const nameElement = target.localName;
    const todoElement = target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');
    
    if ( nameElement.includes('input')) {
        todoList.toggleTodo(todoId);
        todoElement.classList.toggle('completed')
    }
    if ( nameElement.includes('button')) {
        todoList.deleteTodo(todoId);
        divTodoList.removeChild( todoElement );
    }
})

btnDeleteCompleted.addEventListener( 'click', ({target}) => {
    todoList.deleteCompleted()
    for (let i = divTodoList.children.length-1; i >= 0; i--) {
        const todo = divTodoList.children[i];
        if ( todo.classList.contains('completed') ) {
            divTodoList.removeChild( todo );
        }
    }
})

ulFilters.addEventListener( 'click', (e) => {
    const filtros = e.target.text;
    if ( !filtros ) return;

    aFilters.forEach( tag => tag.classList.remove('selected'));
    e.target.classList.add('selected')
    for (const todo of divTodoList.children) {
        todo.classList.remove('hidden');
        const completed = todo.classList.contains('completed');
        switch (filtros) {
            case 'Completados':
                if ( completed ) {
                    todo.classList.add('hidden');
                }
            break;
            case 'Pendientes':
                if ( !completed ) {
                    todo.classList.add('hidden');
                }
            break;
        
            default:
                break;
        }
    }
})