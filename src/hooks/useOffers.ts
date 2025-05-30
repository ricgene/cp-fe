import { useState, useEffect } from "react";
import { IOffer, SortByType } from "@/types";
import { getAllOffers } from "@/requests/offers.requests";
import { handleError, sortList } from "@/utils";
import { OfferStatusEnum } from "@/enums";

interface UseOffersProps {
  status: (typeof OfferStatusEnum)[keyof typeof OfferStatusEnum];
}

interface UseOffersReturn {
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  offersList: IOffer[];
  sortBy: SortByType | null;
  setSortBy: (sort: SortByType | null) => void;
  filteredAndSortedOffers: IOffer[];
  refreshOffers: () => Promise<void>;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const useOffers = ({ status }: UseOffersProps): UseOffersReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [offersList, setOffersList] = useState<IOffer[]>([]);
  const [sortBy, setSortBy] = useState<SortByType | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
  });

  const getOffersList = async () => {
    try {
      const response = await getAllOffers({
        status,
        page,
        limit,
        search: searchQuery || undefined,
      });
      setOffersList(response.data.offers.data);
      setMeta(response.data.offers.meta);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Only sort on frontend since backend doesn't support sorting yet
  const filteredAndSortedOffers = sortList(offersList, sortBy);

  useEffect(() => {
    setIsLoading(true);
    getOffersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page, limit, searchQuery]);

  return {
    isLoading,
    searchQuery,
    setSearchQuery,
    offersList,
    sortBy,
    setSortBy,
    filteredAndSortedOffers,
    refreshOffers: getOffersList,
    page,
    setPage,
    limit,
    setLimit,
    meta,
  };
};
