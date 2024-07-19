import { useMemo, useRef, useState } from "react";
import "./App.css";
import FilterPanel from "./component/FilterPanel";
import Sidebar from "./component/Sidebar";
import TodoItem from "./component/TodoItem";
import { useAppContext } from "./context/AppProvider";

function App() {
  console.log("App component rendered");

  const { todos, setTodos, searchText, selectedCateId, selectedFilterId } =
    useAppContext();
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

  const addNewTodo = (e) => {
    if (e.key === "Enter") {
      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          value: e.target.value,
          isCompleted: false,
          isImportant: false,
          isDeleted: false,
        },
      ]);
      // todos.push({ id: crypto.randomUUID(), value: e.target.value });
      // e.target.value = "";
      todoInputRef.current.value = "";
    }
  };

  // expensive function -> useMemo
  const filteredTodos = useMemo(() => {
    // console.log("execute expensive func");
    return todos.filter((todo) => {
      if (!todo.value.toLowerCase().includes(searchText.toLowerCase().trim()))
        return false;

      if (selectedCateId !== "all" && selectedCateId !== todo.cateId)
        return false;

      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant === true;
        case "completed":
          return todo.isCompleted === true;
        case "deleted":
          return todo.isDeleted === true;
        default:
          console.warn(">>> Invalid FilterId");
          return false;
      }
    });
  }, [todos, selectedFilterId, searchText, selectedCateId]);

  console.log({ filteredTodos });

  // expensive function -> useMemo
  const clickedTodo = useMemo(() => {
    // console.log("clickedTodoFunc run");
    if (!clickedTodoId) return null;
    return filteredTodos.find((todo) => todo.id === clickedTodoId);
  }, [clickedTodoId]);

  const filteredTodoItems = filteredTodos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        id={todo.id}
        value={todo.value}
        isCompleted={todo.isCompleted}
        isImportant={todo.isImportant}
        handleCompletedChange={handleCompletedChange}
        handleTodoClick={(e) => {
          if (clickedTodoId !== todo.id) {
            e.stopPropagation();
            setClickedTodoId(todo.id);
          }
        }}
        active={clickedTodoId === todo.id}
      />
    );
  });

  return (
    <div
      className="container"
      onClick={() => {
        if (clickedTodo) setClickedTodoId(null);
      }}
    >
      <FilterPanel />
      <div className="main-container">
        <input
          ref={todoInputRef}
          type="text"
          name="todoInput"
          placeholder="Nhập việc cần làm"
          className="todo-input"
          onKeyDown={addNewTodo}
        />
        {filteredTodoItems}
        {clickedTodoId && (
          <Sidebar
            key={clickedTodoId}
            todo={clickedTodo}
            onCancel={() => setClickedTodoId(null)}
            onSave={(newTodo) => {
              updateTodo(newTodo);
              setClickedTodoId(null);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
}

export default App;
