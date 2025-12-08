import { useAdvocates } from "@/hooks/useAdvocates";

interface StatusMessageProps {
  searchTerm: string;
  currentPage: number;
}

export function StatusMessage({ searchTerm, currentPage }: StatusMessageProps) {
  const { isLoading, pagination } = useAdvocates(searchTerm, currentPage);

  let message: string;
  
  if (isLoading) {
    message = "Loading...";
  } else if (pagination.totalCount === 0) {
    message = "No advocates found";
  } else {
    message = `Total: ${pagination.totalCount.toLocaleString()} results`;
  }

  return (
    <p className="text-lg text-center italic">{message}</p>
  );
}
