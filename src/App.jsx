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

  const deleteTodo = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };

  const restoreTodo = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) todo.isDeleted = false;
      return todo;
    });
    setTodos(newTodos);
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
          return !todo.isDeleted;
        case "important":
          return !todo.isDeleted && todo.isImportant;
        case "completed":
          return !todo.isDeleted && todo.isCompleted;
        case "deleted":
          return todo.isDeleted;
        default:
          console.warn(">>> Invalid FilterId");
          return false;
      }
    });
  }, [todos, selectedFilterId, searchText, selectedCateId]);

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
        todo={todo}
        handleCompletedChange={handleCompletedChange}
        handleTodoClick={(e) => {
          if (clickedTodoId !== todo.id) {
            e.stopPropagation();
            setClickedTodoId(todo.id);
          }
        }}
        active={clickedTodoId === todo.id}
        deleteTodo={selectedFilterId === "deleted" ? deleteTodo : undefined}
        restoreTodo={selectedFilterId === "deleted" ? restoreTodo : undefined}
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
            onSave={
              !clickedTodo.isDeleted
                ? (newTodo) => {
                    updateTodo(newTodo);
                    setClickedTodoId(null);
                  }
                : undefined
            }
            onClick={(e) => e.stopPropagation()}
            onDelete={
              !clickedTodo.isDeleted
                ? () => {
                    updateTodo({ ...clickedTodo, isDeleted: true });
                    setClickedTodoId(null);
                  }
                : () => {
                    deleteTodo(clickedTodo.id);
                    setClickedTodoId(null);
                  }
            }
            onRestore={
              clickedTodo.isDeleted
                ? () => {
                    restoreTodo(clickedTodo.id);
                    setClickedTodoId(null);
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}

export default App;
