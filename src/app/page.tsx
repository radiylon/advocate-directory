"use client";

import { ChangeEvent, useState } from "react";
import { useQueryState, parseAsInteger, parseAsString, parseAsStringLiteral } from "nuqs";
import { Pagination } from "@/app/components/Pagination";
import { AdvocateList } from "@/app/components/AdvocateList";
import { SearchInput } from "@/app/components/SearchInput";
import { Select } from "@/app/components/Select";
import { StatusMessage } from "@/app/components/StatusMessage";
import { SortButton } from "@/app/components/SortButton";
import { Button } from "@/app/components/Button";
import { MobileDrawer } from "@/app/components/MobileDrawer";
import { MenuIcon } from "@/app/components/icons/MenuIcon";
import { useAdvocates, usePrefetchAdvocates } from "@/app/hooks/useAdvocates";
import { useDebounce } from "@/app/hooks/useDebounce";
import { US_STATES } from "@/lib/constants";

const SEARCH_DEBOUNCE_MS = 150;

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useQueryState("search", parseAsString.withDefault(""));
  const [stateFilter, setStateFilter] = useQueryState("state", parseAsString.withDefault(""));
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [sortDirection, setSortDirection] = useQueryState("sort", parseAsStringLiteral(["asc", "desc"]).withDefault("asc"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    <main className="w-full pb-20 md:pb-0">
      <div className="sticky top-0 z-50 bg-white py-4 -mx-6 px-6 mb-6 border-b border-gray-200">
        {/* Mobile: compact title + hamburger */}
        <div className="flex md:hidden items-center justify-between h-[42px]">
          <span className="text-2xl font-normal font-display">Advocate Directory</span>
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open filters"
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-filter-drawer"
            className="p-2 hover:bg-gray-100 rounded"
          >
            <MenuIcon size={24} />
          </button>
        </div>

        {/* Desktop: full filter bar */}
        <div className="hidden md:flex flex-col items-center lg:flex-row lg:items-end lg:justify-between gap-4 min-h-[100px] lg:min-h-[50px]">
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
      </div>

      {/* Mobile drawer with filter controls (no pagination) */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="mobile-search" className="text-sm text-gray-600">Search</label>
          <input
            id="mobile-search"
            className="border border-black px-3 py-2 w-full h-[42px]"
            value={searchTerm}
            onChange={onSearchTermChange}
            placeholder="Search by name, city, or specialty"
          />
        </div>
        <Select label="State" value={stateFilter} options={US_STATES} onChange={onStateChange} />
        <SortButton label="Name" sortDirection={sortDirection} onClick={toggleSortDirection} />
        <Button
          onClick={resetFilters}
          className="bg-tag-rose-bg text-tag-rose-text border-tag-rose-text hover:bg-rose-200 h-[42px]"
        >
          Reset
        </Button>
      </MobileDrawer>

      <div className="hidden md:block">
        <StatusMessage isLoading={isLoading} totalCount={pagination.totalCount} />
      </div>
      <AdvocateList advocates={advocates} />

      {/* Mobile: floating bottom pagination */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-3 px-4 flex justify-center md:hidden text-sm">
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
          onPrevHover={() => prefetchAdvocates(currentPage - 1)}
          onNextHover={() => prefetchAdvocates(currentPage + 1)}
        />
      </div>
    </main>
  );
}
