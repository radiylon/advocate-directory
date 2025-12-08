export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface FilterParams {
  search?: string;
  state?: string;
}
