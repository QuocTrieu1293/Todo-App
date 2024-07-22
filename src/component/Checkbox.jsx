import "./Checkbox.css";
import PropTypes from "prop-types";

const Checkbox = (props) => {
  // const [checked, setChecked] = useState(props.checked);

  return (
    <span className="cb-container" style={props.style}>
      <input
        type="checkbox"
        name={props.name}
        checked={props.checked}
        id={props.id}
        onChange={props.onChange}
        style={{ display: "none" }}
        disabled={props.disabled}
      />
      <span
        className={props.checked ? "cb-circle-checked" : "cb-circle"}
        onClick={
          !props.disabled
            ? (e) => {
                e.stopPropagation();
                props.onChange();
              }
            : undefined
        }
        disabled={props.disabled}
      >
        {props.checked && <span className="cb-tick" />}
      </span>
    </span>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Checkbox;