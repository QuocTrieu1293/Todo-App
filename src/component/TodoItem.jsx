import React from "react";
import Checkbox from "./Checkbox";
const TodoItem = (props) => {
  return (
    <div className="todo-item">
      <Checkbox
        checked={props.isCompleted}
        onChange={props.onCompletedChange}
      />
      <p
        className="todo-item-text"
        style={{ textDecoration: props.isCompleted ? "line-through" : "none" }}
      >
        {props.value}
      </p>
    </div>
  );
};

export default TodoItem;
