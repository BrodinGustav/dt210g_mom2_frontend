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
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const [newDescription, setNewDescription] = useState(todo.description);
    const [newStatus, setNewStatus] = useState(todo.status);

    // Funktion som hanterar uppdatering av alla typer av todo-egenskaper
    const handleTodoUpdate = async (field: string, value: any) => {
        const updatedTodo = {
            ...todo,
            [field]: value
        };
        await updateTodo(todo._id, updatedTodo);
        onTodoUpdated();
    };

    // Funktion som hanterar ändring av status på todo
    const handleStatusChange = () => {
        const nextStatus = {
            "Ej påbörjad": "Pågående",
            "Pågående": "Avklarad",
            "Avklarad": "Ej påbörjad"
        }[todo.status];

        handleTodoUpdate("status", nextStatus);
    };

      // Funktion som hanterar uppdatering av titel, beskrivning eller status vid redigering
      const handleSaveEdit = () => {
        handleTodoUpdate("title", newTitle);
        handleTodoUpdate("description", newDescription);
        handleTodoUpdate("status", newStatus);
        setIsEditing(false);  // Stänger redigeringsläget
    };


        //Funktion som raderar todo
        const handleDelete = async () => {
            await deleteTodo(todo._id);

            //informerar föräldrakomponenten om att todo har raderats
            onTodoUpdated();
        };


       return (
        <div className="form-container">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as "Ej påbörjad" | "Pågående" | "Avklarad")}
                    >
                        <option value="Ej påbörjad">Ej påbörjad</option>
                        <option value="Pågående">Pågående</option>
                        <option value="Avklarad">Avklarad</option>
                    </select>
                    <button onClick={handleSaveEdit}>Uppdatera</button>
                    <button onClick={() => setIsEditing(false)}>Avbryt</button>
                </div>
            ) : (
                <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <p>Status: {todo.status}</p>
                    <button onClick={handleStatusChange}>Byt status</button>
                    <button onClick={handleDelete}>Ta bort</button>
                    <button onClick={() => setIsEditing(true)}>Redigera</button>
                </div>
            )}
        </div>
    );
};
    export default TodoItem;
