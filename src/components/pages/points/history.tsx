"use client";

import React from "react";
import { getAllPointTransactions } from "@/requests";
import { usePaginatedList } from "@/hooks";
import { IPointTransaction } from "@/types";
import { ControlHeader } from "@/components/shared";
import { Table, Pagination } from "@/components/ui";
import { transformPointTransactionsToTableData } from "@/utils";
import { POINTS_HISTORY_TABLE_COLUMNS, SORT_BY_OPTIONS } from "@/constants";

const styles = {
  pageContainer: "h-full flex flex-col",
};

const PointsHistory = () => {
  const {
    meta,
    page,
    sortBy,
    isLoading,
    filteredAndSorted,
    setPage,
    setSortBy,
    setSearchQuery,
  } = usePaginatedList<IPointTransaction>({
    fetcher: ({ page, limit, search, sortBy }) =>
      getAllPointTransactions({
        page,
        limit,
        search,
        sortBy,
      }).then((response) => ({
        data: response.data.transactions,
        meta: response.data.meta,
      })),
  });
  // Derived state
  const tableData = transformPointTransactionsToTableData(filteredAndSorted);

  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <ControlHeader
          title="Point's History"
          description="List of all point transactions"
          searchBarProps={{
            onChangeText: (value) => setSearchQuery(value),
            placeholder: "Search by name or ID...",
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
          columns={POINTS_HISTORY_TABLE_COLUMNS}
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

export default PointsHistory;
