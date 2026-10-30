// =========================================================================
// Gallery.jsx — MAIN GALLERY COMPONENT (Requirements #2-7 come together here)
// =========================================================================
// This is the core component that:
//   1. Uses our custom hook (useFetchPhotos) to get photo data
//   2. Uses useReducer to manage favourites state
//   3. Uses useCallback for the search handler (performance)
//   4. Uses useMemo to compute the filtered photo list (performance)
//   5. Renders the search bar, loading/error states, and photo grid
// =========================================================================

import { useReducer, useEffect, useState, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { favouritesReducer, TOGGLE_FAVOURITE, SET_FAVOURITES } from '../reducers/favouritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

function Gallery() {
  // -----------------------------------------------------------------------
  // REQUIREMENT #6: Use the custom hook to fetch photos
  // -----------------------------------------------------------------------
  // Instead of writing fetch logic here, we just call our custom hook.
  // It returns everything we need: the data, loading state, and error state.
  const { photos, loading, error } = useFetchPhotos();

  // -----------------------------------------------------------------------
  // REQUIREMENT #5: useReducer for favourites
  // -----------------------------------------------------------------------
  // useReducer takes a reducer function and an initial state.
  // It returns [currentState, dispatch].
  //   - favourites: an array of photo IDs that are favourited (e.g., ["0", "3", "15"])
  //   - dispatch: a function to send actions to the reducer
  // We start with an empty array; useEffect below loads saved data from localStorage.
  const [favourites, dispatch] = useReducer(favouritesReducer, []);

  // -----------------------------------------------------------------------
  // REQUIREMENT #4: Search state
  // -----------------------------------------------------------------------
  // searchQuery stores what the user has typed in the search bar.
  // We use useState here because it's just a simple string — no complex logic.
  const [searchQuery, setSearchQuery] = useState('');

  // -----------------------------------------------------------------------
  // Load saved favourites from localStorage on first render
  // -----------------------------------------------------------------------
  // This runs once when the Gallery mounts. It checks if there are any
  // previously saved favourites in localStorage and loads them into state.
  useEffect(() => {
    const saved = localStorage.getItem('favourites');
    if (saved) {
      // JSON.parse converts the string back into an array
      // We dispatch SET_FAVOURITES to load them into useReducer state
      dispatch({ type: SET_FAVOURITES, payload: JSON.parse(saved) });
    }
  }, []); // ← empty dependency array = run once on mount

  // -----------------------------------------------------------------------
  // REQUIREMENT #7: useCallback on the search filter handler
  // -----------------------------------------------------------------------
  // WHY useCallback?
  // → Every time Gallery re-renders (e.g., when a photo is favourited),
  //   React normally creates a BRAND NEW function for handleSearchChange.
  // → That new function reference causes SearchBar to re-render too,
  //   even though its behavior hasn't changed.
  // → useCallback MEMOIZES the function — it returns the SAME function
  //   reference across re-renders (unless the dependencies change).
  // → Since this function has NO dependencies (it only calls setSearchQuery),
  //   it's created once and reused forever.
  //
  // WHAT WOULD BREAK IF WE REMOVED IT?
  // → The app would still work, but SearchBar would re-render unnecessarily
  //   every time Gallery re-renders. For 30 photos, this is negligible.
  //   But in a real app with 1000s of items, unnecessary re-renders add up
  //   and cause lag. useCallback prevents that.
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []); // ← empty array: no dependencies, function never changes

  // -----------------------------------------------------------------------
  // REQUIREMENT #7: useMemo to compute the filtered photo list
  // -----------------------------------------------------------------------
  // WHY useMemo?
  // → Filtering 30 photos by author name means looping through the array
  //   and checking each name. This is fast, but it doesn't need to run
  //   on EVERY re-render — only when `photos` or `searchQuery` changes.
  // → useMemo caches the result. If neither `photos` nor `searchQuery`
  //   has changed since the last render, React skips the filter and
  //   returns the cached result.
  //
  // WHAT WOULD BREAK IF WE REMOVED IT?
  // → The app would still work, but the filter would re-run on EVERY
  //   re-render, even when only favourites changed (which doesn't affect
  //   the filter at all). That's wasted computation. useMemo avoids it.
  const filteredPhotos = useMemo(() => {
    // If search is empty, show all photos (no filtering needed)
    if (!searchQuery.trim()) return photos;

    // Filter photos whose author name includes the search query (case-insensitive)
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [photos, searchQuery]); // ← only re-compute when these change

  // -----------------------------------------------------------------------
  // Handle toggling a photo as favourite
  // -----------------------------------------------------------------------
  // When the heart button is clicked, we dispatch TOGGLE_FAVOURITE
  // with the photo's ID. The reducer handles adding/removing it.
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: TOGGLE_FAVOURITE, payload: photoId });
  }, []); // ← dispatch is stable (React guarantees it never changes)

  // -----------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------

  // If still loading, show the spinner
  if (loading) return <Spinner />;

  // If there was an error, show the error message
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {/* REQUIREMENT #4: Search bar at the top */}
      <SearchBar query={searchQuery} onSearchChange={handleSearchChange} />

      {/* Show a message if no photos match the search */}
      {filteredPhotos.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No photos found for &quot;{searchQuery}&quot;
        </p>
      )}

      {/* 
        REQUIREMENT #3: Responsive Grid
        - grid-cols-1: 1 column on mobile (default)
        - sm:grid-cols-2: 2 columns on tablet (640px+)
        - lg:grid-cols-4: 4 columns on desktop (1024px+)
        - gap-6: spacing between cards
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            // Check if this photo's ID is in the favourites array
            isFavourite={favourites.includes(photo.id)}
            onToggle={handleToggleFavourite}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
