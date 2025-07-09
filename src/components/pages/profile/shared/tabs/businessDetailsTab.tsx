import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/types";
import { RoleEnum } from "@/enums";
import { useStaticData } from "@/store";
import { createKeyLabelPair, handleError } from "@/utils";
import { BusinessAddressFormData, businessAddressSchema } from "@/schemas";
import {
  LabeledInput,
  Select,
  Button,
  Typography,
  AddressInput,
  Loader,
} from "@/components/ui";
import {
  cancelProfileUpdateRequest,
  getPendingProfileUpdateRequests,
  updateBusinessAddress,
} from "@/requests";
import { useModal } from "@/hooks/useModal";
import ConfirmationModal from "@/components/shared/modals/confirmationModal";
import { twMerge } from "tailwind-merge";

interface Props {
  userData: IUser | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const styles = {
  container: "flex flex-col gap-8",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
  buttonWrapper: "flex items-center mt-10",
  saveButton: "ml-auto",
  button: "min-w-[120px]",
  loaderContainer: "h-[200px] flex",
  loader: "m-auto stroke-primary",
  cancelButton:
    "text-primary underline cursor-pointer text-sm hover:opacity-80 duration-150 ease-in-out",
};

type ModalType = "save" | "cancel";

const BusinessDetailsTab = ({ userData, setIsLoading }: Props) => {
  const {
    control,
    watch,
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusinessAddressFormData>({
    resolver: zodResolver(businessAddressSchema),
    defaultValues: {
      businessName:
        userData?.role === RoleEnum.MERCHANT
          ? userData?.businessName || ""
          : "_", // to validate the form
      businessType:
        userData?.role === RoleEnum.MERCHANT
          ? userData?.businessType || ""
          : "_", // to validate the form
      city: userData?.city || "",
      state: userData?.state || "",
      address: userData?.address || "",
      latitude: userData?.latitude ?? 0,
      longitude: userData?.longitude ?? 0,
    },
  });

  const isMerchant = userData?.role === RoleEnum.MERCHANT;
  const actionModal = useModal<{ type: ModalType }>();
  const [isCancelling, setIsCancelling] = useState(false);
  const [hasPendingRequests, setHasPendingRequests] = useState(false);
  const [isLoadingPendingRequests, setIsLoadingPendingRequests] =
    useState(false);

  const { states, tags } = useStaticData();
  const selectedCity = watch("city");
  const selectedState = watch("state");
  const selectedAddress = watch("address");

  // for business type
  const businessTypeOptions = tags?.BUSINESS?.map(createKeyLabelPair);
  const stateOptions = states?.map(({ name }) => createKeyLabelPair(name));
  const cityOptions =
    states
      ?.find(({ name }) => name === selectedState)
      ?.cities.map(createKeyLabelPair) || [];

  // Reset city/address/lat/lng when state changes
  const resetAddressFields = () => {
    setValue("city", "");
    setValue("address", "");
    setValue("latitude", 0);
    setValue("longitude", 0);
  };

  const onSubmit = async (data: BusinessAddressFormData) => {
    try {
      setIsLoading(true);
      // For admin users, exclude business fields
      const requestData = {
        address: data.address,
        city: data.city,
        state: data.state,
        latitude: data.latitude,
        longitude: data.longitude,
        ...(userData?.role === RoleEnum.MERCHANT && {
          businessName: data.businessName,
          businessType: data.businessType,
        }),
      };

      const response = await updateBusinessAddress(requestData);
      toast.success(
        response?.data?.message ||
          (userData?.role === RoleEnum.MERCHANT
            ? "Business details updated successfully"
            : "Address updated successfully")
      );
      if (isMerchant) {
        setHasPendingRequests(true);
      }
      actionModal.close();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClick = () => {
    actionModal.open({ type: "save" });
  };

  const handleCancelClick = () => {
    actionModal.open({ type: "cancel" });
  };

  // Fetch pending profile update requests
  const fetchPendingRequests = async () => {
    try {
      setIsLoadingPendingRequests(true);
      const pendingRequests = await getPendingProfileUpdateRequests();
      setHasPendingRequests(pendingRequests.data.hasPendingRequests);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoadingPendingRequests(false);
    }
  };

  // Cancel pending profile update request
  const cancelPendingRequest = async () => {
    try {
      setIsCancelling(true);
      setIsLoading(true);
      await cancelProfileUpdateRequest();
      setHasPendingRequests(false);
      actionModal.close();
      toast.success("Request cancelled successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setIsCancelling(false);
      setIsLoading(false);
    }
  };

  const getModalContent = () => {
    if (!actionModal.data) return null;

    switch (actionModal.data.type) {
      case "save":
        return (
          <Typography level="p1">
            Are you sure you want to save the changes to your{" "}
            {userData?.role === RoleEnum.MERCHANT
              ? "business details"
              : "address"}
            ?
          </Typography>
        );
      case "cancel":
        return (
          <Typography level="p1">
            Are you sure you want to cancel your profile update request?
          </Typography>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    if (!actionModal.data) return "";

    switch (actionModal.data.type) {
      case "save":
        return "Save Changes Confirmation";
      case "cancel":
        return "Cancel Request Confirmation!";
      default:
        return "";
    }
  };

  const getModalApproveText = () => {
    if (!actionModal.data) return "";

    switch (actionModal.data.type) {
      case "save":
        return "Save Changes";
      case "cancel":
        return "Cancel Request";
      default:
        return "";
    }
  };

  const handleModalApprove = () => {
    if (!actionModal.data) return;

    switch (actionModal.data.type) {
      case "save":
        handleSubmit(onSubmit)();
        break;
      case "cancel":
        cancelPendingRequest();
        break;
    }
  };

  // Fetch pending profile update requests
  useEffect(() => {
    if (userData?.role === RoleEnum.MERCHANT) {
      fetchPendingRequests();
    }
  }, [userData]);

  // Set admin address fields
  useEffect(() => {
    if (userData?.role === RoleEnum.ADMIN) {
      setValue("city", userData?.city || "");
      setValue("state", userData?.state || "");
      setValue("address", userData?.address || "");
      setValue("latitude", userData?.latitude || 0);
      setValue("longitude", userData?.longitude || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div className={styles.container}>
      <div className="flex items-center gap-6">
        <Typography level="h2">Address</Typography>
        {hasPendingRequests && !isLoadingPendingRequests && (
          <Typography level="p1">(Approval pending from Admin side)</Typography>
        )}
      </div>

      {!isLoadingPendingRequests ? (
        <React.Fragment>
          <div className={styles.grid}>
            {userData?.role === RoleEnum.MERCHANT && (
              <>
                <LabeledInput
                  label="Business Name"
                  leftIcon="user"
                  variant="secondary"
                  placeholder="Enter your Business Name"
                  error={errors.businessName?.message}
                  {...register("businessName")}
                  disabled={isSubmitting || hasPendingRequests}
                />

                <Select
                  label="Business Type"
                  error={errors.businessType?.message}
                  control={control}
                  disabled={isSubmitting || hasPendingRequests}
                  name="businessType"
                  options={businessTypeOptions}
                  variant="secondary"
                  leftIcon="building"
                />
              </>
            )}

            <Select
              label="State"
              error={errors.state?.message}
              onChange={(value) => {
                setValue("state", value);
                resetAddressFields();
              }}
              control={control}
              name="state"
              disabled={isSubmitting || hasPendingRequests}
              options={stateOptions}
              variant="secondary"
              leftIcon="location"
            />

            <Select
              label="City"
              error={errors.city?.message}
              control={control}
              name="city"
              options={cityOptions}
              disabled={!selectedState || isSubmitting || hasPendingRequests}
              variant="secondary"
              leftIcon="location"
            />

            <AddressInput
              label="Address"
              placeholder="Enter your Address"
              variant="secondary"
              disabled={
                !selectedState ||
                !selectedCity ||
                isSubmitting ||
                hasPendingRequests
              }
              leftIcon="location"
              error={
                errors.address?.message ||
                ((errors.latitude?.message || errors.longitude?.message) &&
                  "Invalid address")
              }
              value={selectedAddress}
              onChange={(value) => setValue("address", value)}
              onPlaceSelect={(place) => {
                if (selectedState.toLowerCase() !== place.state.toLowerCase()) {
                  setError("address", {
                    message: "Your address is not in the selected state",
                  });
                  return;
                } else {
                  setError("address", { message: "" });
                }
                if (selectedCity.toLowerCase() !== place.city.toLowerCase()) {
                  setError("address", {
                    message: "Your address is not in the selected city",
                  });
                  return;
                } else {
                  setError("address", { message: "" });
                }
                setValue("address", place.address);
                setValue("latitude", place.latitude);
                setValue("longitude", place.longitude);
                setValue("state", place.state);
                setValue("city", place.city);
              }}
            />
          </div>

          <div className={styles.buttonWrapper}>
            {isMerchant && hasPendingRequests && (
              <button
                className={styles.cancelButton}
                onClick={handleCancelClick}
                type="button"
              >
                Cancel Request
              </button>
            )}
            <Button
              size="small"
              onClick={handleSaveClick}
              loading={isSubmitting}
              className={twMerge(styles.button, styles.saveButton)}
              disabled={hasPendingRequests}
            >
              Save Changes
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <div className={styles.loaderContainer}>
          <Loader className={styles.loader} />
        </div>
      )}

      <ConfirmationModal
        title={getModalTitle()}
        centerContent={getModalContent()}
        isOpen={actionModal.isOpen}
        isLoading={isSubmitting || isCancelling}
        onCancel={actionModal.close}
        onApprove={handleModalApprove}
        approveButtonText={getModalApproveText()}
      />
    </div>
  );
};

export default BusinessDetailsTab;
