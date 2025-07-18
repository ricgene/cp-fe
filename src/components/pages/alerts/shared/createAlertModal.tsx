"use client";

import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleError } from "@/utils";
import { createAlert } from "@/requests/alerts.requests";
import {
  AlertCreateFormData,
  alertCreateSchema,
} from "@/schemas/alerts.schema";
import { LabeledInput, LabeledTextArea, Modal, Select } from "@/components/ui";
import { ALERT_AUDIENCE_OPTIONS, ALERT_TYPE_OPTIONS } from "@/constants";
import { useStaticData } from "@/store";
import { createKeyLabelPair } from "@/utils";

// Types
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const styles = {
  inputGrid: "grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6",
  inputSpan2: "sm:col-span-2",
  contentWrapper: "min-h-fit",
};

const CreateAlertModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const { states } = useStaticData();
  const {
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AlertCreateFormData>({
    resolver: zodResolver(alertCreateSchema),
  });

  const selectedState = watch("state");
  const selectedAudience = watch("audience");

  const stateOptions = states.map(({ name }) => createKeyLabelPair(name));
  const cityOptions =
    states
      .find(({ name }) => name === selectedState)
      ?.cities.map(createKeyLabelPair) || [];

  // Reset city when state changes
  useEffect(() => {
    setValue("city", "");
  }, [selectedState, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: AlertCreateFormData) => {
    try {
      await createAlert(data);
      onSuccess();
      toast.success("Alert created successfully");
      handleClose();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Broadcast City Alert"
      description="Share your emergency situations with citizens."
      showSecondaryButton={false}
      onPrimaryClick={handleSubmit(onSubmit)}
      isPrimaryLoading={isSubmitting}
      primaryButtonText="Publish Alert"
      contentWrapperClassName={styles.contentWrapper}
    >
      <div className={styles.inputGrid}>
        <LabeledInput
          label="Alert"
          variant="secondary"
          placeholder="Tag Line"
          error={errors.title?.message?.toString()}
          {...register("title")}
        />
        <Select
          name="type"
          label="Alert Type"
          variant="secondary"
          placeholder="Select Alert Type"
          control={control}
          options={ALERT_TYPE_OPTIONS}
          error={errors.type?.message}
        />
        <div className={styles.inputSpan2}>
          <Select
            name="audience"
            label="Audience"
            variant="secondary"
            placeholder="Select Audience"
            control={control}
            options={ALERT_AUDIENCE_OPTIONS}
            error={errors.audience?.message}
          />
        </div>
        {selectedAudience === "STATE" && (
          <div className={styles.inputSpan2}>
            <Select
              name="state"
              label="State"
              variant="secondary"
              placeholder="Select State"
              control={control}
              options={stateOptions}
              error={errors.state?.message}
            />
          </div>
        )}
        {selectedAudience === "CITY" && (
          <>
            <Select
              name="state"
              label="State"
              variant="secondary"
              placeholder="Select State"
              control={control}
              options={stateOptions}
              error={errors.state?.message}
            />
            <Select
              name="city"
              label="City"
              variant="secondary"
              placeholder="Select City"
              control={control}
              options={cityOptions}
              disabled={!selectedState}
              error={errors.city?.message}
            />
          </>
        )}
        <div className={styles.inputSpan2}>
          <LabeledTextArea
            label="Precautions"
            variant="secondary"
            placeholder="Precaution to avoid danger"
            error={errors.precautions?.message?.toString()}
            {...register("precautions")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateAlertModal;
