import React from "react";
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
} from "@/components/ui";
import { updateBusinessAddress } from "@/requests";

interface Props {
  userData: IUser | null;
}

const styles = {
  container: "flex flex-col gap-8",
  grid: "grid grid-cols-3 gap-8",
  buttonWrapper: "flex justify-end mt-10",
  button: "min-w-[120px]",
};

const BusinessDetailsTab = ({ userData }: Props) => {
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
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={styles.container}>
      <Typography level="h2">Address</Typography>
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
              disabled={isSubmitting}
            />

            <Select
              label="Business Type"
              error={errors.businessType?.message}
              control={control}
              disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={!selectedState || isSubmitting}
          variant="secondary"
          leftIcon="location"
        />

        <AddressInput
          label="Address"
          placeholder="Enter your Address"
          variant="secondary"
          disabled={!selectedState || !selectedCity || isSubmitting}
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
        <Button
          size="small"
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
          className={styles.button}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default BusinessDetailsTab;
