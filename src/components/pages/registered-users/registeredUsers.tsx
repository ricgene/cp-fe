"use client";

import React from "react";
import { IUser, RoleType } from "@/types";
import { usePaginatedList } from "@/hooks";
import { getRegisteredUsers } from "@/requests";
import { ControlHeader } from "@/components/shared";
import { Pagination, Table } from "@/components/ui";
import { transformRegisteredUsersToTableData } from "@/utils";
import { REGISTERED_USERS_TABLE_COLUMNS, SORT_BY_OPTIONS } from "@/constants";
import { RoleEnum } from "@/enums";

interface Props {
  role: RoleType;
}

const styles = {
  pageContainer: "h-full flex flex-col",
};

const RegisteredUsers = ({ role }: Props) => {
  const {
    meta,
    page,
    sortBy,
    isLoading,
    filteredAndSorted,
    setPage,
    setSortBy,
    setSearchQuery,
  } = usePaginatedList<IUser>({
    fetcher: ({ page, limit, search, sortBy }) =>
      getRegisteredUsers({ page, limit, search, sortBy, role }).then(
        (response) => ({
          data: response.data.users,
          meta: response.data.meta,
        })
      ),
  });

  const tableData = transformRegisteredUsersToTableData(filteredAndSorted);

  return (
    <div className={styles.pageContainer}>
      <ControlHeader
        title={
          role === RoleEnum.MERCHANT
            ? "Registered Merchants"
            : "Registered Users"
        }
        description={
          role === RoleEnum.MERCHANT
            ? "Active Merchants"
            : "Registered Users from societies."
        }
        searchBarProps={{
          onChangeText: setSearchQuery,
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
        columns={REGISTERED_USERS_TABLE_COLUMNS}
        isEmpty={!isLoading && tableData.length === 0}
      />

      <Pagination
        page={page}
        loading={isLoading}
        onPageChange={setPage}
        totalPages={meta?.totalPages}
      />
    </div>
  );
};

export default RegisteredUsers;
