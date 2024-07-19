import { useMemo } from "react";
import FilterItem from "./FilterItem";
import { useAppContext } from "../context/AppProvider";

const FILTER_ITEMS = [
  {
    id: "all",
    label: "Tất cả",
    iconPath: "./inbox.png",
  },
  {
    id: "important",
    label: "Quan trọng",
    iconPath: "./flag.png",
  },
  {
    id: "completed",
    label: "Hoàn thành",
    iconPath: "./check.png",
  },
  {
    id: "deleted",
    label: "Xoá",
    iconPath: "./delete.png",
  },
];

const FilterList = () => {
  console.log("FilterList rendered");
  const { todos, selectedCateId, selectedFilterId, setSelectedFilterId } =
    useAppContext();

  // expensive function => useMemo
  const filterCount = useMemo(() => {
    console.log("filterCountFunc run");
    return todos
      .filter((todo) =>
        selectedCateId === "all" || selectedCateId === todo.cateId
          ? true
          : false
      )
      .reduce(
        (acc, todo) => {
          if (todo.isImportant) acc.important++;
          if (todo.isCompleted) acc.completed++;
          if (todo.isDeleted) acc.deleted++;
          acc.all++;
          return acc;
        },
        { all: 0, important: 0, completed: 0, deleted: 0 }
      );
  }, [todos, selectedCateId]);

  return (
    <div className="filter-container">
      {FILTER_ITEMS.map((item) => (
        <FilterItem
          key={item.id}
          label={item.label}
          iconPath={item.iconPath}
          filterCount={filterCount[item.id]}
          onClick={() => setSelectedFilterId(item.id)}
          selected={selectedFilterId === item.id}
        />
      ))}
    </div>
  );
};

export default FilterList;
