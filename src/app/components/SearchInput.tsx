import { ChangeEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export function SearchInput({ value, onChange, onReset }: SearchInputProps) {
  return (
    <div className="text-black flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          className="border border-black px-3 py-2 rounded w-full md:w-96"
          value={value}
          onChange={onChange}
          placeholder="Search advocates..."
        />
        <button
          onClick={onReset}
          className="px-4 py-2 border border-black rounded hover:bg-gray-100"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
