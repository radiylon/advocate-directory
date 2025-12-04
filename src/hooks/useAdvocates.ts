import { useCallback, useEffect, useState } from "react";
import { Advocate } from "@/db/schema";

export function useAdvocates(searchTerm: string) {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);

  const fetchAdvocates = useCallback(async (search: string) => {
    const params = search ? `?search=${encodeURIComponent(search)}` : "";
    const response = await fetch(`/api/advocates${params}`);
    const json = await response.json();
    setAdvocates(json.data);
  }, []);

  useEffect(() => {
    fetchAdvocates(searchTerm);
  }, [fetchAdvocates, searchTerm]);

  return advocates;
}
