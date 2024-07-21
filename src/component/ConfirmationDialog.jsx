import PropTypes from "prop-types";
import "./ConfirmationDialog.css";
import { useEffect } from "react";

const ConfirmationDialog = (props) => {
  useEffect(() => {
    if (props.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => (document.body.style.overflow = "");
  }, [props.open]);

  return (
    <div
      className="cd-backdrop"
      style={{ display: props.open ? "flex" : "none" }}
      onClick={(e) => {
        e.stopPropagation();
        props.setOpen(false);
      }}
    >
      <dialog
        open={props.open}
        className="cd-container"
        style={{ backgroundColor: props.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cd-body">
          <div className="cd-main">
            <img src={props.iconPath} alt="cảnh báo" width={64} height={64} />
            <div className="cd-text">
              <p className="cd-title">{props.title}</p>
              <p className="cd-message">{props.message()}</p>
            </div>
          </div>
          <div className="cd-footer">
            <button
              className="cd-secondary-btn"
              onClick={() => props.setOpen(false)}
            >
              {props.cancelBtnLabel ?? "Huỷ"}
            </button>
            <button
              className="cd-primary-btn"
              style={{ backgroundColor: props.color }}
              onClick={props.action}
            >
              {props.confirmBtnLabel ?? "Đồng ý"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

ConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.func,
  iconPath: PropTypes.string,
  confirmBtnLabel: PropTypes.string,
  cancelBtnLabel: PropTypes.string,
  color: PropTypes.string,
  setOpen: PropTypes.func,
  action: PropTypes.func,
};

export default ConfirmationDialog;
