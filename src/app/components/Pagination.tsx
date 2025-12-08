interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isVisible = `${totalPages === 0 ? 'invisible' : ''}`;
  
  return (
    <div className={`${isVisible} mt-0 md:mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-black`}>
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border border-black rounded text-sm sm:text-base ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50 bg-gray-200"
              : "cursor-pointer hover:bg-gray-100"
          }`}
        >
          Prev
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border border-black rounded text-sm sm:text-base ${
            currentPage === totalPages
            ? "cursor-not-allowed opacity-50 bg-gray-200"
            : "cursor-pointer hover:bg-gray-100"
          }`}
        >
          Next
        </button>
        <span className="text-sm sm:text-base">Page {currentPage} of {totalPages.toLocaleString()}</span>
      </div>
    </div>
  );
}
