// =========================================================================
// useFetchPhotos.js — CUSTOM HOOK (Requirement #6)
// =========================================================================
// WHY a custom hook?
// → Custom hooks let us SEPARATE data-fetching logic from UI logic.
// → The Gallery component doesn't need to know HOW photos are fetched,
//   it just needs the data, loading state, and any error.
// → This makes the code reusable — if another component needs photos,
//   it can just call useFetchPhotos() too.
//
// WHAT does it return?
// → { photos, loading, error }
//   - photos : array of photo objects from the API (or empty array)
//   - loading: boolean — true while the fetch is in progress
//   - error  : string or null — contains the error message if fetch fails
//
// WHAT happens if the API fails?
// → The catch block sets the error state to a user-friendly message.
// → The Gallery component then reads `error` and shows an error message
//   instead of the photo grid.
// =========================================================================

import { useState, useEffect } from 'react';

// The API endpoint — fetches 30 random photos from Picsum
const API_URL = 'https://picsum.photos/v2/list?limit=30';

function useFetchPhotos() {
  // photos: stores the fetched array of photo objects
  const [photos, setPhotos] = useState([]);

  // loading: tracks whether the API call is still in progress
  const [loading, setLoading] = useState(true);

  // error: stores an error message string if the fetch fails, otherwise null
  const [error, setError] = useState(null);

  // useEffect runs ONCE when the component using this hook mounts.
  // The empty dependency array [] means "run this only on the first render".
  useEffect(() => {
    // We define an async function inside useEffect because
    // useEffect itself cannot be async (React doesn't allow it).
    const fetchPhotos = async () => {
      try {
        // Start the API call
        const response = await fetch(API_URL);

        // If the server responds with an error status (e.g., 404, 500),
        // response.ok will be false. We throw an error to jump to catch.
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON body from the response
        const data = await response.json();

        // Store the fetched photos in state
        setPhotos(data);
      } catch (err) {
        // If anything goes wrong (network error, bad JSON, etc.),
        // we store a user-friendly error message
        setError('Failed to fetch photos. Please try again later.');
        console.error('Fetch error:', err);
      } finally {
        // Whether the fetch succeeded or failed, we stop showing the spinner.
        // "finally" always runs after try or catch.
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []); // ← empty array = run once on mount

  // Return the three pieces of state so the component can use them
  return { photos, loading, error };
}

export default useFetchPhotos;
