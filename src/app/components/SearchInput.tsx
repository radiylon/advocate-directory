import { ChangeEvent, ReactNode } from "react";
import { Button } from "./Button";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  children?: ReactNode;
}

export function SearchInput({
  value,
  onChange,
  onReset,
  children,
}: SearchInputProps): JSX.Element {
  return (
    <div className="text-black flex flex-col md:flex-row md:flex-wrap items-center md:items-end gap-2 mb-4 md:mb-0 h-[66px]">
      <input
        className="border border-black px-3 py-2 w-80 md:w-96 h-[42px] flex-shrink-0"
        value={value}
        onChange={onChange}
        placeholder="Search by name, city, or specialty"
      />
      <div className="flex items-end gap-2 h-[42px] flex-shrink-0">
        {children}
        <Button onClick={onReset} className="bg-tag-rose-bg text-tag-rose-text border-tag-rose-text hover:bg-rose-200 h-[42px] flex-shrink-0">Reset</Button>
      </div>
    </div>
  );
}
