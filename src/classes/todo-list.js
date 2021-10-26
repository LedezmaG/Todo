import { Todo } from "."

export class TodoList {

    constructor() {
        this.loadTodos()
    }

    newTodo( todo ) {
        this.todos.push( todo )
        this.saveTodos()
    }

    deleteTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id )
        this.saveTodos()
    }
    
    toggleTodo( id ) {
        for ( const todo of this.todos ) {
            if ( todo.id == id ) {
               todo.done = !todo.done; 
            }   
        }
        this.saveTodos()
    }

    deleteCompleted() {
        this.todos = this.todos.filter( todo => !todo.done )
        this.saveTodos()
    }
    
    saveTodos(){
        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );
    }

    loadTodos(){
        this.todos = ( localStorage.getItem( 'todo' ) )
                        ? JSON.parse(localStorage.getItem( 'todo' ))
                        : [];

        this.todos = this.todos.map( todo => Todo.createTodo(todo))
    }
}