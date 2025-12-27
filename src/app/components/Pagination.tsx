import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevHover?: () => void;
  onNextHover?: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevHover,
  onNextHover,
}: PaginationProps): JSX.Element | null {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-4 text-black">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          onMouseEnter={currentPage > 1 ? onPrevHover : undefined}
          onFocus={currentPage > 1 ? onPrevHover : undefined}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span>
          Page {currentPage} of {totalPages.toLocaleString()}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          onMouseEnter={currentPage < totalPages ? onNextHover : undefined}
          onFocus={currentPage < totalPages ? onNextHover : undefined}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
