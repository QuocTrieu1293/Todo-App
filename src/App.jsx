import { useState } from "react";
import "./App.css";
import TodoItem from "./component/TodoItem";

const dummyTodos = [
  { id: crypto.randomUUID(), value: "Học ReactJS", isCompleted: true },
  { id: crypto.randomUUID(), value: "Học tiếng Anh", isCompleted: false },
  { id: crypto.randomUUID(), value: "Luyện Leetcode", isCompleted: false },
  { id: crypto.randomUUID(), value: "Tập thể dục", isCompleted: true },
  { id: crypto.randomUUID(), value: "Học Laravel", isCompleted: false },
];

function App() {
  const [todos, setTodos] = useState(dummyTodos);

  const handleCompletedChange = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) todo.isCompleted = !todo.isCompleted;
      return todo;
    });
    setTodos(newTodos);
  };

  const todoItems = todos.map((todo) => {
    return (
      <TodoItem
        value={todo.value}
        key={todo.id}
        isCompleted={todo.isCompleted}
        onCompletedChange={() => handleCompletedChange(todo.id)}
      />
    );
  });

  return (
    <div className="container">
      <input
        type="text"
        name="todoInput"
        placeholder="Nhập việc cần làm"
        className="todo-input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTodos([
              ...todos,
              { id: crypto.randomUUID(), value: e.target.value },
            ]);
            // todos.push({ id: crypto.randomUUID(), value: e.target.value });
            e.target.value = "";
          }
        }}
      />
      {todoItems}
    </div>
  );
}

export default App;
