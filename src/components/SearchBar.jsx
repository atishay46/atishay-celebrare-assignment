// =========================================================================
// SearchBar.jsx — SEARCH INPUT COMPONENT (Requirement #4)
// =========================================================================
// This is a simple, controlled input component.
// "Controlled" means React controls the input's value via state (the `query`
// prop), and every keystroke triggers `onSearchChange` to update that state.
//
// WHY is it a separate component?
// → Keeps the Gallery component cleaner — each component has one job.
// → SearchBar's job: render the input and tell the parent when it changes.
// =========================================================================

function SearchBar({ query, onSearchChange }) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* 
        The input is "controlled" — its value always equals the `query` prop.
        When the user types, onChange fires → calls onSearchChange → 
        parent updates state → React re-renders with new query → input shows new text.
      */}
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
