import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <h1>Att göra-lista</h1>

        {/* TodoForm-komponenten för att skapa nya todos. */}
      <TodoForm onTodoAdded={() => window.location.reload()} />
      
       {/* Renderar alla todos */}
      <TodoList />
    </div>
  );
}

export default App;
