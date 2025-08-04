export const ArticleSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm  overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-gray-200" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
            <div className="h-6 bg-gray-200 rounded mb-3" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-8 bg-gray-200 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
