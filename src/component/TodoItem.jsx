import React, { isValidElement } from "react";
import Checkbox from "./Checkbox";
const TodoItem = (props) => {
  return (
    <div
      className="todo-item"
      style={props.active ? { backgroundColor: "#dddddd" } : {}}
      onClick={() => {
        props.handleTodoClick(props.id);
      }}
    >
      <Checkbox
        checked={props.isCompleted}
        onChange={() => props.handleCompletedChange(props.id)}
      />
      <p
        className="todo-item-text"
        style={{ textDecoration: props.isCompleted ? "line-through" : "none" }}
      >
        {props.value}
      </p>
      {props.isImportant && <span>⭐</span>}
    </div>
  );
};

export default TodoItem;
