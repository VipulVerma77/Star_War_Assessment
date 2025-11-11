export default function Error({ message, onRetry }) {
  const imageUrl = "https://illustrations.popsy.co/gray/error-500.svg"; 
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="glass p-8 rounded-2xl max-w-md animate-fade-in">
        <img
          src={imageUrl}
          alt="Error illustration"
          className="w-48 h-48 mx-auto mb-4 opacity-90"
        />
        <h2 className="text-2xl font-semibold text-purple-400 mb-2 animate-glow">
          System Malfunction Detected
        </h2>
        <p className="text-gray-400 mb-6">{message || "Unable to fetch data from the galaxy."}</p>
        <button
          onClick={onRetry}
          className="btn w-full hover:shadow-[0_0_20px_#c084fcaa]"
        >
          Reconnect to Galaxy
        </button>
      </div>
    </div>
  );
}
