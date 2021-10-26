export class Todo {

    static createTodo( obj ){
        const tmp =new Todo( obj.task );
        tmp.id = obj.id;
        tmp.done = obj.done;
        tmp.created = obj.created;
        return tmp
    }

    constructor( task ) {
        this.id = new Date().getTime();
        this.task = task;
        this.done = false;
        this.created = new Date();
    }


} 