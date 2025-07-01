"use client";

import React, { useState } from "react";
import { IUser } from "@/types";
import { usePaginatedList } from "@/hooks";
import { useModal } from "@/hooks/useModal";
import { getRegisteredUsers } from "@/requests";
import { ControlHeader } from "@/components/shared";
import AllocatePointsModal from "./allocatePointsModal";
import { Checkbox, Pagination, Table } from "@/components/ui";
import { transformRegisteredUsersToTableData } from "@/utils";
import { REGISTERED_USERS_TABLE_COLUMNS, SORT_BY_OPTIONS } from "@/constants";
import { RoleEnum } from "@/enums";

const styles = {
  pageContainer: "h-full flex flex-col",
  actionBar: "flex items-center gap-4 mb-4 justify-end",
};

const AllocatePoints = () => {
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<
    {
      name: string;
      publicId: string;
    }[]
  >([]);
  const allocateModal = useModal();
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
      getRegisteredUsers({ page, limit, search, role: RoleEnum.RESIDENT }).then(
        (response) => ({
          data: response.data.users,
          meta: response.data.meta,
        })
      ),
    initialLimit: 10,
  });
  const tableData = transformRegisteredUsersToTableData(filteredAndSorted);

  const handleSelectionChange = (selected: string[]) => {
    const selectedUserMap = new Map(selectedUsers.map((u) => [u.publicId, u]));
    const newUsers = filteredAndSorted
      .filter(
        (u) => selected.includes(u.publicId) && !selectedUserMap.has(u.publicId)
      )
      .map((u) => ({ name: u.name, publicId: u.publicId }));
    const stillSelected = selectedUsers.filter((u) =>
      selected.includes(u.publicId)
    );
    setSelectedUsers([...stillSelected, ...newUsers]);
    setSelectedAll(false);
  };

  const handleAllocate = () => {
    allocateModal.open();
  };

  console.log();

  return (
    <div className={styles.pageContainer}>
      <ControlHeader
        title="Allocate Points"
        description="Select the users to Allocate points for their good deeds"
        searchBarProps={{
          onChangeText: setSearchQuery,
          placeholder: "Search by name or ID...",
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
          disabled: !selectedAll && selectedUsers.length === 0,
        }}
      />

      <div className="flex justify-end mt-4 pr-2">
        <Checkbox
          title="Select All"
          checked={selectedAll}
          onChange={() => {
            setSelectedAll((prev) => !prev);
            setSelectedUsers([]);
          }}
        />
      </div>

      <Table
        data={tableData}
        loading={isLoading}
        wrapperClassName="!mt-4"
        selectableField="publicId"
        isSelectedAll={selectedAll}
        selectedValues={selectedUsers.map((u) => u.publicId)}
        onSelectionChange={handleSelectionChange}
        isEmpty={!isLoading && tableData.length === 0}
        columns={REGISTERED_USERS_TABLE_COLUMNS.filter(
          (col) =>
            col.key === "name" ||
            col.key === "email" ||
            col.key === "state" ||
            col.key === "city" ||
            col.key === "publicId"
        )}
      />

      <Pagination
        page={page}
        loading={isLoading}
        onPageChange={setPage}
        totalPages={meta?.totalPages}
      />

      <AllocatePointsModal
        totalUsers={meta?.total}
        isSelectedAll={selectedAll}
        isOpen={allocateModal.isOpen}
        onClose={allocateModal.close}
        selectedValues={selectedUsers.map((u) => u.publicId)}
        selectedUsers={selectedUsers}
      />
    </div>
  );
};

export default AllocatePoints;
