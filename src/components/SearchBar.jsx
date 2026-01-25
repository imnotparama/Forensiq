const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="🔍 Search suspect by name or alias..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{
        width: "90%",
        padding: "14px 18px",
        fontSize: "16px",
        borderRadius: "999px",
        border: "1px solid #cbd5f5",
        outline: "none",
        marginBottom: "25px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
      }}
    />
  );
};

export default SearchBar;
