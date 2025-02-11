//Komponent hanterar enskilt todo-objekt

import { Todo } from "../types/Todo";
import { updateTodo, deleteTodo } from "../api/api";
import { useState } from "react";


// Definierar props för TodoItem-komponenten
interface Props {
    todo: Todo;                   //innehåller information om todo-objektet
    onTodoUpdated: () => void;    //anropas när todo-objektet har uppdaterats eller raderats
}

// Hanterar visningen och interaktioner för ett enskilt todo
const TodoItem: React.FC<Props> = ({ todo, onTodoUpdated }) => {
    const [newStatus, setNewStatus] = useState(todo.status);


    // Funktion som hanterar ändring av status på todo
    const handleStatusChange = async () => {

        const nextStatus = {
            "Ej påbörjad": "Pågående",
            "Pågående": "Avklarad",
            "Avklarad": "Ej påbörjad"
        }

        [newStatus as "Ej påbörjad" | "Pågående" | "Avklarad"];

        //Kontrollerar att nextStatus är en giltig status
        if (nextStatus !== "Ej påbörjad" && nextStatus !== "Pågående" && nextStatus !== "Avklarad") {

            //Om nextStatus inte är giltig, gör inget
            return;
        }

        //Uppdaterar det lokala statusvärdet
        setNewStatus(nextStatus);  

        //Uppdaterar todo i databasen
        await updateTodo(todo._id, { status: nextStatus }); 

        //Anropar föräldrakomponentens funktion för att uppdatera listan
        onTodoUpdated();  

    };


    //Funktion som raderar todo
    const handleDelete = async () => {
        await deleteTodo(todo._id);

        //informerar föräldrakomponenten om att todo har raderats
        onTodoUpdated();
    };


    return (
        <div className="form-container">
            <div>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p>Status: {newStatus}</p>
                <button onClick={handleStatusChange}>Byt status</button>
                <button onClick={handleDelete}>Ta bort</button>
            </div>
        </div>
    );
};
export default TodoItem;
