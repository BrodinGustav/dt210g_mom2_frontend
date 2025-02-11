//Importerar useState från React för att hantera lokal komponentstate
import { useState } from "react";

//Importerar funktionen createTodo från API-modulen för att skapa en ny todo
import { createTodo } from "../api/api";

//Importera CreateTodo-typen för att undvika _id
import { CreateTodo } from "../types/Todo";

//Definierar Props-gränssnittet. onTodoAdded är en funktion som anropas när en todo har lagts till
interface Props {
    onTodoAdded: () => void;
}




//Huvudkomponenten TodoForm, som tar funktionen onTodoAdded som prop
const TodoForm: React.FC<Props> = ({ onTodoAdded }) => {

    //useState-hooks för att hålla reda på värdena för titel och beskrivning
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Ej påbörjad");




    //Hanterar submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); //Förhindrar att sidan laddas om 

        //Kontroll av titelns längd
        if (title.length < 3) return alert("Titeln måste vara minst 3 tecken lång");
        if (description.length > 200) return alert("Beskrivningen får max vara 200 tecken");

        // Skapa ett Todo-objekt enligt Todo-typen
        const newTodo: CreateTodo = {
            title,
            description,
            status: "Ej påbörjad",
        };

        //Skickar en API-begäran för att skapa en ny todo 
        await createTodo(newTodo);


        //Återställer titel och beskrivning till tomma strängar efter skapandet
        setTitle("");
        setDescription("");
        setStatus("Ej påbörjad");

        //Anropar onTodoAdded för att informera föräldrakomponenten om att en todo har lagts till
        onTodoAdded();
    };

    
    
    
    
    return (
        // Formuläret för att skapa en ny todo
        <form className="input-container" onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Titel"
                value={title}
                onChange={(e) => setTitle(e.target.value)} //Uppdaterar state när användaren skriver i fältet
                required
            />

            <textarea
                placeholder="Beskrivning"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Uppdaterar state när användaren skriver i textområdet
            />


            {/* Dropdown-meny för status */}
            <select value={status} onChange={(e) => setStatus(e.target.value)}> 
                <option value="Ej påbörjad">Ej påbörjad</option>
                <option value="Pågående">Pågående</option>
                <option value="Klar">Klar</option>
            </select>

            <button type="submit">Lägg till</button>
        </form>
    );
};

export default TodoForm;
