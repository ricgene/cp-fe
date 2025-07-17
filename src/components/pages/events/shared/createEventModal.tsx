"use client";

import React from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createKeyLabelPair, handleError } from "@/utils";
import { ACCEPTED_IMAGE_TYPES } from "@/constants";
import AddressInput from "@/components/ui/addressInput";
import { createEvent, CreateEventRequest } from "@/requests";
import { EventCreateFormData, eventCreateSchema } from "@/schemas";
import { LabeledInput, LabeledTextArea, Modal, Select } from "@/components/ui";
import { useStaticData } from "@/store";

// Types
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const styles = {
  inputGrid: "grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6",
  inputSpan2: "sm:col-span-2",
};

const CreateEventModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const {
    reset,
    watch,
    trigger,
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EventCreateFormData>({
    resolver: zodResolver(eventCreateSchema),
  });

  const image = watch("image");
  const selectedAddress = watch("address");
  const endDate = watch("endDate");
  const startDate = watch("startDate");

  const { tags } = useStaticData();
  const eventTypeOptions = tags?.EVENT?.map(createKeyLabelPair);

  const handleClose = () => {
    reset();
    onClose();
  };

  const prepareFormData = (data: CreateEventRequest): FormData => {
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("image", data.image[0]);
    formData.append("address", data.address);
    formData.append("details", data.details);
    formData.append("endDate", data.endDate);
    formData.append("startDate", data.startDate);
    formData.append("latitude", data.latitude.toString());
    formData.append("longitude", data.longitude.toString());
    return formData;
  };

  const onSubmit = async (data: EventCreateFormData) => {
    try {
      const formData = prepareFormData(data);
      await createEvent(formData);
      onSuccess();
      toast.success("Event created successfully");
      handleClose();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Event"
      description="Add details about event"
      showSecondaryButton={false}
      onPrimaryClick={handleSubmit(onSubmit)}
      isPrimaryLoading={isSubmitting}
      primaryButtonText="Publish Event"
    >
      <div className={styles.inputGrid}>
        <LabeledInput
          label="Event Name"
          variant="secondary"
          placeholder="Enter event name"
          error={errors.name?.message?.toString()}
          {...register("name")}
        />

        <Select
          name="type"
          label="Event Type"
          variant="secondary"
          placeholder="Select Event Type"
          control={control}
          options={eventTypeOptions}
          error={errors.type?.message}
        />

        <LabeledInput
          type="datetime-local"
          variant="secondary"
          label="Start Date & Time"
          error={errors.startDate?.message?.toString()}
          {...register("startDate", {
            onChange: () => {
              if (endDate) {
                trigger(["startDate", "endDate"]);
              } else {
                trigger("startDate");
              }
            },
          })}
        />

        <LabeledInput
          type="datetime-local"
          variant="secondary"
          label="End Date & Time"
          error={errors.endDate?.message?.toString()}
          {...register("endDate", {
            onChange: () => {
              if (startDate) {
                trigger(["startDate", "endDate"]);
              } else {
                trigger("endDate");
              }
            },
          })}
        />

        <div className={styles.inputSpan2}>
          <AddressInput
            label="Street Address *"
            variant="secondary"
            placeholder="Enter your Street Address"
            wrapperClassName={styles.inputSpan2}
            error={
              errors.address?.message ||
              ((errors.latitude?.message ||
                errors.longitude?.message ||
                errors.city?.message ||
                errors.state?.message) &&
                "This address is not supported for this request.")
            }
            value={selectedAddress}
            onChange={(value) => setValue("address", value)}
            onPlaceSelect={(place) => {
              setValue("address", place.address);
              setValue("latitude", place.latitude);
              setValue("longitude", place.longitude);
              setValue("state", place.state);
              setValue("city", place.city);
              trigger(["address", "latitude", "longitude"]);
            }}
          />
        </div>

        <LabeledTextArea
          label="Event Details"
          variant="secondary"
          placeholder="Enter details"
          error={errors.details?.message?.toString()}
          wrapperClassName={styles.inputSpan2}
          {...register("details")}
        />

        <div className={styles.inputSpan2}>
          <LabeledInput
            label="Upload Venue Image"
            variant="secondary"
            type="file"
            multiple={false}
            selectedFile={image}
            accept={ACCEPTED_IMAGE_TYPES.join(", ")}
            error={errors.image?.message?.toString()}
            {...register("image", {
              required: "Image is required",
              validate: (value) =>
                value instanceof FileList && value.length > 0,
            })}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateEventModal;
