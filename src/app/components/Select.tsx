"use client";

import { useState, useRef, useEffect } from "react";
import { SelectOption, SelectOptionData } from "./SelectOption";
import { ChevronIcon } from "./ChevronIcon";
import { Button } from "./Button";

interface SelectProps {
  label: string;
  options: SelectOptionData[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "All",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const displayText = value
    ? options.find((o) => o.value === value)?.label ?? value
    : placeholder;

  return (
    <div className="flex flex-col gap-1 relative" ref={containerRef}>
      <label className="text-sm text-gray-600">{label}</label>
      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-white text-black min-w-[100px] text-left flex justify-between items-center"
      >
        <span className="font-medium">{displayText}</span>
        <ChevronIcon isOpen={isOpen} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 max-h-60 overflow-y-auto bg-white border border-black rounded shadow-lg z-50">
          <SelectOption
            option={{ value: "", label: placeholder }}
            isSelected={!value}
            onSelect={() => handleSelect("")}
          />
          {options.map((option) => (
            <SelectOption
              key={option.value}
              option={option}
              isSelected={value === option.value}
              onSelect={() => handleSelect(option.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
