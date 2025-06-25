import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/types";
import { RoleEnum } from "@/enums";
import { useStaticData } from "@/store";
import { Select } from "@/components/ui";
import { AddressInput } from "@/components/ui";
import { createKeyLabelPair } from "@/utils";
import { Button, Typography } from "@/components/ui";
import { BusinessAddressFormData, businessAddressSchema } from "@/schemas";

interface Props {
  userData: IUser | null;
}

const styles = {
  container: "flex flex-col gap-8",
  grid: "grid grid-cols-3 gap-8",
  buttonWrapper: "flex justify-end mt-10",
  col2Span: "col-span-2",
};

const BusinessDetailsTab = ({ userData }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BusinessAddressFormData>({
    resolver: zodResolver(businessAddressSchema),
    defaultValues: {
      address: userData?.address || "",
      businessName: userData?.businessName || "",
      businessType: userData?.businessType || "",
      city: userData?.city || "",
      state: userData?.state || "",
      latitude: userData?.latitude ?? 0,
      longitude: userData?.longitude ?? 0,
    },
  });

  const { states, tags } = useStaticData();
  const selectedCity = watch("city");
  const selectedState = watch("state");
  const selectedAddress = watch("address");

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

  const onSubmit = (data: BusinessAddressFormData) => {
    // TODO: handle save changes
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Typography level="h2">Address</Typography>
      <div className={styles.grid}>
        {userData?.role === RoleEnum.MERCHANT && (
          <>
            <Select
              label="Business Type"
              error={errors.businessType?.message}
              control={control}
              name="businessType"
              options={businessTypeOptions}
              variant="secondary"
              leftIcon="building"
            />

            <Select
              label="Business Name"
              error={errors.businessName?.message}
              control={control}
              name="businessName"
              options={[]}
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
          disabled={!selectedState}
          variant="secondary"
          leftIcon="location"
        />

        <AddressInput
          label="Address"
          placeholder="Enter your Address"
          variant="secondary"
          disabled={!selectedState || !selectedCity}
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
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default BusinessDetailsTab;
