import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): JSX.Element | null {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-0 md:mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-black">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
        <span className="text-sm sm:text-base">
          Page {currentPage} of {totalPages.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
