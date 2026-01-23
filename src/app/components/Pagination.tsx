"use client";

import { useRef, useEffect } from "react";
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
}: PaginationProps): JSX.Element {
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const shouldPrefetchPrev = prevButtonRef.current?.matches(":hover") && currentPage > 1 && onPrevHover;
    const shouldPrefetchNext = nextButtonRef.current?.matches(":hover") && currentPage < totalPages && onNextHover;

    if (shouldPrefetchPrev) onPrevHover();
    if (shouldPrefetchNext) onNextHover();
  }, [currentPage, totalPages, onPrevHover, onNextHover]);

  return (
    <div className="flex items-center gap-4 text-black">
      <div className="flex items-center gap-4">
        <Button
          ref={prevButtonRef}
          onClick={() => onPageChange(currentPage - 1)}
          onMouseEnter={currentPage > 1 ? onPrevHover : undefined}
          onFocus={currentPage > 1 ? onPrevHover : undefined}
          disabled={currentPage === 1 || totalPages <= 1}
        >
          Prev
        </Button>
        <span>
          Page {currentPage} of {totalPages.toLocaleString()}
        </span>
        <Button
          ref={nextButtonRef}
          onClick={() => onPageChange(currentPage + 1)}
          onMouseEnter={currentPage < totalPages ? onNextHover : undefined}
          onFocus={currentPage < totalPages ? onNextHover : undefined}
          disabled={currentPage === totalPages || totalPages <= 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
