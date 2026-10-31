# 📸 Photo Gallery Web App

A React-based Photo Gallery that fetches photos from the **Picsum Photos API**, displays them in a responsive grid, lets you **search by author name**, and **mark photos as favourites** (persisted in localStorage).

Built with **React + Vite + Tailwind CSS** — no other UI libraries.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✅ Requirements Checklist

| # | Requirement | Status | Where |
|---|-------------|--------|-------|
| 1 | React + Vite + Tailwind CSS (no MUI/Bootstrap/Ant) | ✅ | `vite.config.js`, `package.json`, `index.css` |
| 2 | Fetch 30 photos from Picsum API + loading spinner + error state | ✅ | `useFetchPhotos.js`, `Spinner.jsx`, `ErrorMessage.jsx` |
| 3 | Responsive grid (4 cols desktop, 2 tablet, 1 mobile) + photo + author + heart icon | ✅ | `Gallery.jsx`, `PhotoCard.jsx` |
| 4 | Search filter by author name (real-time, no API call, no page reload) | ✅ | `SearchBar.jsx`, `Gallery.jsx` |
| 5 | Favourites with `useReducer` + `localStorage` persistence | ✅ | `favouritesReducer.js`, `Gallery.jsx` |
| 6 | Custom hook `useFetchPhotos` returning `{ photos, loading, error }` | ✅ | `useFetchPhotos.js` |
| 7 | `useCallback` on search handler + `useMemo` on filtered list | ✅ | `Gallery.jsx` |

---

## 🏛️ Architecture & Project Structure

```
atishay-celebrare-assignment/
├── index.html              ← Entry HTML file (Vite injects the React app here)
├── vite.config.js          ← Vite configuration (React + Tailwind plugins)
├── package.json            ← Dependencies and scripts
└── src/
    ├── main.jsx            ← React entry point (renders <App /> into the DOM)
    ├── App.jsx             ← Root component (header + <Gallery />)
    ├── index.css           ← Tailwind CSS import
    ├── components/
    │   ├── Gallery.jsx     ← Main gallery logic (hooks, grid, search, favourites)
    │   ├── PhotoCard.jsx   ← Single photo card (image, author, heart button)
    │   ├── SearchBar.jsx   ← Search input component
    │   ├── Spinner.jsx     ← Loading spinner shown while fetching
    │   └── ErrorMessage.jsx← Error message shown if fetch fails
    ├── hooks/
    │   └── useFetchPhotos.js ← Custom hook for API data fetching
    └── reducers/
        └── favouritesReducer.js ← Reducer function for favourites state
```

---

## 🔄 Application Flow

Here's how the app works step-by-step when a user opens it:

### 1. App Loads → Fetch Photos

```
Browser loads index.html
    → main.jsx renders <App />
        → App renders <Gallery />
            → Gallery calls useFetchPhotos()
                → useEffect triggers fetch("https://picsum.photos/v2/list?limit=30")
                → While fetching → loading = true → <Spinner /> is shown
                → If fetch succeeds → photos = [30 items], loading = false → Grid renders
                → If fetch fails → error = "Failed to fetch...", loading = false → <ErrorMessage /> is shown
```

### 2. User Searches → Real-Time Filter

```
User types in <SearchBar />
    → onChange fires → handleSearchChange updates searchQuery state
        → useMemo detects searchQuery changed
            → Recomputes filteredPhotos by filtering the already-fetched photos
                → Grid re-renders with only matching photos
```

**Key point**: No new API call is made. The 30 photos fetched on load are filtered client-side.

### 3. User Favourites a Photo → useReducer + localStorage

```
User clicks heart icon on <PhotoCard />
    → onToggle(photo.id) is called
        → dispatch({ type: TOGGLE_FAVOURITE, payload: photo.id })
            → favouritesReducer runs:
                → If photo.id is in favourites → remove it (filter out)
                → If photo.id is NOT in favourites → add it (spread + new)
                → Save updated array to localStorage
            → Component re-renders → heart icon changes (outlined ↔ filled)
```

### 4. User Refreshes Page → Favourites Persist

```
Page reloads → Gallery mounts
    → useEffect reads localStorage.getItem('favourites')
        → dispatch({ type: SET_FAVOURITES, payload: savedArray })
            → Heart icons show as filled for previously favourited photos
```

---

## 📚 React Hooks Explained (with Basics & Project Examples)

### 1. `useState` — Simple State

#### What is it?
`useState` is the most basic React hook. It lets you store a value in a component that persists across re-renders.

#### Syntax
```jsx
const [value, setValue] = useState(initialValue);
//      ↑        ↑                    ↑
//  current   function to       starting value
//   state    update it
```

#### How it works
- When you call `setValue(newValue)`, React re-renders the component with the new value.
- The previous value is gone — replaced by the new one.

#### Basic example
```jsx
const [count, setCount] = useState(0);

// When button is clicked, count goes from 0 → 1 → 2 → ...
<button onClick={() => setCount(count + 1)}>
  Clicked {count} times
</button>
```

#### Where it's used in this project

