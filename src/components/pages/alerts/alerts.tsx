"use client";

import React, { useState } from "react";
import { IAlert } from "@/types";
import { ActionEnum } from "@/enums";
import { ActionType } from "@/types";
import { useModal, usePaginatedList } from "@/hooks";
import { deleteAlert, getAllAlerts } from "@/requests";
import CreateAlertModal from "./shared/createAlertModal";
import { Table, Pagination, Typography } from "@/components/ui";
import { handleError, transformAlertsToTableData } from "@/utils";
import { ALERTS_TABLE_COLUMNS, SORT_BY_OPTIONS } from "@/constants";
import { ControlHeader, ConfirmationModal } from "@/components/shared";

const styles = {
  pageContainer: "h-full flex flex-col",
};

type ModalType = "create" | "delete";

const Alerts = () => {
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
  } = usePaginatedList<IAlert>({
    fetcher: ({ page, limit, search }) =>
      getAllAlerts({
        page,
        limit,
        search,
      }).then((response) => ({
        data: response.data.alerts,
        meta: response.data.meta,
      })),
  });

  const actionModal = useModal<{ type: ModalType; alert: IAlert }>();
  const [isActionLoading, setIsActionLoading] = useState(false);
  const tableData = transformAlertsToTableData(filteredAndSorted);

  const handleAction = (itemId: number, action: ActionType) => {
    const alert = filteredAndSorted.find((e) => e.id === itemId);
    if (!alert) return;

    switch (action) {
      case ActionEnum.DELETE:
        actionModal.open({ type: "delete", alert });
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
      await deleteAlert(actionModal.data.alert.id);
      await refresh();
    } catch (error) {
      handleError(error);
    } finally {
      setIsActionLoading(false);
      actionModal.close();
    }
  };

  const getModalContent = () => {
    if (!actionModal.data?.alert) return null;

    switch (actionModal.data.type) {
      case "delete":
        return (
          <Typography level="p1">
            Are you sure you want to delete{" "}
            <span className="font-bold">{actionModal.data.alert.title}</span>?
            This action cannot be undone.
          </Typography>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    if (!actionModal.data) return "";

    switch (actionModal.data.type) {
      case "delete":
        return "Delete Event";
      default:
        return "";
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <ControlHeader
          title="Broadcast City Alerts "
          description="Emergencies, Events, News Alerts"
          buttonProps={{
            size: "small",
            variant: "primary",
            children: "Create New Alert",
            onClick: () =>
              actionModal.open({ type: "create", alert: {} as IAlert }),
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
          columns={ALERTS_TABLE_COLUMNS}
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

      <CreateAlertModal
        onSuccess={handleCreateEvent}
        isOpen={actionModal.isOpen && actionModal.data?.type === "create"}
        onClose={actionModal.close}
      />

      <ConfirmationModal
        title={getModalTitle()}
        isOpen={actionModal.isOpen && actionModal.data?.type === "delete"}
        isLoading={isActionLoading}
        onCancel={actionModal.close}
        onApprove={handleConfirmAction}
        centerContent={getModalContent()}
      />
    </>
  );
};

export default Alerts;
