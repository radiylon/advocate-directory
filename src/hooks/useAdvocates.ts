import { useCallback, useEffect, useState } from "react";
import { Advocate } from "@/db/schema";

interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

interface UseAdvocatesResult {
  advocates: Advocate[];
  pagination: Pagination;
}

const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  limit: 20,
  totalPages: 1,
  totalCount: 0,
};

export function useAdvocates(searchTerm: string, page: number = 1): UseAdvocatesResult {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION);

  const fetchAdvocates = useCallback(async (search: string, currentPage: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", String(currentPage));
    params.set("limit", "20");

    const response = await fetch(`/api/advocates?${params}`);
    const { data, pagination } = await response.json();
    setAdvocates(data);
    setPagination(pagination);
  }, []);

  useEffect(() => {
    fetchAdvocates(searchTerm, page);
  }, [fetchAdvocates, searchTerm, page]);

  return { advocates, pagination };
}
