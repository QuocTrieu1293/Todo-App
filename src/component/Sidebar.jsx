import { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import { useAppContext } from "../context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmationDialog from "./ConfirmationDialog";

const Sidebar = (props) => {
  console.log("Sidebar component rendered");

  const { todo } = props;
  const [todoValue, setTodoValue] = useState(todo.value);
  const [isImportant, setImportant] = useState(todo.isImportant);
  const [isCompleted, setCompleted] = useState(todo.isCompleted);
  const [cateId, setCateId] = useState(todo.cateId);
  const [description, setDescription] = useState(todo.description);
  const { categories } = useAppContext();
  const [deleteDialogShow, setDeleteDialogShow] = useState(false);

  return (
    <>
      <div className="sidebar" onClick={props.onClick}>
        <form
          className="sb-body"
          onSubmit={(e) => {
            e.preventDefault();
            if (!todo.isDeleted)
              props.onSave({
                ...todo,
                value: todoValue,
                isCompleted,
                isImportant,
                cateId,
                description,
              });
            else setDeleteDialogShow(true);
          }}
        >
          <p
            style={{
              fontSize: 20,
              color: "#454545",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Công việc
          </p>
          <div style={{ position: "relative" }}>
            <input
              className="sb-item"
              style={{ fontWeight: 500, fontSize: 16 }}
              type="text"
              id="value"
              name="value"
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
              spellCheck="false"
              disabled={todo.isDeleted}
            />
            {todo.isDeleted ? (
              <span className="sb-icon-btn" onClick={props.onRestore}>
                <FontAwesomeIcon
                  icon={faRotateLeft}
                  color="#0b7fab"
                  size="lg"
                />
              </span>
            ) : (
              <span className="sb-icon-btn" onClick={props.onDelete}>
                <FontAwesomeIcon icon={faTrash} color="#d11a2a" size="lg" />
              </span>
            )}
          </div>
          <div className="sb-item">
            <label htmlFor="is-important">Quan trọng</label>
            <input
              type="checkbox"
              id="is-important"
              name="isImportant"
              checked={isImportant}
              onChange={() => setImportant(!isImportant)}
              disabled={todo.isDeleted}
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
              disabled={todo.isDeleted}
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
              disabled={todo.isDeleted}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 30,
            }}
          >
            <label
              htmlFor="description"
              style={{
                fontSize: 16,
                color: "#454545",
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              className="sb-item"
              rows={8}
              placeholder="Ghi chú cho công việc ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={todo.isDeleted}
            />
          </div>
          <div className="sb-footer">
            <button
              className="sb-button"
              style={{ backgroundColor: "#FFFFFF", color: "#479EF5" }}
              onClick={props.onCancel}
            >
              Huỷ
            </button>
            <input
              className="sb-button"
              style={{
                backgroundColor: todo.isDeleted ? "#F44336" : "#0F6CBD",
                color: "#FFFFFF",
              }}
              type="submit"
              value={todo.isDeleted ? "Xoá" : "Lưu"}
            />
          </div>
        </form>
      </div>
      {todo.isDeleted && (
        <ConfirmationDialog
          open={deleteDialogShow}
          setOpen={setDeleteDialogShow}
          title="Cảnh báo xoá công việc"
          message={() => (
            <>
              Bạn có chắc muốn xoá công việc{" "}
              <span style={{ fontStyle: "italic", fontWeight: 600 }}>
                {todo.value}
              </span>
              ?
            </>
          )}
          iconPath="./alert_icon.png"
          color="#F44336"
          action={props.onDelete}
        />
      )}
    </>
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
  onDelete: PropTypes.func,
  onRestore: PropTypes.func,
};

export default Sidebar;