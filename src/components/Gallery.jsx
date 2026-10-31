

import { useReducer, useEffect, useState, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { favouritesReducer, TOGGLE_FAVOURITE, SET_FAVOURITES } from '../reducers/favouritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
// reducer
  const [favourites, dispatch] = useReducer(favouritesReducer, []);

 
  const [searchQuery, setSearchQuery] = useState('');

 
  useEffect(() => {
    const saved = localStorage.getItem('favourites');
    if (saved) {
      dispatch({ type: SET_FAVOURITES, payload: JSON.parse(saved) });
    }
  }, []);

  // this would memoize the function
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []); 

  // memoize this funcion so no multiple call will be made.
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photos;

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [photos, searchQuery]);
  
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: TOGGLE_FAVOURITE, payload: photoId });
  }, []);   


  if (loading) return <Spinner />;

    
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
    
      <SearchBar query={searchQuery} onSearchChange={handleSearchChange} />

      {filteredPhotos.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No photos found for &quot;{searchQuery}&quot;
        </p>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
           // check if the id is in fav
            isFavourite={favourites.includes(photo.id)}
            onToggle={handleToggleFavourite}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
