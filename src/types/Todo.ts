export interface Todo {
    _id: string;
    title: string;
    description?: string;
    status: "Ej påbörjad" | "Pågående" | "Avklarad";
  }
  