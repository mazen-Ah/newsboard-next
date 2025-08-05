import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  ref: React.Ref<HTMLInputElement>;
}

export default function SearchBar({ value, onChange, ref }: SearchBarProps) {
  return (
    <div className="relative w-full mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        ref={ref}
        className="w-full px-4 ps-12 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 "
        placeholder="Search for news articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
