
function SearchBar({ query, onSearchChange }) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
    
      <input
        id="search-input"
        type="text"
        placeholder="Search by author name..."
        value={query}
        onChange={onSearchChange}
        className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 
                   text-white placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                   transition-all duration-200"
      />
    </div>
  );
}

export default SearchBar;
