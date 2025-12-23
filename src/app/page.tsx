"use client";

import { ChangeEvent } from "react";
import { useQueryState, parseAsInteger, parseAsString, parseAsStringLiteral } from "nuqs";
import { Pagination } from "@/app/components/Pagination";
import { AdvocateList } from "@/app/components/AdvocateList";
import { SearchInput } from "@/app/components/SearchInput";
import { Select } from "@/app/components/Select";
import { StatusMessage } from "@/app/components/StatusMessage";
import { SortButton } from "@/app/components/SortButton";
import { useAdvocates } from "@/app/hooks/useAdvocates";
import { useDebounce } from "@/app/hooks/useDebounce";
import { US_STATES } from "@/lib/constants";

const SEARCH_DEBOUNCE_MS = 300;

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useQueryState("search", parseAsString.withDefault(""));
  const [stateFilter, setStateFilter] = useQueryState("state", parseAsString.withDefault(""));
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [sortDirection, setSortDirection] = useQueryState("sort", parseAsStringLiteral(["asc", "desc"]).withDefault("asc"));

  const debouncedSearch = useDebounce(searchTerm, SEARCH_DEBOUNCE_MS);
  const { advocates, pagination, isLoading } = useAdvocates(
    {
      search: debouncedSearch,
      state: stateFilter,
      sort: sortDirection
    },
    currentPage
  );

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
    <main>
      <div className="flex flex-col items-center lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
        <SearchInput
          value={searchTerm}
          onChange={onSearchTermChange}
          onReset={resetFilters}
        >
          <Select label="State" value={stateFilter} options={US_STATES} onChange={onStateChange} />
          <SortButton label="Name" sortDirection={sortDirection} onClick={toggleSortDirection} />
        </SearchInput>
        {!isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      <StatusMessage isLoading={isLoading} totalCount={pagination.totalCount} />
      <AdvocateList advocates={advocates} />
    </main>
  );
}
