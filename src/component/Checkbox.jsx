import React, { useState } from "react";
import "./Checkbox.css";

const Checkbox = (props) => {
  // const [checked, setChecked] = useState(props.checked);

  return (
    <div className="cb-container">
      <input
        type="checkbox"
        name={props.name}
        checked={props.checked}
        id={props.id}
        onChange={() => {}}
        style={{ display: "none" }}
      />
      <div
        className={props.checked ? "cb-circle-checked" : "cb-circle"}
        onClick={props.onChange}
      >
        {props.checked && <span className="cb-tick" />}
      </div>
    </div>
  );
};

export default Checkbox;
