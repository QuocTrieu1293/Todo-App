import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = (props) => {
  const { todo } = props;
  const [todoValue, setTodoValue] = useState(todo.value);
  const [isImportant, setImportant] = useState(todo.isImportant);
  const [isCompleted, setCompleted] = useState(todo.isCompleted);

  return (
    <div className="sidebar">
      <form className="sb-body">
        <p
          style={{
            fontFamily: "Cabin",
            fontSize: 20,
            color: "#454545",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          Công việc
        </p>
        <input
          className="sb-item"
          style={{ fontWeight: 500, fontSize: 16 }}
          type="text"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          spellCheck="false"
        />
        <div className="sb-item">
          <label htmlFor="is-important">Quan trọng</label>
          <input
            type="checkbox"
            id="is-important"
            name="isImportant"
            checked={isImportant}
            onChange={() => setImportant(!isImportant)}
          />
        </div>
        <div className="sb-item">
          <label htmlFor="is-completed">Đã hoàn thành</label>
          <input
            type="checkbox"
            id="is-completed"
            name="isCompleted"
            checked={isCompleted}
            onChange={() => setCompleted(!isCompleted)}
          />
        </div>
      </form>
      <div className="sb-footer">
        <button
          className="sb-button"
          style={{ backgroundColor: "#FFFFFF", color: "#479EF5" }}
          onClick={props.onCancel}
        >
          Huỷ
        </button>
        <button
          className="sb-button"
          style={{ backgroundColor: "#0F6CBD", color: "#FFFFFF" }}
          onClick={() =>
            props.onSave({
              ...todo,
              value: todoValue,
              isCompleted,
              isImportant,
            })
          }
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
