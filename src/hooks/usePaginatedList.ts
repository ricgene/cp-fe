import { useEffect, useState } from "react";
import { SortByType } from "@/types";
import { handleError } from "@/utils";

interface UsePaginatedListProps<T> {
  fetcher: (params: {
    page: number;
    limit: number;
    search?: string;
    sortBy?: SortByType;
  }) => Promise<{ data: T[]; meta: Meta }>;
  initialLimit?: number;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const usePaginatedList = <T>({
  fetcher,
  initialLimit = 5,
}: UsePaginatedListProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortByType | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    page: 1,
    limit: initialLimit,
    totalPages: 1,
  });

  const fetchData = async () => {
    try {
      const response = await fetcher({
        page,
        limit,
        search: searchQuery.trim() || undefined,
        sortBy: sortBy || undefined,
      });
      setData(response.data);
      setMeta(response.meta);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page, limit, sortBy]);

  const handleSearchQueryChange = (search: string) => {
    if (search === searchQuery) return;
    setSearchQuery(search);
    setPage(1);
  };

  return {
    page,
    meta,
    data,
    limit,
    sortBy,
    isLoading,
    searchQuery,
    filteredAndSorted: data,
    setPage,
    setLimit,
    setSortBy,
    setSearchQuery: handleSearchQueryChange,
    refresh: fetchData,
  };
};
