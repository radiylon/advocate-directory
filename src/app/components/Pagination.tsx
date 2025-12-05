interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, totalCount, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border border-black ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-gray-100"
        }`}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages} -  Total: {totalCount} results
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border border-black ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
}
