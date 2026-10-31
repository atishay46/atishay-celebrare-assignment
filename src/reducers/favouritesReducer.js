export const SET_FAVOURITES = 'SET_FAVOURITES';

export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE: {
      
      const photoId = action.payload;

      //here a check is made whether the state includes the photoId
      const isFavourited = state.includes(photoId);

      const newFavourites = isFavourited
        ? state.filter((id) => id !== photoId) // remove
        : [...state, photoId]; // add

      
      localStorage.setItem('favourites', JSON.stringify(newFavourites));

      // Return the state and re-render
      return newFavourites;
    }

    case SET_FAVOURITES: {
      return action.payload;
    }

    default:
      return state;
  }
}
