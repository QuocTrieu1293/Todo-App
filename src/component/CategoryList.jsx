import { useMemo, useState } from "react";
import CategoryItem from "./CategoryItem";
import { useAppContext } from "../context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import CategoryNameInput from "./CategoryNameInput";

const CategoryList = () => {
  // console.log("CategoryList component rendered");

  const {
    todos,
    selectedCateId,
    setSelectedCateId,
    categories,
    setCategories,
  } = useAppContext();
  const [showInputNewCate, setShowInputNewCate] = useState(false);
  const [newCateLabel, setNewCateLabel] = useState("");

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

  const newCateHandler = () => {
    const newCates = [
      ...categories,
      { id: crypto.randomUUID(), label: newCateLabel },
    ];
    setCategories(newCates);
    setNewCateLabel("");
    setShowInputNewCate(false);
  };

  const newCateCancelhandler = () => {
    setNewCateLabel("");
    setShowInputNewCate(false);
  };

  return (
    <div className="category-container">
      <div style={{ position: "relative" }}>
        <p>Danh mục</p>
        <FontAwesomeIcon
          icon={faFolderPlus}
          size="lg"
          style={{ marginRight: 6 }}
          className="icon-btn"
          title="Thêm danh mục mới"
          onClick={(e) => {
            e.stopPropagation();
            setShowInputNewCate(true);
          }}
        />

        {/* input for create a new category */}
        {showInputNewCate && (
          <>
            <div
              className="category-item-backdrop"
              onClick={(e) => {
                e.stopPropagation();
                newCateCancelhandler();
              }}
            ></div>
            <CategoryNameInput
              value={newCateLabel}
              setValue={setNewCateLabel}
              action={newCateHandler}
              cancel={newCateCancelhandler}
              required={true}
            />
          </>
        )}
      </div>
      {categories.map((cate) => (
        <CategoryItem
          key={cate.id}
          id={cate.id}
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
