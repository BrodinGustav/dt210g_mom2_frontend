import { useEffect, useState } from "react";
import { getTodos } from "./api/api"; // Importerar API-funktion för att hämta todos
import { Todo } from "./types/Todo"; // Importerar Todo-typen

const TodoList = () => {
  
    //useState för att spara todos
  const [todos, setTodos] = useState<Todo[]>([]);    /*useState används för att skapa ett tillstånd (todos) för att hålla en lista med todos.*/

  //useEffect används för att hämta todos från API och uppdatera tillståndet när komponenten renderas. 
  useEffect(() => {

    //Hämtar todos, uppdaterar state
    getTodos().then(setTodos); 

  }, 
  
  []); //Körs endast vid första renderingen

  return (
    <div>
      <h2>Att göra-lista</h2>
      <ul>
      //Renderar varje todo
        {todos.map((todo) => (
          <li key={todo._id}>{todo.title} - {todo.status}</li> 
        ))}
      </ul>
    </div>
  );
};

//Exporterar komponenten så den kan användas i App.tsx
export default TodoList;  