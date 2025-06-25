"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStaticData } from "@/store";
import { OfferStatusEnum } from "@/enums";
import { IOffer, OfferStatusType } from "@/types";
import { createKeyLabelPair, handleError } from "@/utils";
import { createOffer, updateOffer } from "@/requests/offers.requests";
import type { CreateOfferRequest } from "@/requests/offers.requests";
import { ACCEPTED_IMAGE_TYPES } from "@/constants";
import {
  OfferCreateFormData,
  offerCreateSchema,
  OfferUpdateFormData,
  offerUpdateSchema,
} from "@/schemas";
import {
  Select,
  Modal,
  LabeledInput,
  Switch,
  Typography,
  LabeledTextArea,
} from "@/components/ui";

interface Props {
  offer?: IOffer;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (response: AxiosResponse) => void;
}

const styles = {
  inputGrid: "grid grid-cols-2 gap-5 mt-6",
  inputSpan2: "col-span-2",
  imageContainer: "relative w-1/2 aspect-video rounded-md overflow-hidden",
  image: "object-cover",
  changeImageText:
    "text-primary underline cursor-pointer hover:text-primary/80",
  uploadImageContainer: "col-span-2",
};

const CreateEditOfferModal = ({ isOpen, onClose, onSuccess, offer }: Props) => {
  const isEdit = !!offer;
  const [isSave, setIsSave] = useState(false);
  const [showOldImage, setShowOldImage] = useState(false);
  const { tags } = useStaticData();

  const {
    control,
    watch,
    reset,
    setValue,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OfferCreateFormData | OfferUpdateFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(isEdit ? offerUpdateSchema : offerCreateSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    },
  });
  const image = watch("image");
  const isPerk = watch("isPerk");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Dropdown options
  const offerTypeOptions = tags?.OFFER?.map(createKeyLabelPair);
  const productCategoryOptions = tags?.PRODUCT?.map(createKeyLabelPair);

  // Set form values for edit
  useEffect(() => {
    if (isEdit) {
      setShowOldImage(true);
      setValue("name", offer.name);
      setValue("isPerk", offer.isPerk);
      setValue("offerType", offer.offerType);
      setValue("description", offer.description);
      setValue("productName", offer.productName);
      setValue("discountRate", offer.discountRate);
      setValue("startDate", offer.startDate.split("T")[0]);
      setValue("endDate", offer.endDate.split("T")[0]);
      setValue("productCategory", offer.productCategory);
      setValue("pointsPerPurchase", offer.pointsPerPurchase);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  // Helper Functions
  const handleCloseModal = () => {
    onClose();
    reset();
  };

  const handleUseOldImage = () => {
    setValue("image", undefined);
    setShowOldImage(true);
  };

  const prepareFormData = (data: Partial<CreateOfferRequest>): FormData => {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.status) formData.append("status", data.status);
    if (data.image?.[0]) formData.append("image", data.image[0]);
    if (data.offerType) formData.append("offerType", data.offerType);
    if (data.productName) formData.append("productName", data.productName);
    if (data.description) formData.append("description", data.description);
    if (data.productCategory)
      formData.append("productCategory", data.productCategory);
    if (typeof data.isPerk === "boolean")
      formData.append("isPerk", data.isPerk.toString());
    if (data.endDate) {
      formData.append("endDate", data.endDate);
    }
    if (data.startDate) {
      formData.append("startDate", data.startDate);
    }
    if (typeof data.discountRate === "number")
      formData.append("discountRate", data.discountRate.toString());
    if (typeof data.pointsPerPurchase === "number")
      formData.append("pointsPerPurchase", data.pointsPerPurchase.toString());

    return formData;
  };

  const handleSubmitSuccess = (response: AxiosResponse) => {
    toast.success(response?.data?.message);
    handleCloseModal();
    onSuccess?.(response);
  };

  // Submit Functions
  const onSubmitCreate = async (
    data: OfferCreateFormData,
    status: OfferStatusType
  ) => {
    const isDraft = status === "DRAFT";
    setIsSave(isDraft);

    try {
      const formData = prepareFormData({ ...data, status });
      const response = await createOffer(formData);
      handleSubmitSuccess(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSave(false);
    }
  };

  const onSubmitUpdate = async (data: OfferUpdateFormData) => {
    try {
      if (!offer) {
        throw new Error("Offer ID is required");
      }

      // For update, we need to include all required fields
      const updateData: Partial<CreateOfferRequest> = {
        name: data.name || offer.name,
        productName: data.productName || offer.productName,
        description: data.description || offer.description,
        productCategory: data.productCategory || offer.productCategory,
        startDate: data.startDate || offer.startDate,
        endDate: data.endDate || offer.endDate,
        isPerk: data.isPerk || offer.isPerk,
        offerType: data.offerType || offer.offerType,
        discountRate: data.discountRate || offer.discountRate,
        pointsPerPurchase: data.pointsPerPurchase || offer.pointsPerPurchase,
      };

      // Only include image if a new one is provided
      if (data.image) {
        updateData.image = data.image;
      }

      const formData = prepareFormData(updateData);
      const response = await updateOffer(offer.id, formData);
      handleSubmitSuccess(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSave(false);
    }
  };

  // Submit Handler
  const onSubmit = async (
    data: OfferCreateFormData | OfferUpdateFormData,
    status: OfferStatusType = OfferStatusEnum.ACTIVE
  ) => {
    // Check if start date is in the future
    if (startDate && new Date(startDate).getDate() < new Date().getDate()) {
      setError("startDate", { message: "Start date must be in the future" });
      return;
    }

    // Check if start date is before end date
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setError("startDate", { message: "Start date must be before end date" });
      setError("endDate", { message: "End date must be after start date" });
      return;
    }

    // Check if image is required for create
    if (!isEdit && !data.image) {
      setError("image", { message: "Image is required" });
      return;
    }

    // Check if image is required for edit
    if (isEdit && !data.image && !showOldImage) {
      setError("image", { message: "Image is required" });
      return;
    }

    if (isEdit) {
      await onSubmitUpdate(data as OfferUpdateFormData);
    } else {
      await onSubmitCreate(data as OfferCreateFormData, status);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title={isEdit ? "Edit Offer" : "Create New Offer"}
      description={
        isEdit
          ? "Edit your offer details."
          : "Manage your currently active promotional offers."
      }
      showPrimaryButton={!isEdit}
      primaryButtonText="Publish Offer"
      secondaryButtonText="Save Offer"
      onPrimaryClick={handleSubmit((data) =>
        onSubmit(data, OfferStatusEnum.ACTIVE)
      )}
      onSecondaryClick={handleSubmit((data) =>
        onSubmit(data, OfferStatusEnum.DRAFT)
      )}
      isPrimaryLoading={isSubmitting && !isSave}
      isSecondaryLoading={isSubmitting && (isEdit || isSave)}
    >
      <Switch
        name="isPerk"
        labelLeft="Offer"
        labelRight="Perk"
        control={control}
        error={errors.isPerk?.message}
      />

      <div className={styles.inputGrid}>
        <LabeledInput
          label="Offer Name"
          variant="secondary"
          placeholder="Name of offer"
          error={errors.name?.message}
          wrapperClassName={twMerge(!isPerk && styles.inputSpan2)}
          {...register("name")}
        />

        <LabeledInput
          label="Product Name"
          variant="secondary"
          placeholder="Enter product name"
          error={errors.productName?.message}
          {...register("productName")}
        />

        <Select
          name="productCategory"
          label="Product Category"
          variant="secondary"
          placeholder="Select Category"
          control={control}
          options={productCategoryOptions}
          error={errors.productCategory?.message}
        />

        <Select
          name="offerType"
          label="Type"
          variant="secondary"
          placeholder="Select Offer Type"
          control={control}
          options={offerTypeOptions}
          error={errors.offerType?.message}
        />

        {isPerk && (
          <LabeledInput
            type="number"
            label="Points Per Purchase"
            variant="secondary"
            placeholder="200 points"
            defaultValue={0}
            error={errors.pointsPerPurchase?.message}
            {...register("pointsPerPurchase", { valueAsNumber: true })}
          />
        )}

        <LabeledInput
          type="number"
          label="Discount Rate (%)"
          variant="secondary"
          placeholder="Rate"
          defaultValue={0}
          error={errors.discountRate?.message}
          {...register("discountRate", { valueAsNumber: true })}
        />

        <LabeledInput
          type="date"
          label="Offer Start Date"
          variant="secondary"
          placeholder="Select Date"
          error={errors.startDate?.message}
          {...register("startDate")}
        />

        <LabeledInput
          type="date"
          label="Offer End Date"
          variant="secondary"
          placeholder="Select Date"
          error={errors.endDate?.message}
          {...register("endDate")}
        />

        <LabeledTextArea
          label="Description"
          variant="secondary"
          placeholder="Enter details..."
          error={errors.description?.message}
          wrapperClassName={styles.inputSpan2}
          {...register("description")}
        />

        {showOldImage ? (
          <div className="">
            <div className={styles.imageContainer}>
              <Image
                src={offer?.image?.url || "/Avatar.png"}
                alt="Offer Image"
                fill
                className={styles.image}
              />
            </div>
            <button onClick={() => setShowOldImage(false)}>
              <Typography
                level="p1"
                className={styles.changeImageText}
                hoverable
              >
                Change Image
              </Typography>
            </button>
          </div>
        ) : (
          <div className={styles.uploadImageContainer}>
            <LabeledInput
              type="file"
              label="Upload Image"
              variant="secondary"
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
            {isEdit && offer?.image?.url && (
              <button onClick={handleUseOldImage}>
                <Typography
                  level="p1"
                  className={styles.changeImageText}
                  hoverable
                >
                  Use Old Image
                </Typography>
              </button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreateEditOfferModal;
