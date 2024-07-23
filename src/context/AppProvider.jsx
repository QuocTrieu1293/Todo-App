import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext({});

const dummyTodos = [
  {
    id: crypto.randomUUID(),
    value: "Học ReactJS",
    isCompleted: true,
    isImportant: true,
    isDeleted: false,
    cateId: "2",
    description: "xem từ vid số 2 đên 5",
  },
  {
    id: crypto.randomUUID(),
    value: "Học tiếng Anh",
    isCompleted: false,
    isImportant: true,
    isDeleted: false,
    cateId: "3",
    description: "Làm đề reading và listening",
  },
  {
    id: crypto.randomUUID(),
    value: "Luyện Leetcode",
    isCompleted: false,
    isImportant: false,
    isDeleted: false,
    cateId: "2",
    description: "Làm daily leetcode và tham gia contest",
  },
  {
    id: crypto.randomUUID(),
    value: "Tập thể dục",
    isCompleted: true,
    isImportant: false,
    isDeleted: false,
    cateId: "default",
    description: "Tập ngực + vai",
  },
  {
    id: crypto.randomUUID(),
    value: "Học Laravel",
    isCompleted: false,
    isImportant: true,
    isDeleted: false,
    cateId: "1",
    description: "",
  },
];

const dummyCategories = [
  {
    id: "all",
    label: "Tất cả",
  },
  {
    id: "default",
    label: "Cá nhân",
  },
  {
    id: "1",
    label: "Công việc",
  },
  {
    id: "2",
    label: "Học tập",
  },
  {
    id: "3",
    label: "Đi du lịch",
  },
];

const AppProvider = ({ children }) => {
  const [todos, setTodos] = useState(dummyTodos);
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [categories, setCategories] = useState(dummyCategories);
  const [searchText, setSearchText] = useState("");
  const [selectedCateId, setSelectedCateId] = useState("all");

  useEffect(() => setSelectedFilterId("all"), [selectedCateId]);

  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
        selectedFilterId,
        setSelectedFilterId,
        categories,
        setCategories,
        searchText,
        setSearchText,
        selectedCateId,
        setSelectedCateId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element,
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
