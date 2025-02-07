import axios from "axios";
import { Todo } from "./types/Todo";

//Variabel för API-url
const API_URL = "http://localhost:5000/todos";


//Hämtar alla todos
export const getTodos = async () => {
    const response = await axios.get<Todo[]>(API_URL);
    return response.data;
};