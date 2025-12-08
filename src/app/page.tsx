"use client";

import { ChangeEvent } from "react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { Pagination } from "@/app/components/Pagination";
import { AdvocateList } from "@/app/components/AdvocateList";
import { SearchInput } from "@/app/components/SearchInput";
import { Select } from "@/app/components/Select";
import { StatusMessage } from "@/app/components/StatusMessage";
import { useAdvocates } from "@/app/hooks/useAdvocates";
import { useDebounce } from "@/app/hooks/useDebounce";
import { US_STATES } from "@/lib/constants";

const SEARCH_DEBOUNCE_MS = 300;

export default function Home() {
  const [searchTerm, setSearchTerm] = useQueryState("search", parseAsString.withDefault(""));
  const [stateFilter, setStateFilter] = useQueryState("state", parseAsString.withDefault(""));
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const debouncedSearch = useDebounce(searchTerm, SEARCH_DEBOUNCE_MS);
  const { advocates, pagination, isLoading } = useAdvocates(
    {
      search: debouncedSearch,
      state: stateFilter,
    },
    currentPage
  );

  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStateChange = (value: string): void => {
    setStateFilter(value);
    setCurrentPage(1);
  };

  const resetFilters = (): void => {
    setSearchTerm("");
    setStateFilter("");
    setCurrentPage(1);
  };

  return (
    <main>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <SearchInput
          value={searchTerm}
          onChange={onSearchTermChange}
          onReset={resetFilters}
        >
          <Select
            label="State"
            value={stateFilter}
            options={US_STATES}
            onChange={handleStateChange}
          />
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
