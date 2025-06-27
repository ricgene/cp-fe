"use client";

import React, { useState } from "react";
import { IUser } from "@/types";
import { usePaginatedList } from "@/hooks";
import { getRegisteredUsers } from "@/requests";
import { ControlHeader } from "@/components/shared";
import { Checkbox, Pagination, Table } from "@/components/ui";
import { transformRegisteredUsersToTableData } from "@/utils";
import { REGISTERED_USERS_TABLE_COLUMNS, SORT_BY_OPTIONS } from "@/constants";

const styles = {
  pageContainer: "h-full flex flex-col",
  actionBar: "flex items-center gap-4 mb-4 justify-end",
};

const AllocatePoints = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
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
    fetcher: ({ page, limit, search }) =>
      getRegisteredUsers({ page, limit, search }).then((response) => ({
        data: response.data.users,
        meta: response.data.meta,
      })),
    initialLimit: 10,
  });
  const tableData = transformRegisteredUsersToTableData(filteredAndSorted);

  const handleSelectionChange = (selected: string[]) => {
    setSelectedUsers(selected);
    setSelectedAll(false);
  };

  const handleAllocate = () => {
    // Send selected publicIds to parent or API
    // Example: allocatePointsToUsers(selected)
    alert(`Allocate points to: ${selectedUsers}`);
  };
  console.log(selectedUsers);

  return (
    <div className={styles.pageContainer}>
      <ControlHeader
        title="Allocate Points"
        description="Select the users to Allocate points for their good deeds"
        searchBarProps={{
          onChangeText: setSearchQuery,
        }}
        selectProps={{
          size: "small",
          name: "Sort by",
          value: sortBy || "",
          options: SORT_BY_OPTIONS,
          onChange: setSortBy,
        }}
        buttonProps={{
          size: "small",
          variant: "primary",
          children: "Allocate Points to User",
          onClick: () => handleAllocate(),
        }}
      />

      <div className="flex justify-end mt-4 pr-2">
        <Checkbox
          title="Select All"
          checked={selectedAll}
          onChange={() => setSelectedAll((prev) => !prev)}
        />
      </div>

      <Table
        data={tableData}
        loading={isLoading}
        wrapperClassName="!mt-4"
        selectableField="publicId"
        isSelectedAll={selectedAll}
        selectedValues={selectedUsers}
        onSelectionChange={handleSelectionChange}
        isEmpty={!isLoading && tableData.length === 0}
        columns={REGISTERED_USERS_TABLE_COLUMNS.filter(
          (col) => col.key === "name" || col.key === "publicId"
        )}
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

export default AllocatePoints;
