import { useMemo, useState } from "react";
import "./App.css";
import FilterPanel from "./component/FilterPanel";
import Sidebar from "./component/Sidebar";
import TodoItem from "./component/TodoItem";
import { useAppContext } from "./context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  console.log("App component rendered");

  const {
    todos,
    setTodos,
    searchText,
    selectedCateId,
    selectedFilterId,
    categories,
  } = useAppContext();
  const [clickedTodoId, setClickedTodoId] = useState(undefined);
  const [clickAddNewTodo, setClickAddNewTodo] = useState(false);

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

  const addNewTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
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

  const selectedCate = useMemo(
    () => categories.find((cate) => cate.id === selectedCateId),
    [selectedCateId]
  );

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
            if (clickAddNewTodo) setClickAddNewTodo(false);
          }
        }}
        active={clickedTodoId === todo.id}
        deleteTodo={selectedFilterId === "deleted" ? deleteTodo : undefined}
        restoreTodo={selectedFilterId === "deleted" ? restoreTodo : undefined}
      />
    );
  });

  const cancelSideBar = () => {
    if (clickedTodoId) setClickedTodoId(undefined);
    if (clickAddNewTodo) setClickAddNewTodo(false);
  };

  return (
    <div className="container" onClick={cancelSideBar}>
      <FilterPanel />
      <div className="main-container">
        <p
          style={{
            fontSize: 24,
            fontWeight: 500,
            fontFamily: ["Roboto", "sans-serif"],
            marginBottom: 24,
          }}
        >
          {selectedCate.label}
        </p>
        <button
          className="todo-item todo-item-text"
          style={{
            alignItems: "center",
            backgroundColor: clickAddNewTodo
              ? "#dddddd"
              : "rgba(146, 199, 207, 0.65)",
            width: "fit-content",
            marginBottom: 22,
            borderStyle: "dashed",
            borderWidth: 1,
            borderColor: "#535353",
            borderRadius: 12,
            color: "#535353",
            boxShadow: clickAddNewTodo ? undefined : "none",
          }}
          onClick={(e) => {
            if (!clickAddNewTodo) {
              e.stopPropagation();
              setClickAddNewTodo(true);
              if (clickedTodoId) setClickedTodoId(undefined);
            }
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <p>Thêm việc cần làm</p>
        </button>
        {filteredTodoItems}
        {(clickedTodoId || clickAddNewTodo) && (
          <Sidebar
            key={clickedTodoId ?? "add-new"}
            todo={clickedTodo ?? undefined}
            onCancel={cancelSideBar}
            onSave={
              clickedTodoId && !clickedTodo.isDeleted
                ? (newTodo) => {
                    updateTodo(newTodo);
                    setClickedTodoId(undefined);
                  }
                : undefined
            }
            onClick={(e) => e.stopPropagation()}
            onDelete={
              clickedTodoId
                ? !clickedTodo.isDeleted
                  ? () => {
                      updateTodo({ ...clickedTodo, isDeleted: true });
                      setClickedTodoId(undefined);
                    }
                  : () => {
                      deleteTodo(clickedTodo.id);
                      setClickedTodoId(undefined);
                    }
                : undefined
            }
            onRestore={
              clickedTodoId && clickedTodo.isDeleted
                ? () => {
                    restoreTodo(clickedTodo.id);
                    setClickedTodoId(undefined);
                  }
                : undefined
            }
            onAddNew={(newTodo) => {
              addNewTodo(newTodo);
              setClickAddNewTodo(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
