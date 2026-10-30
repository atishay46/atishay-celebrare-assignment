// =========================================================================
// favouritesReducer.js — useReducer LOGIC (Requirement #5)
// =========================================================================
// WHY useReducer instead of useState?
// → useState is great for simple state (a string, a number, a boolean).
// → But when state updates follow specific RULES or PATTERNS (like toggling
//   an item in a list), useReducer gives us a clear, predictable structure:
//     1. We define ACTION TYPES (what can happen)
//     2. The REDUCER function decides how state changes for each action
//     3. We DISPATCH actions from the UI — the reducer handles the rest.
// → This is easier to debug: you can log every action and see exactly
//   what caused each state change.
// → In a team codebase, it's also easier for other devs to understand
//   because all the state logic is in ONE place (this file).
//
// WHAT actions does this reducer handle?
// → TOGGLE_FAVOURITE: Adds a photo ID to favourites if it's not there,
//   or removes it if it is. Also saves to localStorage immediately.
// → SET_FAVOURITES: Used on initial load to hydrate state from localStorage.
// =========================================================================

// --- ACTION TYPES ---
// We define these as constants to avoid typos.
// If you mistype a string like 'TOGLE_FAVOURITE', JavaScript won't warn you.
// But if you mistype a constant like TOGLE_FAVOURITE, you get a ReferenceError.
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const SET_FAVOURITES = 'SET_FAVOURITES';

// --- THE REDUCER FUNCTION ---
// A reducer takes the CURRENT state and an ACTION, and returns the NEW state.
// It must be a PURE function — no side effects, no API calls inside it.
// (We do localStorage in a helper, which is a small practical exception.)
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE: {
      // action.payload is the photo ID (a string like "0", "1", etc.)
      const photoId = action.payload;

      // Check if this photo is already in the favourites array
      const isFavourited = state.includes(photoId);

      // If it's already a favourite, REMOVE it (filter it out).
      // If it's NOT a favourite, ADD it (spread existing + new).
      const newFavourites = isFavourited
        ? state.filter((id) => id !== photoId) // remove
        : [...state, photoId]; // add

      // Persist to localStorage so favourites survive page refreshes.
      // We JSON.stringify because localStorage can only store strings.
      localStorage.setItem('favourites', JSON.stringify(newFavourites));

      // Return the new state (useReducer will re-render the component)
      return newFavourites;
    }

    case SET_FAVOURITES: {
      // This action is dispatched ONCE on app load to restore saved favourites.
      // action.payload is the array of IDs parsed from localStorage.
      return action.payload;
    }

    default:
      // If an unknown action type is dispatched, return state unchanged.
      // This is a safety net.
      return state;
  }
}
