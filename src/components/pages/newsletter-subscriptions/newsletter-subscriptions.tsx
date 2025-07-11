"use client";

import React from "react";
import { ISubscriptionsEntry } from "@/types";
import { usePaginatedList } from "@/hooks";
import { SORT_BY_OPTIONS } from "@/constants";
import { ControlHeader } from "@/components/shared";
import { Table, Pagination } from "@/components/ui";
import { getSubscriptionsList } from "@/requests";
import { transformNewsletterToTableData } from "@/utils/table.utils";
import { NEWSLETTER_TABLE_COLUMNS } from "@/constants/table.constants";

const styles = {
  pageContainer: "h-full flex flex-col",
};

const NewsletterSubscriptions = () => {
  const {
    meta,
    page,
    sortBy,
    isLoading,
    filteredAndSorted,
    setPage,
    setSortBy,
    setSearchQuery,
  } = usePaginatedList<ISubscriptionsEntry>({
    fetcher: ({ page, limit, search, sortBy }) =>
      getSubscriptionsList({
        page,
        limit,
        search,
        sortBy,
      }).then((response) => ({
        data: response.data.data,
        meta: response.data.meta,
      })),
    initialLimit: 10,
  });

  const tableData = transformNewsletterToTableData(filteredAndSorted);

  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <ControlHeader
          title="Newsletter Subscriptions"
          description="List of all emails"
          searchBarProps={{
            onChangeText: (value) => setSearchQuery(value),
            placeholder: "Search by email...",
          }}
          selectProps={{
            name: "Sort by",
            size: "small",
            value: sortBy || "",
            options: SORT_BY_OPTIONS,
            onChange: setSortBy,
          }}
        />

        <Table
          data={tableData}
          loading={isLoading}
          columns={NEWSLETTER_TABLE_COLUMNS}
          isEmpty={!isLoading && filteredAndSorted.length === 0}
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

export default NewsletterSubscriptions;
