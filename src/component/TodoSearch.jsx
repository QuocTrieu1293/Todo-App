import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../context/AppProvider";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";

const TodoSearch = () => {
  console.log("TodoSearch component rendered");

  const { searchText, setSearchText } = useAppContext();

  return (
    <div className="search-container">
      <FontAwesomeIcon icon={faMagnifyingGlass} color="#7A7A7A" size="lg" />
      <input
        className="search"
        type="text"
        placeholder="Tìm kiếm ..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        spellCheck="false"
      />
      {searchText && (
        <FontAwesomeIcon
          icon={faX}
          color="#7A7A7A"
          size="xs"
          className="search-clear"
          onClick={() => setSearchText("")}
        />
      )}
    </div>
  );
};

export default TodoSearch;
