//Komponent hanterar enskilt todo-objekt

import { Todo } from "../types/Todo";
import { updateTodo, deleteTodo } from "../api/api";


// Definierar props för TodoItem-komponenten
interface Props {
    todo: Todo;                   //innehåller information om todo-objektet
    onTodoUpdated: () => void;    //anropas när todo-objektet har uppdaterats eller raderats
}

//hanterar visningen och interaktioner för ett enskilt todo
const TodoItem: React.FC<Props> = ({ todo, onTodoUpdated }) => {

    //Funktion som hanterar ändring av status på todo
    const handleStatusChange = async () => {
        const newStatus =
            todo.status === "Ej påbörjad" ? "Pågående" :
                todo.status === "Pågående" ? "Avklarad" : "Ej påbörjad";

        //Anropar updateTodo för att uppdatera todo-objektets status på servern
        await updateTodo(todo._id, { status: newStatus });

        //informera föräldrakomponenten om att todo har uppdaterats
        onTodoUpdated();
    };


    //Funktion som raderar todo
    const handleDelete = async () => {
        await deleteTodo(todo._id);

        //informerar föräldrakomponenten om att todo har raderats
        onTodoUpdated();
    };

    return (
        <div>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <button onClick={handleStatusChange}>Byt status</button>
            <button onClick={handleDelete}>Ta bort</button>
        </div>
    );
};

export default TodoItem;
