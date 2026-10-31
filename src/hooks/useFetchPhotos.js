
import { useState, useEffect } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

function useFetchPhotos() {

  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchPhotos = async () => {
      try {
        // Api Call
        const response = await fetch(API_URL);

       
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        
        const data = await response.json();

        
        setPhotos(data);
      } catch (err) {
        setError('Failed to fetch photos. Please try again later.');
        console.error('Fetch error:', err);
      } finally {

        setLoading(false);

      }
    };

    fetchPhotos();
  }, []); 

  return { photos, loading, error };
}

export default useFetchPhotos;
