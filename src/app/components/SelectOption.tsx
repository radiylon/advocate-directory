export interface SelectOptionData {
  value: string;
  label: string;
}

interface SelectOptionProps {
  option: SelectOptionData;
  isSelected: boolean;
  onSelect: () => void;
}

export function SelectOption({
  option,
  isSelected,
  onSelect,
}: SelectOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full px-3 py-2 text-left text-md hover:bg-gray-100 ${
        isSelected ? "bg-gray-50 font-medium" : ""
      }`}
    >
      {option.label}
    </button>
  );
}
