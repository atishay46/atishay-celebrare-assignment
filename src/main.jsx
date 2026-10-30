// =========================================================================
// main.jsx — APPLICATION ENTRY POINT
// =========================================================================
// This is the file that Vite loads first (referenced in index.html).
// It does two things:
//   1. Imports the global CSS (which includes Tailwind)
//   2. Renders the <App /> component into the DOM element with id="root"
//
// StrictMode is a React development tool that:
//   - Warns about unsafe lifecycle methods
//   - Warns about deprecated API usage
//   - Helps detect unexpected side effects (by double-invoking some functions)
//   - It does NOT affect the production build
// =========================================================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
