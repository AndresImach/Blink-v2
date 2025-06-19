// A simple animated spinner using Tailwind CSS
export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-60 z-50">
      <div className="animate-spin text-4xl h-16 w-16 flex items-center justify-center">
        <span role="img" aria-label="dollar" className="text-green-500">$</span>
      </div>
    </div>
  );
}
