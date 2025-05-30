"use client";

import React, { useState } from "react";
import { useOffers, useModal } from "@/hooks";
import { changeOfferStatus } from "@/requests";
import { IOffer, OfferActionType } from "@/types";
import { OfferActionEnum, OfferStatusEnum } from "@/enums";
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

const styles = {
  pageContainer: "h-full flex flex-col",
};

type ModalType = "archive" | "create" | "qrCode";

const ActiveOffers = () => {
  const {
    meta,
    page,
    sortBy,
    isLoading,
    filteredAndSortedOffers,
    setPage,
    setSortBy,
    refreshOffers,
    setSearchQuery,
  } = useOffers({ status: OfferStatusEnum.ACTIVE });

  const actionModal = useModal<{ type: ModalType; offer: IOffer }>();
  const [isActionLoading, setIsActionLoading] = useState(false);
  const tableData = transformOffersToTableData(filteredAndSortedOffers);

  const handleAction = (itemId: number, action: OfferActionType) => {
    const offer = filteredAndSortedOffers.find((o) => o.id === itemId);
    if (!offer) return;

    switch (action) {
      case OfferActionEnum.ARCHIVE:
        actionModal.open({ type: "archive", offer });
        break;
      case OfferActionEnum.QR_CODE:
        actionModal.open({ type: "qrCode", offer });
        break;
    }
  };

  const handleCreateOffer = async () => {
    try {
      await refreshOffers();
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
      await refreshOffers();
    } catch (error) {
      handleError(error);
    } finally {
      setIsActionLoading(false);
      actionModal.close();
    }
  };

  // Modal content
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
    <React.Fragment>
      <div className={styles.pageContainer}>
        <ControlHeader
          title="Active Offers"
          buttonProps={{
            size: "small",
            variant: "primary",
            children: "Create New offers",
            onClick: () =>
              actionModal.open({ type: "create", offer: {} as IOffer }),
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
    </React.Fragment>
  );
};

export default ActiveOffers;
