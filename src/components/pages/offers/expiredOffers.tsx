"use client";

import React, { useState } from "react";
import { deleteOffer } from "@/requests";
import { useOffers, useModal } from "@/hooks";
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

const styles = {
  pageContainer: "h-full flex flex-col",
};

const ExpiredOffers = () => {
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
  } = useOffers({ status: OfferStatusEnum.EXPIRED });

  const deleteModal = useModal<IOffer>();
  const [isActionLoading, setIsActionLoading] = useState(false);
  const tableData = transformOffersToTableData(filteredAndSortedOffers);

  const handleAction = (itemId: number, action: OfferActionType) => {
    const offer = filteredAndSortedOffers.find((o) => o.id === itemId);
    if (!offer) return;

    switch (action) {
      case OfferActionEnum.DELETE:
        deleteModal.open(offer);
        break;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.data) return;

    try {
      setIsActionLoading(true);
      await deleteOffer(deleteModal.data.id);
      await refreshOffers();
    } catch (error) {
      handleError(error);
    } finally {
      setIsActionLoading(false);
      deleteModal.close();
    }
  };

  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <ControlHeader
          title="Expired Offers"
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
          actions={OFFER_ACTIONS[OfferStatusEnum.EXPIRED]}
        />

        <Pagination
          page={page}
          loading={isLoading}
          onPageChange={setPage}
          totalPages={meta.totalPages}
        />
      </div>

      <ConfirmationModal
        title="Delete Offer"
        isOpen={deleteModal.isOpen}
        isLoading={isActionLoading}
        onCancel={deleteModal.close}
        onApprove={handleDeleteConfirm}
        centerContent={
          <Typography level="p1">
            Are you sure you want to delete{" "}
            <span className="font-bold">{deleteModal.data?.name}</span>? This
            action cannot be undone. Once deleted, the offer will be permanently
            removed.
          </Typography>
        }
      />
    </React.Fragment>
  );
};

export default ExpiredOffers;
