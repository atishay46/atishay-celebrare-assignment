
function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      
      <svg
        className="animate-spin h-12 w-12 text-violet-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        
        <circle
          className="opacity-25"
          cx="12" cy="12" r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        
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
