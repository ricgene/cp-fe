"use client";

import React from "react";
import { IMerchantRequest } from "@/types";
import { usePaginatedList } from "@/hooks";
import { RequestStatusEnum } from "@/enums";
import { getAllRequests } from "@/requests";
import { ControlHeader } from "@/components/shared";
import { Pagination, Table } from "@/components/ui";
import { transformRequestsToTableData } from "@/utils";
import { REVOKED_REQUESTS_TABLE_COLUMNS, SORT_BY_OPTIONS } from "@/constants";

const styles = {
  pageContainer: "h-full flex flex-col",
};

const RevokedMerchants = () => {
  const {
    meta,
    page,
    sortBy,
    isLoading,
    filteredAndSorted,
    setPage,
    setSortBy,
    setSearchQuery,
  } = usePaginatedList<IMerchantRequest>({
    fetcher: ({ page, limit, search }) =>
      getAllRequests({
        status: RequestStatusEnum.REJECTED,
        page,
        limit,
        search,
      }).then((response) => ({
        data: response.data.requests.map((request) => ({
          ...request.data.merchantData,
          id: request.id,
          type: request.type,
          status: request.status,
          reason: request.reason,
        })),
        meta: response.data.meta,
      })),
  });

  // Derived state
  const tableData = transformRequestsToTableData(filteredAndSorted);

  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <ControlHeader
          title="Revoked Merchants"
          description="Revoke Merchant Requests"
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
          columns={REVOKED_REQUESTS_TABLE_COLUMNS}
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

export default RevokedMerchants;
