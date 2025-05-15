import { Icon } from "../icons";
const CardError = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div
    role="alert"
    className={`rounded-xl p-6 w-full max-w-md mx-auto text-center shadow-lg border ${
      isDarkMode ? "bg-gray-800 border-red-500/20" : "bg-red-50 border-red-200"
    }`}
  >
    <div className="flex flex-col items-center space-y-3">
      <Icon name="error" className="text-red-500 h-12 w-12 animate-pulse" />
      <h3 className="text-lg font-semibold text-red-400">
        Oops! Something went wrong
      </h3>
      <p className="text-red-300">Failed to load skip information</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
      >
        Try Again
      </button>
    </div>
  </div>
);
export default CardError;