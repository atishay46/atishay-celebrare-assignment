// =========================================================================
// Spinner.jsx — LOADING SPINNER COMPONENT (Part of Requirement #2)
// =========================================================================
// A simple animated spinner shown while the API call is in progress.
// Uses Tailwind's `animate-spin` utility for the rotation animation.
// =========================================================================

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* 
        The spinner is an SVG circle with a gap. 
        animate-spin rotates it continuously.
      */}
      <svg
        className="animate-spin h-12 w-12 text-violet-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        {/* Background circle — faint */}
        <circle
          className="opacity-25"
          cx="12" cy="12" r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        {/* Foreground arc — this is the visible spinning part */}
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <p className="mt-4 text-gray-400 text-sm">Loading photos...</p>
    </div>
  );
}

export default Spinner;
