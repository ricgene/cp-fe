"use client";

import React, { useState } from "react";
import { IOffer, ActionType } from "@/types";
import { usePaginatedList, useModal } from "@/hooks";
import { ActionEnum, OfferStatusEnum } from "@/enums";
import { Table, Pagination, Typography } from "@/components/ui";
import { handleError, transformOffersToTableData } from "@/utils";
import { ControlHeader, ConfirmationModal } from "@/components/shared";
import { changeOfferStatus, publishOffer, getAllOffers } from "@/requests";
import {
  OFFER_ACTIONS,
  OFFER_TABLE_COLUMNS,
  SORT_BY_OPTIONS,
} from "@/constants";
import CreateEditOfferModal from "@/components/pages/offers/shared/createEditOfferModal";

const styles = {
  pageContainer: "h-full flex flex-col",
};

type ModalType = "archive" | "publish" | "create" | "edit";

const DraftOffers = () => {
  const {
    meta,
    page,
    sortBy,
    isLoading,
    filteredAndSorted,
    setPage,
    setSortBy,
    refresh,
    setSearchQuery,
  } = usePaginatedList<IOffer>({
    fetcher: ({ page, limit, search, sortBy }) =>
      getAllOffers({
        status: OfferStatusEnum.DRAFT,
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
  const [isActionLoading, setIsActionLoading] = useState(false);
  const tableData = transformOffersToTableData(filteredAndSorted);

  const handleAction = (itemId: number, action: ActionType) => {
    const offer = filteredAndSorted.find((o) => o.id === itemId);
    if (!offer) return;

    switch (action) {
      case ActionEnum.ARCHIVE:
        actionModal.open({ type: "archive", offer });
        break;
      case ActionEnum.PUBLISH:
        actionModal.open({ type: "publish", offer });
        break;
      case ActionEnum.EDIT:
        actionModal.open({ type: "edit", offer });
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

      switch (actionModal.data.type) {
        case "archive":
          await changeOfferStatus(
            actionModal.data.offer.id,
            OfferStatusEnum.ARCHIVED
          );
          break;
        case "publish":
          await publishOffer(actionModal.data.offer.id);
          break;
      }

      await refresh();
    } catch (error) {
      handleError(error);
    } finally {
      setIsActionLoading(false);
      actionModal.close();
    }
  };

  // Modal content
  const getModalContent = () => {
    if (!actionModal.data) return null;

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
      case "publish":
        return (
          <Typography level="p1">
            Are you sure you want to publish{" "}
            <span className="font-bold">{actionModal.data.offer.name}</span>?
            This will immediately make the offer live and available to all
            users. Once published, users can start availing this offer right
            away.
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
      case "publish":
        return "Publish Offer";
      default:
        return "";
    }
  };

  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <ControlHeader
          title="Draft Offers"
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
          actions={OFFER_ACTIONS[OfferStatusEnum.DRAFT]}
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
        isOpen={
          actionModal.isOpen &&
          ["create", "edit"].includes(actionModal.data?.type || "")
        }
        onClose={actionModal.close}
        offer={
          actionModal.data?.type === "edit" ? actionModal.data.offer : undefined
        }
      />

      <ConfirmationModal
        title={getModalTitle()}
        isOpen={
          actionModal.isOpen &&
          ["archive", "publish"].includes(actionModal.data?.type || "")
        }
        isLoading={isActionLoading}
        onCancel={actionModal.close}
        onApprove={handleConfirmAction}
        centerContent={getModalContent()}
      />
    </React.Fragment>
  );
};

export default DraftOffers;
