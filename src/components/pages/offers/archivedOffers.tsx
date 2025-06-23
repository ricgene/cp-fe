"use client";

import React from "react";
import { IOffer } from "@/types";
import { getAllOffers } from "@/requests";
import { OfferStatusEnum } from "@/enums";
import { usePaginatedList } from "@/hooks";
import { ControlHeader } from "@/components/shared";
import { Table, Pagination } from "@/components/ui";
import { transformOffersToTableData } from "@/utils";
import { OFFER_TABLE_COLUMNS, SORT_BY_OPTIONS } from "@/constants";

const styles = {
  pageContainer: "h-full flex flex-col",
};

const ArchivedOffers = () => {
  const {
    meta,
    page,
    sortBy,
    isLoading,
    filteredAndSorted,
    setPage,
    setSortBy,
    setSearchQuery,
  } = usePaginatedList<IOffer>({
    fetcher: ({ page, limit, search }) =>
      getAllOffers({
        status: OfferStatusEnum.ARCHIVED,
        page,
        limit,
        search,
      }).then((response) => ({
        data: response.data.offers,
        meta: response.data.meta,
      })),
  });
  // Derived state
  const tableData = transformOffersToTableData(filteredAndSorted);

  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <ControlHeader
          title="Archived Offers"
          searchBarProps={{
            onChangeText: (value) => setSearchQuery(value),
          }}
          selectProps={{
            size: "small",
            name: "Sort by",
            value: sortBy || "",
            onChange: setSortBy,
            options: SORT_BY_OPTIONS,
          }}
        />

        <Table
          data={tableData}
          loading={isLoading}
          columns={OFFER_TABLE_COLUMNS}
          isEmpty={!isLoading && tableData.length === 0}
        />

        <Pagination
          page={page}
          loading={isLoading}
          onPageChange={setPage}
          totalPages={meta.totalPages}
        />
      </div>
    </React.Fragment>
  );
};

export default ArchivedOffers;
