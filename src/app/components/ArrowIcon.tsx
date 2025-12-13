import { SortDirection } from "@/types";

interface ArrowIconProps {
  sortDirection: SortDirection;
}

export function ArrowIcon({ sortDirection }: ArrowIconProps): JSX.Element {
  const isAscending = sortDirection === 'asc';
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor"
      className={`w-6 h-6 ${isAscending ? "" : "rotate-180"}`}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M12 18L12 6M12 6L7 11M12 6L17 11" 
      />
    </svg>
  );
}

