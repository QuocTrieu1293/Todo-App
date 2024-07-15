import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./component/TodoItem";
import Checkbox from "./component/Checkbox";
import Sidebar from "./component/Sidebar";

const dummyTodos = [
  {
    id: crypto.randomUUID(),
    value: "Học ReactJS",
    isCompleted: true,
    isImportant: true,
  },
  {
    id: crypto.randomUUID(),
    value: "Học tiếng Anh",
    isCompleted: false,
    isImportant: true,
  },
  {
    id: crypto.randomUUID(),
    value: "Luyện Leetcode",
    isCompleted: false,
    isImportant: false,
  },
  {
    id: crypto.randomUUID(),
    value: "Tập thể dục",
    isCompleted: true,
    isImportant: false,
  },
  {
    id: crypto.randomUUID(),
    value: "Học Laravel",
    isCompleted: false,
    isImportant: true,
  },
];

function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const todoInputRef = useRef(null);
  const [clickedTodoId, setClickedTodoId] = useState(null);

  const handleCompletedChange = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) todo.isCompleted = !todo.isCompleted;
      return todo;
    });
    setTodos(newTodos);
  };

  const updateTodo = (newTodo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === newTodo.id) {
        todo = { ...todo, ...newTodo };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const clickedTodo = todos.find((todo) => todo.id === clickedTodoId);

  const todoItems = todos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        id={todo.id}
        value={todo.value}
        isCompleted={todo.isCompleted}
        isImportant={todo.isImportant}
        handleCompletedChange={handleCompletedChange}
        handleTodoClick={setClickedTodoId}
        active={clickedTodoId === todo.id}
      />
    );
  });

  return (
    <div
      className="container"
      // onClick={() => {
      //   if (clickedTodo) setClickedTodoId(null);
      // }}
    >
      <input
        ref={todoInputRef}
        type="text"
        name="todoInput"
        placeholder="Nhập việc cần làm"
        className="todo-input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTodos([
              ...todos,
              {
                id: crypto.randomUUID(),
                value: e.target.value,
                isCompleted: false,
                isImportant: false,
              },
            ]);
            // todos.push({ id: crypto.randomUUID(), value: e.target.value });
            // e.target.value = "";
            todoInputRef.current.value = "";
          }
        }}
      />
      {todoItems}
      {clickedTodoId && (
        <Sidebar
          key={clickedTodoId}
          todo={clickedTodo}
          onCancel={() => setClickedTodoId(null)}
          onSave={(newTodo) => {
            updateTodo(newTodo);
            setClickedTodoId(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
