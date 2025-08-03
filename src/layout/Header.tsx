import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">NewsFlow</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
