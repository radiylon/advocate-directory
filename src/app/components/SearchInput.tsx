import { ChangeEvent, ReactNode } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  children?: ReactNode;
}

export function SearchInput({ value, onChange, onReset, children }: SearchInputProps) {
  return (
    <div className="text-black flex flex-wrap items-end gap-2">
      <input
        className="border border-black px-3 py-2 rounded w-full md:w-96"
        value={value}
        onChange={onChange}
        placeholder="Search advocates..."
      />
      {children}
      <button
        onClick={onReset}
        className="px-4 py-2 border border-black rounded hover:bg-gray-100"
      >
        Reset
      </button>
    </div>
  );
}
