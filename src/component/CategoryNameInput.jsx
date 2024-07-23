import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import "./CategoryNameInput.css";
import { useRef, useState } from "react";

const CategoryNameInput = (props) => {
  const buttons = [
    {
      icon: faCheck,
      primaryColor: "#00b16a",
      secondaryColor: "#e5f7f0",
      hoverColor: "#ccefe1",
      action: (e) => {
        e.preventDefault();
        props.action();
      },
      iconSize: "lg",
    },
    {
      icon: faX,
      primaryColor: "#d11a2a",
      secondaryColor: "#fae8e9",
      hoverColor: "#f5d1d4",
      action: () => {
        props.cancel();
      },
    },
  ];

  const [firstFocused, setFirstFocused] = useState(false);
  const submitRef = useRef(null);

  return (
    <div className="category-name-input" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={buttons[0].action}>
        <div className="category-name-input-layout">
          {/* FilterPanel.css */}
          <input
            type="text"
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
            required={props.required}
            autoComplete="off"
            spellCheck="false"
            onFocus={(e) => e.target.select()}
            onBlur={() => {
              if (!firstFocused) {
                setFirstFocused(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !firstFocused) setFirstFocused(true);
            }}
            autoFocus
            firstfocused={firstFocused.toString()}
          />
          <div
            style={{
              display: "flex",
              gap: 4,
              // alignItems: "center", bỏ cái này đi để các thẻ div con của nó tự động có height 100%
            }}
          >
            {buttons.map((item, idx) => (
              <div
                key={idx}
                className="category-name-input-button"
                style={{
                  backgroundColor: item.secondaryColor,
                  borderColor: item.primaryColor,
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = item.hoverColor)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = item.secondaryColor)
                }
                onClick={
                  idx === 0 ? () => submitRef.current?.click() : item.action
                }
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  color={item.primaryColor}
                  size={item.iconSize}
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
            ))}
          </div>
          <span className="category-name-input-error">
            *Tên danh mục không được để trống
          </span>
        </div>
        <input
          ref={submitRef}
          type="submit"
          value="submit"
          style={{ display: "none" }}
        />
      </form>
    </div>
  );
};

CategoryNameInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  required: PropTypes.bool,
  action: PropTypes.func,
  cancel: PropTypes.func,
};

export default CategoryNameInput;
