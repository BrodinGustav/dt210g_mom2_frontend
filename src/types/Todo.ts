export interface Todo {
    _id: string; //Gör ID valfritt
    title: string;
    description?: string;
    status: "Ej påbörjad" | "Pågående" | "Avklarad";
  }
  
  export type CreateTodo = Omit<Todo, "_id">;  //Skapar en ny typ där _id tas bort