import React from "react";

type Props = {};

const EmptyState = (props: Props) => {
  return (
    <div className="text-center text-gray-500 mt-8 p-4 bg-white rounded-lg shadow-sm">
      No articles found
    </div>
  );
};

export default EmptyState;
