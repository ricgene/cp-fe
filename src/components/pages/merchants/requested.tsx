"use client";

import React, { useState } from "react";
import { usePaginatedList, useModal } from "@/hooks";
import { IMerchantRequest, ActionType } from "@/types";
import { RequestStatusEnum, ActionEnum } from "@/enums";
import {
  getAllRequests,
  acceptRequest,
  rejectRequest,
} from "@/requests/merchant.requests";
import { Pagination, Table, Typography } from "@/components/ui";
import { REQUEST_ACTIONS } from "@/constants/merchants.constants";
import { transformRequestsToTableData, handleError } from "@/utils";
import { REQUESTS_TABLE_COLUMNS, SORT_BY_OPTIONS } from "@/constants";
import { ControlHeader, ConfirmationModal } from "@/components/shared";

const styles = {
  pageContainer: "h-full flex flex-col",
};

type ModalType = "approve" | "reject";

const RequestedMerchants = () => {
  const {
    meta,
    page,
    sortBy,
    isLoading,
    filteredAndSorted,
    setPage,
    setSortBy,
    setSearchQuery,
    refresh,
  } = usePaginatedList<IMerchantRequest>({
    fetcher: ({ page, limit, search }) =>
      getAllRequests({
        status: RequestStatusEnum.PENDING,
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

  const actionModal = useModal<{
    type: ModalType;
    request: IMerchantRequest;
  }>();
  const [isActionLoading, setIsActionLoading] = useState(false);
  const tableData = transformRequestsToTableData(filteredAndSorted);

  const handleAction = (itemId: number, action: ActionType) => {
    const request = filteredAndSorted.find((r) => r.id === itemId);
    if (!request) return;
    if (action === ActionEnum.APPROVE) {
      actionModal.open({ type: "approve", request });
    } else if (action === ActionEnum.REJECT) {
      actionModal.open({ type: "reject", request });
    }
  };

  const handleConfirmAction = async () => {
    if (!actionModal.data) return;
    try {
      setIsActionLoading(true);
      if (actionModal.data.type === "approve") {
        await acceptRequest(actionModal.data.request.id);
      } else if (actionModal.data.type === "reject") {
        await rejectRequest(actionModal.data.request.id);
      }
      await refresh();
    } catch (error) {
      handleError(error);
    } finally {
      setIsActionLoading(false);
      actionModal.close();
    }
  };

  const getModalContent = () => {
    if (!actionModal.data) return null;
    const { request } = actionModal.data;
    switch (actionModal.data.type) {
      case "approve":
        return (
          <Typography level="p1">
            Are you sure you want to <span className="font-bold">approve</span>{" "}
            merchant <span className="font-bold">{request.name}</span> (
            {request.email})?
          </Typography>
        );
      case "reject":
        return (
          <Typography level="p1">
            Are you sure you want to <span className="font-bold">reject</span>{" "}
            merchant <span className="font-bold">{request.name}</span> (
            {request.email})?
          </Typography>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    if (!actionModal.data) return "";
    switch (actionModal.data.type) {
      case "approve":
        return "Approve Merchant Request";
      case "reject":
        return "Reject Merchant Request";
      default:
        return "";
    }
  };

  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <ControlHeader
          title="Requested Merchants"
          description="Approve or Reject Merchant Requests"
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
          showActions
          loading={isLoading}
          onAction={handleAction}
          columns={REQUESTS_TABLE_COLUMNS}
          isEmpty={!isLoading && tableData.length === 0}
          actions={REQUEST_ACTIONS}
        />

        <Pagination
          page={page}
          loading={isLoading}
          onPageChange={setPage}
          totalPages={meta.totalPages}
        />
      </div>

      <ConfirmationModal
        title={getModalTitle()}
        isOpen={actionModal.isOpen}
        isLoading={isActionLoading}
        onCancel={actionModal.close}
        onApprove={handleConfirmAction}
        centerContent={getModalContent()}
        approveButtonText={
          actionModal.data?.type === "approve" ? "Approve" : "Reject"
        }
      />
    </React.Fragment>
  );
};

export default RequestedMerchants;
