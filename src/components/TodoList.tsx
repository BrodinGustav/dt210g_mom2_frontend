import { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "../api/api"; // Importerar API-funktion för att hämta todos och radera todos
import { Todo } from "../types/Todo"; // Importerar Todo-typen

const TodoList = () => {

  //useState för att spara todos
  const [todos, setTodos] = useState<Todo[]>([]);    /*useState används för att skapa ett tillstånd (todos) för att hålla en lista med todos.*/

  //useEffect används för att hämta todos från API och uppdatera tillståndet när komponenten renderas. 
  useEffect(() => {
    fetchTodos();
  }, []);

  //Hämtar todos
  const fetchTodos = async () => {
    const todosFromApi = await getTodos();
    setTodos(todosFromApi);
  };

  //Raderar todo
  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    fetchTodos(); //Uppdaterarar listan efter radering
  };


return (
  <div>
    <h2>Att göra-lista</h2>
    <ul>
      {/* Renderar varje todos */}
      {todos.map((todo) => (
        <li key={todo._id}>
          <strong>{todo.title}</strong> - {todo.description} - {todo.status}
          <button onClick={() => handleDelete(todo._id)}>Radera</button>
        </li>
      ))}
    </ul>
  </div>
);
};

//Exporterar komponenten så den kan användas i App.tsx
export default TodoList;  