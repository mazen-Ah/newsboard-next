import React from "react";
interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      className="p-2 border rounded flex-1 text-blue-500 min-w-[20rem]"
      placeholder="Search articles..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
