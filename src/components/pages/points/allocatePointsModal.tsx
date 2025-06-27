"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  LabeledInput,
  LabeledTextArea,
  Typography,
} from "@/components/ui";
import { twMerge } from "tailwind-merge";
import { handleError } from "@/utils";
import { PointsAllocationFormData, pointsAllocationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AllotmentPointTransactionTypeEnum } from "@/enums";
import { allocatePoints } from "@/requests/points-transactions.requests";
import { toast } from "react-hot-toast";

interface Props {
  isOpen: boolean;
  totalUsers: number;
  isSelectedAll: boolean;
  selectedValues: string[];
  selectedUsers: { name: string; publicId: string }[];
  onClose: () => void;
  onSuccess?: (data: { points: number; reason: string }) => void;
}

const styles = {
  avatarList: "flex items-center gap-2",
  avatar:
    "w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm border-[0.5px] border-stroke",
  avatarColors: [
    "bg-element text-primary z-[5]",
    "bg-[#4FB27F] text-white -ml-4 z-[4]",
    "bg-unactive text-white -ml-4 z-[3]",
    "bg-element text-primary -ml-4 z-[2]",
  ],
  more: "[background:var(--gradient-avatar)] -ml-4",
  selectedText: "ml-1 text-primary",
};

const AllocatePointsModal = ({
  isOpen,
  totalUsers,
  isSelectedAll,
  selectedUsers,
  selectedValues,
  onClose,
  onSuccess,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PointsAllocationFormData>({
    resolver: zodResolver(pointsAllocationSchema),
    defaultValues: { points: 0, reason: "" },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: PointsAllocationFormData) => {
    try {
      const allotmentData = {
        points: data.points,
        reason: data.reason,
        publicIds: selectedValues,
        type: isSelectedAll
          ? AllotmentPointTransactionTypeEnum.ALL
          : AllotmentPointTransactionTypeEnum.SELECTED,
      };
      const response = await allocatePoints(allotmentData);
      toast.success(response.data.message || "Points allocated successfully");
      handleClose();
      onSuccess?.(data);
    } catch (error) {
      handleError(error);
    }
  };

  // Show up to 4 avatars, then +N more
  const maxAvatars = 4;
  const avatars = selectedUsers.slice(0, maxAvatars);
  const moreCount = selectedUsers.length - maxAvatars;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Allocate Points to User"
      description="Allocate points to users as a reward of good deed"
      showSecondaryButton={false}
      onPrimaryClick={handleSubmit(onSubmit)}
      isPrimaryLoading={isSubmitting}
      primaryButtonText="Send Points"
      cancelButtonText="Cancel"
      contentWrapperClassName="min-h-fit"
    >
      <div className="flex flex-col gap-4">
        <div className={styles.avatarList}>
          {!isSelectedAll &&
            avatars.map((user, index) => (
              <div
                key={user.publicId + index}
                className={twMerge(styles.avatar, styles.avatarColors[index])}
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            ))}

          {!isSelectedAll && moreCount > 0 && (
            <div className={twMerge(styles.avatar, styles.more)}>
              +{moreCount}
            </div>
          )}

          <Typography level="p1" className={styles.selectedText}>
            {isSelectedAll ? `All ${totalUsers} Users Selected` : "Selected"}
          </Typography>
        </div>

        <LabeledInput
          label="Points Rewarded"
          variant="secondary"
          placeholder="Enter Points"
          type="number"
          min={1}
          error={errors.points?.message}
          {...register("points")}
        />

        <LabeledTextArea
          label="Reason of Reward"
          variant="secondary"
          placeholder="Enter details that why the person is rewarded points..."
          error={errors.reason?.message}
          {...register("reason")}
        />
      </div>
    </Modal>
  );
};

export default AllocatePointsModal;
