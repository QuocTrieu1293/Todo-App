import Checkbox from "./Checkbox";
import PropTypes from "prop-types";

const TodoItem = (props) => {
  return (
    <div
      className="todo-item"
      style={props.active ? { backgroundColor: "#dddddd" } : {}}
      onClick={props.handleTodoClick}
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

TodoItem.propTypes = {
  active: PropTypes.bool,
  handleTodoClick: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.string,
  isCompleted: PropTypes.bool,
  isImportant: PropTypes.bool,
  handleCompletedChange: PropTypes.func,
};

export default TodoItem;
