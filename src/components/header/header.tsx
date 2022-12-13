import "./header.css";

function Header({ toggleSearch }) {
  return (
    <div className="header">
      <button
        className="header-button button-search"
        onClick={() => toggleSearch("search")}
      >
        Search
      </button>
      <button
        className="header-button button-rated"
        onClick={() => toggleSearch("rated")}
      >
        Rated
      </button>
    </div>
  );
}

export default Header;
