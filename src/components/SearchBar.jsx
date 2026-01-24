const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search suspect..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "20px",
        fontSize: "16px"
      }}
    />
  );
};

export default SearchBar;
