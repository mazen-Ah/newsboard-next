import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/globe.svg"
            alt="Logo"
            className="w-7 h-7 rounded-full group-hover:scale-105 transition-transform"
          />
          <span className="text-2xl font-semibold tracking-tight text-blue-600 transition-colors">
            NewsFlow
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
