import React from "react";

type Props = { error: string };

const ErrorState = ({ error }: Props) => {
  return (
    <div className="text-center text-red-600 mt-8 p-4 bg-red-50 rounded-lg">
      {error}
    </div>
  );
};

export default ErrorState;
