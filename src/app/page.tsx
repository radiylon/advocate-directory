"use client";

import { ChangeEvent } from "react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { Pagination } from "@/app/components/Pagination";
import { AdvocateList } from "@/app/components/AdvocateList";
import { SearchInput } from "@/app/components/SearchInput";
import { StatusMessage } from "@/app/components/StatusMessage";
import { useAdvocates } from "../hooks/useAdvocates";
import { useDebounce } from "../hooks/useDebounce";

const SEARCH_DEBOUNCE_MS = 300;

export default function Home() {
  const [searchTerm, setSearchTerm] = useQueryState("search", parseAsString.withDefault(""));
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const debouncedSearch = useDebounce(searchTerm, SEARCH_DEBOUNCE_MS);
  const { advocates, pagination } = useAdvocates(debouncedSearch, currentPage);

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
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <SearchInput
          value={searchTerm}
          onChange={onSearchTermChange} 
          onReset={resetSearch} 
        />
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <StatusMessage searchTerm={searchTerm} currentPage={currentPage} />
      <AdvocateList advocates={advocates} />
    </main>
  );
}
