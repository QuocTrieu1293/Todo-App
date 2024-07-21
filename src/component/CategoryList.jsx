import { useMemo } from "react";
import CategoryItem from "./CategoryItem";
import { useAppContext } from "../context/AppProvider";

const CategoryList = () => {
  console.log("CategoryList component rendered");

  const { todos, selectedCateId, setSelectedCateId, categories } =
    useAppContext();

  // expensive function => useMemo
  const cateCount = useMemo(() => {
    return todos.reduce(
      (acc, todo) => ({
        ...acc,
        [todo.cateId]: (acc[todo.cateId] ?? 0) + (todo.isDeleted ? 0 : 1),
        all: acc.all + (todo.isDeleted ? 0 : 1),
      }),
      { all: 0 }
    );
  }, [todos]);

  return (
    <div className="category-container">
      <p>Danh mục</p>
      {categories.map((cate) => (
        <CategoryItem
          key={cate.id}
          label={cate.label}
          cateCount={cateCount[cate.id]}
          selected={selectedCateId === cate.id}
          onClick={() => setSelectedCateId(cate.id)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
