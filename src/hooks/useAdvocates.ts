import { useQuery } from "@tanstack/react-query";
import { Advocate } from "@/db/schema";

interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

interface AdvocatesQueryResult {
  advocates: Advocate[];
  pagination: Pagination;
  isLoading: boolean;
  isError: boolean;
}

const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  limit: 20,
  totalPages: 1,
  totalCount: 0,
};

async function getAdvocates(search: string, currentPage: number) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  params.set("page", String(currentPage));
  params.set("limit", "20");

  const response = await fetch(`/api/advocates?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch advocates");
  }
  return response.json();
}

export function useAdvocates(searchTerm: string, page: number = 1): AdvocatesQueryResult {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["advocates", searchTerm, page],
    queryFn: () => getAdvocates(searchTerm, page),
  });

  return {
    advocates: data?.data ?? [],
    pagination: data?.pagination ?? DEFAULT_PAGINATION,
    isLoading,
    isError,
  };
}
