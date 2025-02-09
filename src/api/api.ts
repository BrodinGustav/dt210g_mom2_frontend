import axios from "axios";
import { Todo } from "../types/Todo";

//Variabel för API-url
const API_URL = "http://localhost:3000/todos";


//Hämtar alla todos
export const getTodos = async () => {
    const response = await axios.get<Todo[]>(API_URL);  //Lagrar todos i array
    return response.data;   //Returnerar todo-listan 
};




  //JSDoc-kommentarer - Skapar en ny todo i backend.
 /* @param todo Ett nytt Todo-objekt (utan id, eftersom backend genererar det).
 /* @returns Det skapade Todo-objektet från backend.
 */

// Skapa en ny todo
export const createTodo = async (todo: Omit<Todo, "_id">): Promise<Todo> => {    //Utesluter "id"-fältet från Todo-typen
    const response = await axios.post<Todo>(API_URL, todo);
    return response.data;
  };


  //Uppdatera todo
  export const updateTodo = async (id: string, updatedTodo: Partial<Todo>) => {     //Partial<T> tillåter att skicka ett objekt som inte behöver ha alla egenskaper definierade
    const response = await axios.put<Todo>(`${API_URL}/${id}`, updatedTodo);
    return response.data;
  };
  


  //radera todo
  export const deleteTodo = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
  };
 