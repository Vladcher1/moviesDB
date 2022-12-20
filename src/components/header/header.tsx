import "./header.css";

function Header({ toggleSearch }: any) {
  return (
    <div className="header">
      <button
        type="button"
        className="header-button button-search"
        onClick={() => toggleSearch("search")}
      >
        Search
      </button>
      <button
        className="header-button button-rated"
        type="button"
        onClick={() => toggleSearch("rated")}
      >
        Rated
      </button>
    </div>
  );
}

export default Header;
