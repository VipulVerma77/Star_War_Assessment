export default function Error({ message, onRetry }) {
  const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Q0TOXHGoPsoJ5Xf5YmFgJGy6FF0EhMR_-A&s"; 
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="glass p-8 rounded-2xl max-w-md animate-fade-in">
        <img
          src={imageUrl}
          alt="Error illustration"
          className="w-48 h-48 mx-auto mb-4 opacity-90"
        />
        <h2 className="text-2xl font-semibold text-purple-400 mb-2 animate-glow">
          Something Went Wrong
        </h2>
        <p className="text-gray-400 mb-6">{message || "Unable to fetch data from the galaxy."}</p>
      </div>
    </div>
  );
}
