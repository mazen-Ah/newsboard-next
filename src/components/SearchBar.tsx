import React from "react";
interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  ref: React.Ref<HTMLInputElement>;
}
export default function SearchBar({ value, onChange, ref }: SearchBarProps) {
  return (
    <input
      ref={ref}
      className="p-2 border rounded flex-1 text-blue-500 min-w-[20rem]"
      placeholder="Search articles..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
