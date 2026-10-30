// =========================================================================
// ErrorMessage.jsx — ERROR DISPLAY COMPONENT (Part of Requirement #2)
// =========================================================================
// Shown when the API fetch fails (network error, server down, etc.).
// Displays a friendly error message to the user.
// =========================================================================

function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Red X icon to visually indicate an error */}
      <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      <p className="text-red-400 text-lg font-medium">{message}</p>
      <p className="text-gray-500 text-sm mt-2">Check your internet connection and try refreshing.</p>
    </div>
  );
}

export default ErrorMessage;
