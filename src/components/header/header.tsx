import "./header.css";

function Header({ toggleSearch, isSearch }: any) {
  let classNamesSearch = "header-button button-search active";
  let ClassNamesRated = "header-button button-rated";

  if (!isSearch) {
    classNamesSearch = "header-button button-search";
    ClassNamesRated = "header-button button-rated active";
  }

  return (
    <div className="header">
      <button
        type="button"
        className={classNamesSearch}
        onClick={() => toggleSearch("search")}
      >
        Search
      </button>
      <button
        className={ClassNamesRated}
        type="button"
        onClick={() => toggleSearch("rated")}
      >
        Rated
      </button>
    </div>
  );
}

export default Header;
