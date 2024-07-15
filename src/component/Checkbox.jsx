import React, { useRef, useState } from "react";
import "./Checkbox.css";

const Checkbox = (props) => {
  // const [checked, setChecked] = useState(props.checked);

  return (
    <span className="cb-container">
      <input
        type="checkbox"
        name={props.name}
        checked={props.checked}
        id={props.id}
        onChange={props.onChange}
        style={{ display: "none" }}
      />
      <span
        className={props.checked ? "cb-circle-checked" : "cb-circle"}
        onClick={(e) => {
          e.stopPropagation();
          props.onChange();
        }}
      >
        {props.checked && <span className="cb-tick" />}
      </span>
    </span>
  );
};

export default Checkbox;
