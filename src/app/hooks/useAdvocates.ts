import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Advocate } from "@/db/schema";
import { Pagination, FilterParams } from "@/types";

interface AdvocatesQueryResult {
  advocates: Advocate[];
  pagination: Pagination;
  isLoading: boolean;
}

const DEFAULT_LIMIT = 100;

const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  limit: DEFAULT_LIMIT,
  totalPages: 1,
  totalCount: 0,
};

async function getAdvocates(filters: FilterParams, currentPage: number): Promise<{ data: Advocate[]; pagination: Pagination }> {
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
  const { data, isLoading } = useQuery({
    queryKey: ["advocates", filters.search, filters.state, page],
    queryFn: () => getAdvocates(filters, page),
    placeholderData: keepPreviousData,
  });

  return {
    advocates: data?.data ?? [],
    pagination: data?.pagination ?? DEFAULT_PAGINATION,
    isLoading,
  };
}
