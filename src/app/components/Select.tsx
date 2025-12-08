"use client";

import { useState, useRef, useEffect } from "react";
import { SelectOption, SelectOptionData } from "./SelectOption";

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
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border border-black px-3 py-2 rounded bg-white text-black min-w-[160px] text-left flex justify-between items-center"
      >
        <span className={!value ? "text-gray-500" : ""}>{displayText}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-black rounded shadow-lg z-50">
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
