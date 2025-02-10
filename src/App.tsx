import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>DT210G Moment 2</h1>

        {/* TodoForm-komponenten för att skapa nya todos. */}
      <TodoForm onTodoAdded={() => window.location.reload()} />
      
       {/* Renderar alla todos */}
      <TodoList />
    </div>
  );
}

export default App;