**In `Gallery.jsx`** — to track the search query:
```jsx
const [searchQuery, setSearchQuery] = useState('');
```
We use `useState` here because `searchQuery` is a simple string — no complex logic needed.

**In `useFetchPhotos.js`** — to track photos, loading, and error:
```jsx
const [photos, setPhotos] = useState([]);    // array of photo objects
const [loading, setLoading] = useState(true); // boolean
const [error, setError] = useState(null);     // string or null
```

---

### 2. `useEffect` — Side Effects (Data Fetching, DOM updates)

#### What is it?
`useEffect` lets you run code *after* React renders the component. It's used for things that happen "outside" React — like fetching data from an API, setting up timers, or reading from localStorage.

#### Syntax
```jsx
useEffect(() => {
  // Code that runs AFTER the component renders
  
  return () => {
    // Optional cleanup function (runs before the effect re-runs or on unmount)
  };
}, [dependency1, dependency2]); // ← dependency array
```

#### The dependency array controls WHEN the effect runs:
| Dependency Array | When it runs |
|---|---|
| `[]` (empty) | Only once, when the component first appears (mounts) |
| `[searchQuery]` | Every time `searchQuery` changes |
| No array at all | After every single re-render (usually a mistake) |

#### Basic example
```jsx
// Fetch data once when the component loads
useEffect(() => {
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => setData(data));
}, []); // empty array = run once
```

#### Where it's used in this project

**In `useFetchPhotos.js`** — to fetch photos on mount:
```jsx
useEffect(() => {
  const fetchPhotos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      setError('Failed to fetch photos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  fetchPhotos();
}, []); // ← runs once on mount
```

