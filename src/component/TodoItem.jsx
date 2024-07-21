import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "./Checkbox";
import PropTypes from "prop-types";
import { faRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmationDialog from "./ConfirmationDialog";
import { useState } from "react";

const TodoItem = (props) => {
  const { todo } = props;
  const [deleteDialogShow, setDeleteDialogShow] = useState(false);

  return (
    <>
      <div
        className="todo-item"
        style={props.active ? { backgroundColor: "#dddddd" } : {}}
        onClick={props.handleTodoClick}
      >
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => props.handleCompletedChange(todo.id)}
          style={{ paddingTop: 3 }}
          disabled={todo.isDeleted}
        />
        <div className="todo-item-text">
          <p
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
              fontSize: 16,
            }}
          >
            {todo.value}
          </p>
          <p
            style={{
              fontSize: 13,
              fontStyle: "italic",
              marginTop: 4,
              fontWeight: 300,
              color: "#909090",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {todo.description}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "flex-end",
          }}
        >
          <p style={{ opacity: todo.isImportant ? 1 : 0 }}>⭐</p>
          {todo.isDeleted && (
            <div style={{ display: "flex", gap: 2 }}>
              <div
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteDialogShow(true);
                }}
              >
                <FontAwesomeIcon icon={faTrash} color="#d11a2a" />
              </div>
              <div
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  props.restoreTodo(todo.id);
                }}
              >
                <FontAwesomeIcon icon={faRotateLeft} color="#0b7fab" />
              </div>
            </div>
          )}
        </div>
      </div>
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
        action={() => props.deleteTodo(todo.id)}
      />
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object,
  active: PropTypes.bool,
  handleTodoClick: PropTypes.func,
  handleCompletedChange: PropTypes.func,
  deleteTodo: PropTypes.func,
  restoreTodo: PropTypes.func,
};

export default TodoItem;
