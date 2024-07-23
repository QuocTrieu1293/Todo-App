import PropTypes from "prop-types";
import "./CategoryItem.css";
import {
  faEllipsis,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import CategoryNameInput from "./CategoryNameInput";
import { useAppContext } from "../context/AppProvider";
import ConfirmationDialog from "./ConfirmationDialog";

const CategoryItem = ({ id, label, cateCount, selected, onClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [cateLabel, setCateLabel] = useState(label);
  const [deleteDialogShow, setDeleteDialogShow] = useState(false);
  const { categories, setCategories, todos, setTodos } = useAppContext();

  const menu = [
    {
      label: "Đổi tên",
      icon: faPenToSquare,
      color: "#0F6CBD",
      action: (e) => {
        e.stopPropagation();
        setShowRename(true);
        setShowMenu(false);
      },
    },
    {
      label: "Xoá",
      icon: faTrashCan,
      color: "#F44336",
      action: (e) => {
        e.stopPropagation();
        if (cateCount > 0) {
          setDeleteDialogShow(true);
        } else {
          deleteCateHandler();
        }
        setShowMenu(false);
      },
    },
  ];

  useEffect(() => {
    if (showMenu || showRename || deleteDialogShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.overflow = "");
  }, [showMenu, showRename, deleteDialogShow]);

  const renameCateHandler = () => {
    if (cateLabel.trim()) {
      const newCates = categories.map((cate) => {
        if (cate.id === id) cate.label = cateLabel.trim();
        return cate;
      });
      setCategories(newCates);
    } else {
      setCateLabel(label);
    }
    setShowRename(false);
  };

  const renameCateCancelHandler = () => {
    setCateLabel(label);
    setShowRename(false);
  };

  const todosNameStr = useMemo(
    () =>
      todos
        .filter((todo) => todo.cateId === id)
        .map((todo) => todo.value)
        .join(", "),
    [todos]
  );

  const deleteCateHandler = () => {
    const newCates = categories.filter((cate) => cate.id !== id);
    setCategories(newCates);
  };

  const deleteTodosOfCateHandler = () => {
    const newTodos = todos.filter((todo) => todo.cateId !== id);
    setTodos(newTodos);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        className="category-item-container"
        onClick={onClick}
        custom-selected={selected.toString()} // thuộc tính custom cho html element
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p
            className="category-item-count"
            style={selected ? { color: "#FFFFFF" } : {}}
          >
            {cateCount ?? 0}
          </p>
          <img
            src={selected ? "./active-folder-icon.png" : "./folder-icon.png"}
            width={18}
            height={15}
          />
        </div>
        <p className="category-item-label">{cateLabel}</p>

        {/* Chỉ những category có id Khác "all" và "default" mới có thể thực hiện thao tác ... */}
        {!["all", "default"].includes(id) && (
          <FontAwesomeIcon
            icon={faEllipsis}
            size="lg"
            className="icon-btn category-item-icon-btn"
            style={{
              color: selected ? "white" : "#A3A3A3",
            }}
            onClick={(e) => {
              e.stopPropagation(); //Để không phải select cate id đó khi nhấn `...`
              setShowMenu(true);
            }}
          />
        )}
      </div>

      {/* cái ảo */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "transparent",
        }}
      >
        {/* menu for rename, delete and more */}
        {showMenu && (
          <>
            <div
              className="category-item-backdrop"
              onClick={(e) => {
                e.stopPropagation(); //Để không ảnh hưởng đến hiển thị các component khác như sidebar
                setShowMenu(false);
              }}
            ></div>
            <div
              className="category-item-menu"
              onClick={(e) => e.stopPropagation()}
            >
              {menu.map((item, idx) => (
                <div
                  key={idx}
                  style={{ color: item.color }}
                  onClick={item.action}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* input for rename category */}
        {showRename && (
          <>
            <div
              className="category-item-backdrop"
              onClick={(e) => {
                e.stopPropagation();
                renameCateCancelHandler();
              }}
            ></div>
            <CategoryNameInput
              value={cateLabel}
              setValue={setCateLabel}
              action={renameCateHandler}
              cancel={renameCateCancelHandler}
            />
          </>
        )}
      </div>

      {/* Dialog cảnh báo xoá công việc trong cate */}
      <ConfirmationDialog
        open={deleteDialogShow}
        setOpen={setDeleteDialogShow}
        title="Cảnh báo xoá công việc"
        message={() => (
          <>
            Bạn có chắc muốn xoá {cateCount} công việc:{" "}
            <span style={{ fontStyle: "italic", fontWeight: 600 }}>
              {todosNameStr}
            </span>
            ?
          </>
        )}
        iconPath="./alert_icon.png"
        color="#F44336"
        action={() => {
          deleteTodosOfCateHandler();
          deleteCateHandler();
        }}
      />
    </div>
  );
};

CategoryItem.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.bool,
  cateCount: PropTypes.number,
  onClick: PropTypes.func,
};

export default CategoryItem;
