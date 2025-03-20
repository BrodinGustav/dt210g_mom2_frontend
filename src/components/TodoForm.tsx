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



//Interface får kontroll över fel
interface ErrorsData {
    title?: string,
    description?: string
}

interface FormData {
    title: string,
    description: string,
    status: string
}



//Huvudkomponenten TodoForm, som tar funktionen onTodoAdded som prop
const TodoForm: React.FC<Props> = ({ onTodoAdded }) => {

    //States för formulär
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Ej påbörjad");




    //State för error
    const [errors, setErrors] = useState<ErrorsData>({})    //Statet innehåller interface ErrorsData


    //Funktion som validerar input innan formulär skickas
    const validateForm = ((data: FormData) => {

        //Lagrar error i objekt med interface ErrorsData
        const validationErrors: ErrorsData = {};

        if (!data.title) {
            validationErrors.title = "Titel får inte vara tom.";
        } else if (data.title.length < 3) {
            validationErrors.title = "Titel måste vara minst 3 tecken långt.";
        }

        if (!data.description) {
            validationErrors.description = "Beskrivning får inte vara tom.";
        } else if (data.description.length > 200) {
            validationErrors.description = "Beskrivningen får max vara 200 tecken";
        }

        console.log(validationErrors);

        //Returnerar samtliga error
        return validationErrors;

    }
    )



    //Hanterar submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); //Förhindrar att sidan laddas om 

        //Skapar ett tillfälligt objekt att validera input pga separata useState-hooks för input
        const tempFormData: FormData = {
            title,
            description,
            status
        };


        //Skickar iväg datan som innehåller staten med de olika värdena för fälten inför validering
        const validationErrors = validateForm(tempFormData)

        //Kontroll om error finns i validationErrors
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

        } else {
            setErrors({});
        }




        // Skapa ett Todo-objekt enligt Todo-typen
        const newTodo: CreateTodo = {
            title,
            description,
            status: "Ej påbörjad",
        };

        //Skickar en API-begäran för att skapa en ny todo 
        await createTodo(newTodo);

        try {

            //Återställer titel och beskrivning till tomma strängar efter skapandet
            setTitle("");
            setDescription("");
            setStatus("Ej påbörjad");

            //Anropar onTodoAdded för att informera föräldrakomponenten om att en todo har lagts till
            onTodoAdded();
        } catch (error) {
            console.error("Fel vid skapande av Todo:", error);
        }
    };





    return (
        // Formuläret för att skapa en ny todo
        <form className="input-container" onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Titel"
                value={title}
                onChange={(e) => setTitle(e.target.value)} //Uppdaterar state när användaren skriver i fältet
            />

            {/*Skriver ut error till front*/}
            {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}

            <textarea
                placeholder="Beskrivning"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Uppdaterar state när användaren skriver i textområdet
            />


            {/*Skriver ut error till front*/}
            {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}

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
