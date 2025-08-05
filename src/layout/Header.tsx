import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-blue-500 ">
                NewsFlow
              </span>
              <span className="text-xs text-gray-500 -mt-1">Stay Informed</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-blue-500 font-semibold border-b-2 border-blue-500 pb-1"
            >
              Home
            </Link>
            <button
              disabled
              className="text-gray-400 cursor-not-allowed font-medium opacity-50"
              title="Coming Soon"
            >
              Trending
            </button>
            <button
              disabled
              className="text-gray-400 cursor-not-allowed font-medium opacity-50"
              title="Coming Soon"
            >
              Categories
            </button>
            <button
              disabled
              className="text-gray-400 cursor-not-allowed font-medium opacity-50"
              title="Coming Soon"
            >
              Bookmarks
            </button>
          </nav>
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
