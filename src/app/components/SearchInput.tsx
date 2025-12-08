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
    <div className="text-black flex flex-wrap items-end gap-2">
      <input
        className="border border-black px-3 py-2 rounded w-full md:w-96"
        value={value}
        onChange={onChange}
        placeholder="Search by name, city, or specialty"
      />
      {children}
      <Button onClick={onReset}>Reset</Button>
    </div>
  );
}
