import PropTypes from "prop-types";

const FilterItem = (props) => {
  return (
    <div
      className={`filter-item ${props.selected ? "selected" : ""}`}
      onClick={props.onClick}
    >
      <div className="filter-item-name">
        <span>
          <img src={props.iconPath} width={17} />
        </span>
        <p>{props.label}</p>
      </div>
      <p className="filter-item-count">{props.filterCount}</p>
    </div>
  );
};

FilterItem.propTypes = {
  label: PropTypes.string,
  iconPath: PropTypes.string,
  filterCount: PropTypes.number,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

export default FilterItem;
