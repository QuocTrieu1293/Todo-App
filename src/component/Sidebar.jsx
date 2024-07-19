import { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import { useAppContext } from "../context/AppProvider";

const Sidebar = (props) => {
  console.log("Sidebar component rendered");

  const { todo } = props;
  const [todoValue, setTodoValue] = useState(todo.value);
  const [isImportant, setImportant] = useState(todo.isImportant);
  const [isCompleted, setCompleted] = useState(todo.isCompleted);
  const [cateId, setCateId] = useState(todo.cateId);
  const { categories } = useAppContext();

  return (
    <div className="sidebar" onClick={props.onClick}>
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
        <div className="sb-item">
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            name="category"
            className="sb-category-select"
            value={cateId}
            onChange={(e) => setCateId(e.target.value)}
          >
            {categories.map(
              (cate) =>
                cate.id !== "all" && (
                  <option key={cate.id} value={cate.id}>
                    {cate.label}
                  </option>
                )
            )}
          </select>
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
              cateId,
            })
          }
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  // todo: PropTypes.shape({
  //   id: PropTypes.string,
  //   value: PropTypes.string,
  //   isCompleted: PropTypes.bool,
  //   isImportant: PropTypes.bool,
  //   isDeleted: PropTypes.bool,
  // }),
  todo: PropTypes.object,
  onClick: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};

export default Sidebar;
