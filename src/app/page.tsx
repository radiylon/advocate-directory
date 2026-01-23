"use client";

import { ChangeEvent } from "react";
import { useQueryState, parseAsInteger, parseAsString, parseAsStringLiteral } from "nuqs";
import { Pagination } from "@/app/components/Pagination";
import { AdvocateList } from "@/app/components/AdvocateList";
import { SearchInput } from "@/app/components/SearchInput";
import { Select } from "@/app/components/Select";
import { StatusMessage } from "@/app/components/StatusMessage";
import { SortButton } from "@/app/components/SortButton";
import { useAdvocates, usePrefetchAdvocates } from "@/app/hooks/useAdvocates";
import { useDebounce } from "@/app/hooks/useDebounce";
import { US_STATES } from "@/lib/constants";

const SEARCH_DEBOUNCE_MS = 150;

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useQueryState("search", parseAsString.withDefault(""));
  const [stateFilter, setStateFilter] = useQueryState("state", parseAsString.withDefault(""));
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [sortDirection, setSortDirection] = useQueryState("sort", parseAsStringLiteral(["asc", "desc"]).withDefault("asc"));

  const debouncedSearch = useDebounce(searchTerm, SEARCH_DEBOUNCE_MS);
  const filters = {
    search: debouncedSearch,
    state: stateFilter,
    sort: sortDirection
  };
  const { advocates, pagination, isLoading } = useAdvocates(filters, currentPage);
  const prefetchAdvocates = usePrefetchAdvocates(filters);

  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const onStateChange = (value: string): void => {
    setStateFilter(value);
    setCurrentPage(1);
  };

  const resetFilters = (): void => {
    setSearchTerm("");
    setStateFilter("");
    setCurrentPage(1);
    setSortDirection("asc");
  };

  const toggleSortDirection = () => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');

  return (
    <main className="w-full">
      <div className="sticky top-0 z-50 bg-white py-4 -mx-6 px-6 mb-6 border-b border-gray-200 flex flex-col items-center lg:flex-row lg:items-end lg:justify-between gap-4 h-[99px]">
        <SearchInput
          value={searchTerm}
          onChange={onSearchTermChange}
          onReset={resetFilters}
        >
          <Select label="State" value={stateFilter} options={US_STATES} onChange={onStateChange} />
          <SortButton label="Name" sortDirection={sortDirection} onClick={toggleSortDirection} />
        </SearchInput>
        <div className="h-[42px] flex items-center flex-shrink-0">
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setCurrentPage}
            onPrevHover={() => prefetchAdvocates(currentPage - 1)}
            onNextHover={() => prefetchAdvocates(currentPage + 1)}
          />
        </div>
      </div>
      <StatusMessage isLoading={isLoading} totalCount={pagination.totalCount} />
      <AdvocateList advocates={advocates} />
    </main>
  );
}
