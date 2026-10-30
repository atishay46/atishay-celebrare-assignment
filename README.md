# Photo Gallery Web App — Atishay Celebrare Assignment

A photo gallery web app built with **React + Vite + Tailwind CSS** that fetches photos from the Picsum API, displays them in a responsive grid, supports real-time search filtering by author name, and allows marking photos as favourites with persistence.

## Features

1. **Photo Fetching** — Loads 30 photos from the [Picsum Photos API](https://picsum.photos/v2/list?limit=30) with loading spinner and error handling
2. **Responsive Grid** — 4 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
3. **Search Filter** — Real-time client-side filtering by author name using `useCallback` + `useMemo`
4. **Favourites** — Heart toggle managed with `useReducer`, persisted to `localStorage`
5. **Custom Hook** — `useFetchPhotos` extracts all fetch logic (returns `{ photos, loading, error }`)
6. **Performance Hooks** — `useCallback` on search handler, `useMemo` on filtered results

## Tech Stack

- React (functional components + hooks only)
- Vite (build tool)
- Tailwind CSS v4 (styling — no MUI, Bootstrap, or Ant Design)

## Project Structure

```
src/
├── components/
│   ├── Gallery.jsx        # Main gallery — search, grid, favourites logic
│   ├── PhotoCard.jsx      # Individual photo card with heart button
│   ├── SearchBar.jsx      # Controlled search input
│   ├── Spinner.jsx        # Loading spinner
│   └── ErrorMessage.jsx   # Error display
├── hooks/
│   └── useFetchPhotos.js  # Custom hook for API fetching
├── reducers/
│   └── favouritesReducer.js  # useReducer logic for favourites
├── App.jsx                # Root component
├── main.jsx               # Entry point
└── index.css              # Tailwind import
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## How It Works

- **`useFetchPhotos`** — Custom hook that calls the Picsum API on mount and returns `{ photos, loading, error }`
- **`favouritesReducer`** — Handles `TOGGLE_FAVOURITE` (add/remove from list + save to localStorage) and `SET_FAVOURITES` (load from localStorage on mount)
- **`useCallback`** — Memoizes the search change handler so `SearchBar` doesn't re-render unnecessarily
- **`useMemo`** — Caches the filtered photo array; only recomputes when `photos` or `searchQuery` changes

## Author

Atishay
