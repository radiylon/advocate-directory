import { Button } from "./Button";
import { SortDirection } from "@/types";
import { ArrowIcon } from "./ArrowIcon";

interface SortButtonProps {
  label: string;
  sortDirection: SortDirection;
  onClick: () => void;
}

export function SortButton({ label, sortDirection, onClick }: SortButtonProps): JSX.Element {
  return (
    <Button onClick={onClick} className="flex items-center gap-2">
      {label}
      <ArrowIcon sortDirection={sortDirection} />
    </Button>
  );
}

