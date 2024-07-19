import { useAppContext } from "../context/AppProvider";

const TodoSearch = () => {
  console.log("TodoSearch component rendered");

  const { searchText, setSearchText } = useAppContext();

  return (
    <div className="search-container">
      <span>🔍</span>
      <input
        className="search"
        type="text"
        placeholder="Tìm kiếm ..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        spellCheck="false"
      />
      {searchText && (
        <span className="search-clear" onClick={() => setSearchText("")}>
          ❌
        </span>
      )}
    </div>
  );
};

export default TodoSearch;
