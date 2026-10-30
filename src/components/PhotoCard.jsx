// =========================================================================
// PhotoCard.jsx — SINGLE PHOTO CARD COMPONENT (Part of Requirement #3 & #5)
// =========================================================================
// Each card shows:
//   1. The photo image
//   2. The author name
//   3. A heart icon button to toggle favourite
//
// Props:
//   - photo     : the photo object from the API (has id, author, download_url, etc.)
//   - isFavourite: boolean — whether this photo is currently favourited
//   - onToggle  : function — called when the heart button is clicked
// =========================================================================

function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <div className="bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-700/50 
                    shadow-lg hover:shadow-violet-500/10 hover:border-violet-500/30 
                    transition-all duration-300 group">
      {/* --- Photo Image --- */}
      {/* 
        We use the Picsum download_url but resize it to 400px width for performance.
        The original images can be very large (5000px+), so we construct a smaller URL.
        Picsum URLs follow the pattern: https://picsum.photos/id/{id}/{width}/{height}
      */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={`https://picsum.photos/id/${photo.id}/400/300`}
          alt={`Photo by ${photo.author}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy" // lazy loading = browser only loads images when they're near the viewport
        />
      </div>

      {/* --- Card Footer: Author Name + Heart Button --- */}
      <div className="p-4 flex items-center justify-between">
        {/* Author name */}
        <p className="text-sm font-medium text-gray-300 truncate mr-2">
          {photo.author}
        </p>

        {/* 
          Heart button — toggles favourite state.
          We call onToggle(photo.id) so the parent knows WHICH photo was toggled.
          The heart is filled (red) if isFavourite is true, outlined (gray) if not.
        */}
        <button
          id={`fav-btn-${photo.id}`}
          onClick={() => onToggle(photo.id)}
          className="p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-violet-500"
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFavourite ? (
            // Filled heart — photo IS a favourite
            <svg className="w-6 h-6 text-red-500 transition-transform duration-200 hover:scale-110" 
                 fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                       2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 
                       14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                       6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            // Outlined heart — photo is NOT a favourite
            <svg className="w-6 h-6 text-gray-400 hover:text-red-400 transition-colors duration-200" 
                 fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 
                       5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 
                       5.5 0 0 0 0-7.78z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;
