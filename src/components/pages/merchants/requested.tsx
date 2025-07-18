"use client";

import React, { useState } from "react";
import { usePaginatedList, useModal } from "@/hooks";
import { IMerchantRequest, ActionType } from "@/types";
import { RequestStatusEnum, ActionEnum } from "@/enums";
import {
  Pagination,
  Table,
  Typography,
  LabeledTextArea,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { REQUEST_ACTIONS } from "@/constants/merchants.constants";
import { transformRequestsToTableData, handleError } from "@/utils";
import { REQUESTS_TABLE_COLUMNS, SORT_BY_OPTIONS } from "@/constants";
import { ControlHeader, ConfirmationModal } from "@/components/shared";
import { getAllRequests, acceptRequest, rejectRequest } from "@/requests";
import toast from "react-hot-toast";

const styles = {
  pageContainer: "h-full flex flex-col",
  modal: "w-[500px]",
  modalContent: "text-left flex flex-col gap-4",
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
    fetcher: ({ page, limit, search, sortBy }) =>
      getAllRequests({
        status: RequestStatusEnum.PENDING,
        page,
        limit,
        search,
        sortBy,
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ reason: string }>({
    defaultValues: { reason: "" },
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

  // for approve action
  const handleConfirmAction = async () => {
    if (!actionModal.data) return;
    try {
      setIsActionLoading(true);
      if (actionModal.data.type === "approve") {
        await acceptRequest(actionModal.data.request.id);
        toast.success("Request approved successfully");
        await refresh();
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsActionLoading(false);
      actionModal.close();
      reset();
    }
  };

  // for reject action
  const onSubmitReject = async (data: { reason: string }) => {
    if (!actionModal.data) return;
    try {
      await rejectRequest(actionModal.data.request.id, {
        reason: data.reason,
      });
      toast.success("Request rejected successfully");
      await refresh();
    } catch (error) {
      handleError(error);
    } finally {
      actionModal.close();
      reset();
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
          <div className={styles.modalContent}>
            <Typography level="p1">
              Are you sure you want to reject merchant request for{" "}
              <span className="font-bold">{request.name}</span> ({request.email}
              )?
            </Typography>

            <LabeledTextArea
              label="Reason for rejection"
              variant="secondary"
              {...register("reason", {
                required: "Reason is required",
                minLength: {
                  value: 8,
                  message: "Reason is too short",
                },
              })}
              error={errors.reason?.message}
              placeholder="Enter reason..."
            />
          </div>
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
          title="Merchant's Request"
          description="Approve/Reject Merchant Requests"
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
        className={actionModal.data?.type === "reject" ? styles.modal : ""}
        isOpen={actionModal.isOpen}
        isLoading={isActionLoading || isSubmitting}
        onCancel={() => {
          actionModal.close();
          reset();
        }}
        onApprove={
          actionModal.data?.type === "reject"
            ? handleSubmit(onSubmitReject)
            : handleConfirmAction
        }
        centerContent={getModalContent()}
        approveButtonText={
          actionModal.data?.type === "approve" ? "Approve" : "Reject"
        }
      />
    </React.Fragment>
  );
};

export default RequestedMerchants;
