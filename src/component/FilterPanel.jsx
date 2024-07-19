import React from "react";
import "./FilterPanel.css";
import FilterList from "./FilterList";
import CategoryList from "./CategoryList";
import TodoSearch from "./TodoSearch";

const FilterPanel = React.memo(function FilterPanel() {
  console.log("Filtered component rendered");

  return (
    <div className="filter-panel">
      <TodoSearch />
      <FilterList />
      <CategoryList />
    </div>
  );
});

export default FilterPanel;
