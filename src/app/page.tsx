"use client";

import { ChangeEvent } from "react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { Pagination } from "@/app/components/Pagination";
import { AdvocatesTable } from "@/app/components/AdvocateTable";
import { SearchInput } from "@/app/components/SearchInput";
import { useAdvocates } from "../hooks/useAdvocates";
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {
  const [searchTerm, setSearchTerm] = useQueryState("search", parseAsString.withDefault(""));
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const debouncedSearch = useDebounce(searchTerm, 300);
  const { advocates, pagination, isLoading, isError } = useAdvocates(debouncedSearch, currentPage);

  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <main>
      <div className="flex items-end justify-between mb-6">
        <SearchInput
          value={searchTerm}
          onChange={onSearchTermChange} 
          onReset={resetSearch} 
        />
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalCount}
          onPageChange={setCurrentPage}
        />
      </div>
      <AdvocatesTable advocates={advocates} />
    </main>
  );
}
