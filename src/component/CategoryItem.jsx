import PropTypes from "prop-types";
import "./CategoryItem.css";

const CategoryItem = ({ label, cateCount, selected, onClick }) => {
  return (
    <div
      className={
        selected
          ? "category-item-container selected"
          : "category-item-container-unselected"
      }
      onClick={onClick}
    >
      <img
        src={selected ? "./active-folder-icon.png" : "./folder-icon.png"}
        width={18}
        height={15}
      />
      <p className="category-item-label">{label}</p>
      <p
        className="category-item-count"
        style={selected ? { color: "#FFFFFF" } : {}}
      >
        {cateCount ?? 0}
      </p>
    </div>
  );
};

CategoryItem.propTypes = {
  selected: PropTypes.bool,
  label: PropTypes.string,
  cateCount: PropTypes.number,
  onClick: PropTypes.func,
};

export default CategoryItem;
