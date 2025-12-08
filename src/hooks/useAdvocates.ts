import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Advocate } from "@/db/schema";

interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface FilterParams {
  search: string;
  state: string;
}

interface AdvocatesQueryResult {
  advocates: Advocate[];
  pagination: Pagination;
  isLoading: boolean;
  isError: boolean;
}

const DEFAULT_LIMIT = 100;

const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  limit: DEFAULT_LIMIT,
  totalPages: 1,
  totalCount: 0,
};

async function getAdvocates(filters: FilterParams, currentPage: number) {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.state) params.set("state", filters.state);
  params.set("page", currentPage.toString());
  params.set("limit", DEFAULT_LIMIT.toString());

  const response = await fetch(`/api/advocates?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch advocates");
  }
  return response.json();
}

export function useAdvocates(filters: FilterParams, page: number = 1): AdvocatesQueryResult {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["advocates", filters.search, filters.state, page],
    queryFn: () => getAdvocates(filters, page),
    placeholderData: keepPreviousData,
  });

  return {
    advocates: data?.data ?? [],
    pagination: data?.pagination ?? DEFAULT_PAGINATION,
    isLoading,
    isError,
  };
}
