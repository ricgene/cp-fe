"use client";

import React from "react";
import { IWaitlistEntry } from "@/types";
import { usePaginatedList } from "@/hooks";
import { ControlHeader } from "@/components/shared";
import { Table, Pagination } from "@/components/ui";
import { getWaitlistAdmin } from "@/requests/waitlist.requests";
import { transformWaitlistToTableData } from "@/utils/table.utils";
import { WAITLIST_TABLE_COLUMNS } from "@/constants/table.constants";

const styles = {
  pageContainer: "h-full flex flex-col",
};

const Waitlist = () => {
  const { meta, page, isLoading, filteredAndSorted, setPage, setSearchQuery } =
    usePaginatedList<IWaitlistEntry>({
      fetcher: ({ page, limit, search }) =>
        getWaitlistAdmin({
          page,
          limit,
          search,
        }).then((response) => ({
          data: response.data.data,
          meta: response.data.meta,
        })),
      initialLimit: 10,
    });

  const tableData = transformWaitlistToTableData(filteredAndSorted);

  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <ControlHeader
          title="Waitlist"
          description="List of all emails in the waitlist"
          searchBarProps={{
            onChangeText: (value) => setSearchQuery(value),
            placeholder: "Search by email...",
          }}
        />

        <Table
          data={tableData}
          loading={isLoading}
          columns={WAITLIST_TABLE_COLUMNS}
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

export default Waitlist;
