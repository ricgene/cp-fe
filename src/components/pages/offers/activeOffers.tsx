"use client";

import React, { useState } from "react";
import { useModal, usePaginatedList } from "@/hooks";
import { getAllOffers, changeOfferStatus } from "@/requests";
import { IOffer, ActionType } from "@/types";
import { ActionEnum, OfferStatusEnum } from "@/enums";
import { Table, Pagination, Typography } from "@/components/ui";
import { handleError, transformOffersToTableData } from "@/utils";
import { ControlHeader, ConfirmationModal } from "@/components/shared";
import {
  OFFER_ACTIONS,
  OFFER_TABLE_COLUMNS,
  SORT_BY_OPTIONS,
} from "@/constants";
import QRCodeModal from "@/components/pages/offers/shared/qrCodeModal";
import CreateEditOfferModal from "@/components/pages/offers/shared/createEditOfferModal";
import { toast } from "react-hot-toast";

interface Props {
  forAdmin?: boolean;
}

const styles = {
  pageContainer: "h-full flex flex-col",
};

type ModalType = "archive" | "create" | "qrCode";

const ActiveOffers = ({ forAdmin = false }: Props) => {
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
  } = usePaginatedList<IOffer>({
    fetcher: ({ page, limit, search, sortBy }) =>
      getAllOffers({
        status: OfferStatusEnum.ACTIVE,
        page,
        limit,
        search,
        sortBy,
      }).then((response) => ({
        data: response.data.offers,
        meta: response.data.meta,
      })),
  });

  const actionModal = useModal<{ type: ModalType; offer: IOffer }>();
  const tableData = transformOffersToTableData(filteredAndSorted);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleAction = (itemId: number, action: ActionType) => {
    const offer = filteredAndSorted.find((o) => o.id === itemId);
    if (!offer) return;

    switch (action) {
      case ActionEnum.ARCHIVE:
        actionModal.open({ type: "archive", offer });
        break;
      case ActionEnum.QR_CODE:
        actionModal.open({ type: "qrCode", offer });
        break;
    }
  };

  const handleCreateOffer = async () => {
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
      await changeOfferStatus(
        actionModal.data.offer.id,
        OfferStatusEnum.ARCHIVED
      );
      toast.success("Offer archived successfully");
      await refresh();
    } catch (error) {
      handleError(error);
    } finally {
      setIsActionLoading(false);
      actionModal.close();
    }
  };

  const getModalContent = () => {
    if (!actionModal.data?.offer) return null;

    switch (actionModal.data.type) {
      case "archive":
        return (
          <Typography level="p1">
            Are you sure you want to archive{" "}
            <span className="font-bold">{actionModal.data.offer.name}</span>?
            This action cannot be undone. Once archived, the offer will no
            longer be visible to users.
          </Typography>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    if (!actionModal.data) return "";

    switch (actionModal.data.type) {
      case "archive":
        return "Archive Offer";
      default:
        return "";
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <ControlHeader
          title={forAdmin ? "Offers" : "Active Offers"}
          description={
            forAdmin
              ? "List of Active offers among societies shared by merchant"
              : undefined
          }
          buttonProps={
            !forAdmin
              ? {
                  size: "small",
                  variant: "primary",
                  children: "Create New Offers",
                  onClick: () =>
                    actionModal.open({ type: "create", offer: {} as IOffer }),
                }
              : undefined
          }
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
          data={tableData}
          loading={isLoading}
          showActions={!forAdmin}
          onAction={handleAction}
          columns={OFFER_TABLE_COLUMNS}
          isEmpty={!isLoading && tableData.length === 0}
          actions={OFFER_ACTIONS[OfferStatusEnum.ACTIVE]}
        />

        <Pagination
          page={page}
          loading={isLoading}
          onPageChange={setPage}
          totalPages={meta.totalPages}
        />
      </div>

      <CreateEditOfferModal
        onSuccess={handleCreateOffer}
        isOpen={actionModal.isOpen && actionModal.data?.type === "create"}
        onClose={actionModal.close}
      />

      <QRCodeModal
        isOpen={actionModal.isOpen && actionModal.data?.type === "qrCode"}
        onClose={actionModal.close}
        offer={actionModal.data?.offer || ({} as IOffer)}
      />

      <ConfirmationModal
        title={getModalTitle()}
        isOpen={actionModal.isOpen && actionModal.data?.type === "archive"}
        isLoading={isActionLoading}
        onCancel={actionModal.close}
        onApprove={handleConfirmAction}
        centerContent={getModalContent()}
      />
    </>
  );
};

export default ActiveOffers;
