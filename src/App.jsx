// =========================================================================
// App.jsx — ROOT APPLICATION COMPONENT
// =========================================================================
// This is the top-level component rendered by main.jsx.
// It provides the layout wrapper (header + main content area)
// and renders the Gallery component which handles all the logic.
//
// STRUCTURE:
//   App
//    ├── Header (title)
//    └── Gallery
//         ├── SearchBar
//         ├── Spinner (while loading)
//         ├── ErrorMessage (if fetch fails)
//         └── PhotoCard (for each photo)
// =========================================================================

import Gallery from './components/Gallery';

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* --- Header --- */}
      <header className="py-8 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          Photo Gallery
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Browse, search, and favourite photos from Picsum
        </p>
      </header>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <Gallery />
      </main>
    </div>
  );
}

export default App;
