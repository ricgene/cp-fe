"use client";

import React, { useState } from "react";
import { ActionEnum } from "@/enums";
import { IEvent, ActionType } from "@/types";
import { useModal, usePaginatedList } from "@/hooks";
import { getAllEvents, deleteEvent } from "@/requests";
import CreateEventModal from "./shared/createEventModal";
import { Table, Pagination, Typography } from "@/components/ui";
import { handleError, transformEventsToTableData } from "@/utils";
import { EVENTS_TABLE_COLUMNS, SORT_BY_OPTIONS } from "@/constants";
import { ControlHeader, ConfirmationModal } from "@/components/shared";
import toast from "react-hot-toast";

const styles = {
  pageContainer: "h-full flex flex-col",
};

type ModalType = "create" | "delete";

const Events = () => {
  const {
    meta,
    page,
    sortBy,
    isLoading,
    filteredAndSorted,
    refresh,
    setPage,
    setSortBy,
    setSearchQuery,
  } = usePaginatedList<IEvent>({
    fetcher: ({ page, limit, search, sortBy }) =>
      getAllEvents({
        page,
        limit,
        search,
        sortBy,
      }).then((response) => ({
        data: response.data.events,
        meta: response.data.meta,
      })),
  });

  const actionModal = useModal<{ type: ModalType; event: IEvent }>();
  const [isActionLoading, setIsActionLoading] = useState(false);
  const tableData = transformEventsToTableData(filteredAndSorted);

  const handleAction = (itemId: number, action: ActionType) => {
    const event = filteredAndSorted.find((e) => e.id === itemId);
    if (!event) return;

    switch (action) {
      case ActionEnum.DELETE:
        actionModal.open({ type: "delete", event });
        break;
    }
  };

  const handleCreateEvent = async () => {
    try {
      await refresh();
      actionModal.close();
    } catch (error) {
      handleError(error);
    }
  };

  const handleConfirmAction = async () => {
    if (!actionModal.data) return;

    try {
      setIsActionLoading(true);
      await deleteEvent(actionModal.data.event.id);
      toast.success("Event deleted successfully");
      await refresh();
    } catch (error) {
      handleError(error);
    } finally {
      setIsActionLoading(false);
      actionModal.close();
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <ControlHeader
          title="Events"
          description="List of Societies' Events"
          buttonProps={{
            size: "small",
            variant: "primary",
            children: "Create New Event",
            onClick: () =>
              actionModal.open({ type: "create", event: {} as IEvent }),
          }}
          searchBarProps={{
            onChangeText: setSearchQuery,
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
          showActions
          data={tableData}
          loading={isLoading}
          onAction={handleAction}
          columns={EVENTS_TABLE_COLUMNS}
          isEmpty={!isLoading && tableData.length === 0}
          actions={[
            {
              key: ActionEnum.DELETE,
              label: "Delete",
            },
          ]}
        />

        <Pagination
          page={page}
          loading={isLoading}
          onPageChange={setPage}
          totalPages={meta.totalPages}
        />
      </div>

      <CreateEventModal
        onSuccess={handleCreateEvent}
        isOpen={actionModal.isOpen && actionModal.data?.type === "create"}
        onClose={actionModal.close}
      />

      <ConfirmationModal
        title="Delete Event"
        isOpen={actionModal.isOpen && actionModal.data?.type === "delete"}
        isLoading={isActionLoading}
        onCancel={actionModal.close}
        onApprove={handleConfirmAction}
        centerContent={
          <Typography level="p1">
            Are you sure you want to delete{" "}
            <span className="font-bold">{actionModal?.data?.event.name}</span>?
            This action cannot be undone.
          </Typography>
        }
      />
    </>
  );
};

export default Events;