**Why is the async function *inside* useEffect?**
Because `useEffect` itself cannot be `async` (React doesn't support it). So we define an async function inside and call it immediately.

**In `Gallery.jsx`** — to load saved favourites from localStorage:
```jsx
useEffect(() => {
  const saved = localStorage.getItem('favourites');
  if (saved) {
    dispatch({ type: SET_FAVOURITES, payload: JSON.parse(saved) });
  }
}, []);
```

---

### 3. `useReducer` — Complex State Management

#### What is it?
`useReducer` is an alternative to `useState` for managing state that involves complex logic. Instead of directly setting a value, you **dispatch actions** and a **reducer function** decides how state changes.

#### Syntax
```jsx
const [state, dispatch] = useReducer(reducerFunction, initialState);
```

#### Key concepts
- **State**: The current data (e.g., an array of favourite IDs)
- **Action**: An object describing what happened (e.g., `{ type: 'TOGGLE_FAVOURITE', payload: '5' }`)
- **Dispatch**: A function you call to send an action to the reducer
- **Reducer**: A pure function that takes `(currentState, action)` and returns `newState`

#### Why use it instead of useState?
| Use `useState` when... | Use `useReducer` when... |
|---|---|
| State is simple (string, number, boolean) | State has complex update rules |
| Updates are straightforward (`setX(newValue)`) | Multiple actions change state differently |
| Logic is trivial | You want all state logic in one place |

#### Basic example
```jsx
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    case 'RESET':     return 0;
    default:          return state;
  }
}

const [count, dispatch] = useReducer(counterReducer, 0);

<button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
<button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
<button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
```

#### Where it's used in this project

**In `favouritesReducer.js`** — the reducer function:
```jsx
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE: {
      const photoId = action.payload;
      const isFavourited = state.includes(photoId);
      const newFavourites = isFavourited
        ? state.filter((id) => id !== photoId) // remove
        : [...state, photoId];                 // add
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
      return newFavourites;
    }
    case SET_FAVOURITES: {
      return action.payload; // hydrate from localStorage on load
    }
    default:
      return state;
  }
}
```

**In `Gallery.jsx`** — using the reducer:
```jsx
const [favourites, dispatch] = useReducer(favouritesReducer, []);

// Toggle a favourite
dispatch({ type: TOGGLE_FAVOURITE, payload: photo.id });

// Load saved favourites
dispatch({ type: SET_FAVOURITES, payload: JSON.parse(saved) });
```

**Actions handled:**
| Action | What it does |
|---|---|
| `TOGGLE_FAVOURITE` | Adds the photo ID if not favourited, removes it if already favourited. Also saves to localStorage. |
| `SET_FAVOURITES` | Replaces the entire favourites array (used on initial load from localStorage). |

---

### 4. Custom Hook — `useFetchPhotos`

#### What is a custom hook?
A custom hook is a JavaScript function whose name starts with `use` and that calls other hooks internally. It lets you **extract and reuse stateful logic** across components.

#### Why use custom hooks?
- **Separation of concerns**: The Gallery component doesn't need to know *how* data is fetched — it just needs the data.
- **Reusability**: If another component needs photos, it can call `useFetchPhotos()` too.
- **Testability**: You can test the data logic independently from the UI.

#### The pattern
```jsx
// Custom hook (data logic)
function useCustomHook() {
  const [data, setData] = useState(null);
  // ... logic ...
  return { data };
}

// Component (UI only)
function MyComponent() {
  const { data } = useCustomHook(); // just use it!
  return <div>{data}</div>;
}
```

#### Where it's used in this project

**`useFetchPhotos.js`** returns three things:
```jsx
function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ... fetch logic (see useEffect section above) ...
  }, []);

  return { photos, loading, error };
}
```

**`Gallery.jsx`** consumes it:
```jsx
const { photos, loading, error } = useFetchPhotos();

if (loading) return <Spinner />;
if (error) return <ErrorMessage message={error} />;
// ... render photos ...
```

**What happens if the API fails?**
The `catch` block in the hook sets `error` to `"Failed to fetch photos. Please try again later."`. Gallery reads this and renders `<ErrorMessage />` instead of the photo grid.

---

### 5. `useCallback` — Memoize Functions

#### What is it?
`useCallback` caches a function so that React reuses the **same function reference** across re-renders instead of creating a new one every time.

#### Syntax
```jsx
const memoizedFn = useCallback(() => {
  // function body
}, [dependencies]);
```

#### Why does it matter?
In React, every re-render creates new functions. If you pass a function as a prop to a child component, the child sees a "new" function and re-renders, even if the function does the same thing. `useCallback` prevents this by keeping the same reference.

#### Basic example
```jsx
// WITHOUT useCallback — new function created every render
const handleClick = () => { console.log('clicked'); };

// WITH useCallback — same function reused across renders
const handleClick = useCallback(() => { console.log('clicked'); }, []);
```

#### Where it's used in this project

**Search handler** — so `<SearchBar />` doesn't re-render unnecessarily:
```jsx
const handleSearchChange = useCallback((e) => {
  setSearchQuery(e.target.value);
}, []); // empty deps = created once, reused forever
```

**Favourite toggle handler** — so `<PhotoCard />` components don't re-render when unrelated state changes:
```jsx
const handleToggleFavourite = useCallback((photoId) => {
  dispatch({ type: TOGGLE_FAVOURITE, payload: photoId });
}, []); // dispatch is stable (React guarantees it)
```

**What would break if removed?** The app would still work, but every time Gallery re-renders (e.g., when favourites change), new function references would be created and passed to child components, causing unnecessary re-renders. In a large app with thousands of items, this causes noticeable lag.

---

### 6. `useMemo` — Memoize Computed Values

#### What is it?
`useMemo` caches the **result** of a computation. It only re-runs the computation when its dependencies change.

#### Syntax
```jsx
const cachedResult = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]); // only re-compute when a or b changes
```

#### Difference from useCallback
| Hook | What it caches | Returns |
|---|---|---|
| `useCallback` | A **function** | The same function reference |
| `useMemo` | A **value** (the result of calling a function) | The computed result |

#### Basic example
```jsx
// WITHOUT useMemo — filters on every single render
const filtered = items.filter(item => item.name.includes(query));

// WITH useMemo — only filters when items or query changes
const filtered = useMemo(() => {
  return items.filter(item => item.name.includes(query));
}, [items, query]);
```

#### Where it's used in this project

**Computing the filtered photo list:**
```jsx
const filteredPhotos = useMemo(() => {
  if (!searchQuery.trim()) return photos;
  return photos.filter((photo) =>
    photo.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [photos, searchQuery]);
```

**What would break if removed?** The app would still work, but the filter function would re-run on **every** re-render — even when only `favourites` changed (which doesn't affect the filter at all). With `useMemo`, the filter only runs when `photos` or `searchQuery` actually changes.

---

## 🧩 Component Breakdown

### `App.jsx` — Root Component
- Renders the header (gradient title) and the `<Gallery />` component.
- Purely presentational — no state or logic.

### `Gallery.jsx` — Brain of the App
- Calls `useFetchPhotos()` to get photo data.
- Uses `useReducer` for favourites state.
- Uses `useState` for search query.
- Uses `useCallback` for event handlers.
- Uses `useMemo` for filtered photo list.
- Renders `<SearchBar />`, `<Spinner />`, `<ErrorMessage />`, and `<PhotoCard />` components.

### `PhotoCard.jsx` — Single Photo Card
- Receives `photo`, `isFavourite`, and `onToggle` as props.
- Displays the image, author name, and a heart icon button.
- Heart icon is filled (red) when favourited, outlined (gray) when not.

### `SearchBar.jsx` — Controlled Input
- Receives `query` and `onSearchChange` as props.
- A "controlled component" — React controls the input's value via state.

### `Spinner.jsx` — Loading State
- An SVG spinner with Tailwind's `animate-spin` class.
- Shown while the API fetch is in progress.

### `ErrorMessage.jsx` — Error State
- Shows a red error icon and the error message.
- Shown when the API fetch fails.

---

## 📝 Important Rules Followed

- ✅ **No component libraries** — Only Tailwind CSS for styling
- ✅ **No class components** — Functional components with hooks only
- ✅ **useReducer for favourites** — Not useState
- ✅ **No extra features** — Only the 7 required features implemented
- ✅ **All components are functional** — Using modern React patterns

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Picsum Photos API** | Free public photo API |
| **localStorage** | Browser storage for favourite persistence |
