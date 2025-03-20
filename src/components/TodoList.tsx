import { useEffect, useState } from "react";
import { getTodos, deleteTodo, updateTodo } from "../api/api"; // Importerar API-funktion för att hämta todos och radera todos
import { Todo } from "../types/Todo"; // Importerar Todo-typen

const TodoList = () => {

  //useState för att spara todos
  const [todos, setTodos] = useState<Todo[]>([]);    /*useState används för att skapa ett tillstånd (todos) för att hålla en lista med todos.*/

  //useEffect används för att hämta todos från API och uppdatera tillståndet när komponenten renderas. 
  useEffect(() => {
    fetchTodos();
  }, []);


  //Simulering 
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  //State för error
  const [error, setError] = useState<string | null>(null);

  //State för laddning av API
  const [loading, setLoading] = useState(false);

  //Hämtar todos
  const fetchTodos = async () => {
    try {

      //Vid fetch sätts loading till true
      setLoading(true);

      //Låter fetch ta 2 sekunder för visning av loading-state
      await delay(2000);

    const todosFromApi = await getTodos();

    //Kontroll om fetch fungerar
    if(!todosFromApi) {
      throw Error;

    } else {
    setTodos(todosFromApi);
    setError(null);           //Om data är satt till Todos-state så nollställs error-state
  }
  } catch(error) {
    console.log(error);
    setError("Något gick fel vid hämtning av poster. Var god försök igen.");
  
  } finally {
    setLoading(false);
  }
  };

  //Raderar todo
  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    fetchTodos(); //Uppdaterarar listan efter radering
  };

  //Uppdatera todo
  const handleUpdate = async (id: string, newStatus: "Ej påbörjad" | "Pågående" | "Avklarad") => {

    //Hitta todo som ska uppdateras
    const todoToUpdate = todos.find(todo => todo._id === id); 

      //Om ingen todo hittas, avbryt
    if (!todoToUpdate) return; 

    const updatedTodo = {
      ...todoToUpdate,
      
      //Används statusvärde från input
      status:newStatus 
    };

    //Uppdateraa todo
    await updateTodo(id, updatedTodo);
    fetchTodos(); //Uppdaterarar listan efter radering
  };


return (
  <div>
    <h2>Att göra-lista</h2>

  {/*Skriver ut felmeddelande via error-state*/}
  {
    error && <p style={{ color: 'red' }}>{error}</p>
  }

    {/*Skriver ut meddelande ang fetch via loading-state*/}
  {
    loading && <p>Laddar in todos...</p>
  }

    <ul>
      {/* Renderar varje todos */}
      {todos.map((todo) => (
        <li key={todo._id}>
          <strong>{todo.title}</strong> - {todo.description} - {todo.status}

             {/* Dropdown för att välja ny status */}
             <select 
            defaultValue={todo.status} 
            onChange={(e) => handleUpdate(todo._id, e.target.value as "Ej påbörjad" | "Pågående" | "Avklarad")}
          >
            <option value="Ej påbörjad">Ej påbörjad</option>
            <option value="Pågående">Pågående</option>
            <option value="Avklarad">Avklarad</option>
          </select>
          
          <button onClick={() => handleDelete(todo._id)}>Radera</button>
        </li>
      ))}
    </ul>
  </div>
);
};

//Exporterar komponenten så den kan användas i App.tsx
export default TodoList;  