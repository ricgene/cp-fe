"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "@/requests";
import { ROUTES } from "@/constants";
import { useStaticData } from "@/store";
import { Select } from "@/components/ui";
import { createKeyLabelPair, handleError } from "@/utils";
import { RegisterFormData, registerSchema } from "@/schemas";
import {
  Button,
  LabeledInput,
  Typography,
  LabeledPhoneInput,
} from "@/components/ui";
import AddressInput from "@/components/ui/addressInput";
import AuthWrapper from "@/components/pages/auth/shared/authWrapper";
import EmailSentCard from "@/components/pages/auth/shared/emailSentCard";

const styles = {
  formBig: "md:w-[700px]",
  formSmall: "md:w-[400px]",
  inputGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  registerButton: "w-full mt-6",
  bottomLinkContainer: "flex items-center justify-center gap-2 mt-10",
  bottomText: "text-primary",
  col2Span: "md:col-span-2",
};

const RegisterForm = () => {
  const {
    register,
    getValues,
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [isEmailSent, setIsEmailSent] = useState(false);
  const { states, tags } = useStaticData();

  const selectedCity = watch("city");
  const selectedState = watch("state");
  const selectedAddress = watch("address");

  const businessTypeOptions = tags.BUSINESS.map(createKeyLabelPair);
  const stateOptions = states.map(({ name }) => createKeyLabelPair(name));
  const cityOptions =
    states
      .find(({ name }) => name === selectedState)
      ?.cities.map(createKeyLabelPair) || [];

  // Reset city when state changes
  useEffect(() => {
    setValue("city", "");
    setValue("address", "");
    setValue("latitude", 0);
    setValue("longitude", 0);
  }, [selectedState, setValue]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = data;
      await signup(rest);
      setIsEmailSent(true);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthWrapper
      title={!isEmailSent ? "Register" : undefined}
      formClassName={isEmailSent ? styles.formSmall : styles.formBig}
    >
      {isEmailSent ? (
        <EmailSentCard type="verification" email={getValues("email")} />
      ) : (
        <React.Fragment>
          <div className={styles.inputGrid}>
            <LabeledInput
              label="First Name *"
              placeholder="Enter your first Name"
              error={errors.firstName?.message}
              {...register("firstName", { required: "First Name is required" })}
            />

            <LabeledInput
              label="Last Name *"
              placeholder="Enter your last Name"
              error={errors.lastName?.message}
              {...register("lastName", { required: "Last Name is required" })}
            />

            <LabeledInput
              label="Email *"
              type="email"
              placeholder="Enter your Email"
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />

            <LabeledPhoneInput
              label="Phone Number *"
              error={
                errors.phone?.message ||
                ((errors.countryCode?.message || errors.callingCode?.message) &&
                  "Invalid phone number")
              }
              onChange={(value, data) => {
                const { dialCode, countryCode } = data;
                const formattedValue = value.replace(dialCode, "");
                const callingCode = dialCode.startsWith("+")
                  ? dialCode
                  : `+${dialCode}`;

                setValue("phone", formattedValue);
                setValue("callingCode", callingCode);
                setValue("countryCode", countryCode.toUpperCase());
              }}
            />

            <LabeledInput
              label="Business Name *"
              placeholder="Enter your Name"
              error={errors.businessName?.message}
              {...register("businessName", {
                required: "Business Name is required",
              })}
            />

            <Select
              label="Business Type *"
              error={errors.businessType?.message}
              control={control}
              name="businessType"
              options={businessTypeOptions}
            />

            <Select
              label="State *"
              error={errors.state?.message}
              control={control}
              name="state"
              options={stateOptions}
            />

            <Select
              label="City *"
              error={errors.city?.message}
              control={control}
              name="city"
              disabled={!selectedState}
              options={cityOptions}
            />

            <AddressInput
              label="Street Address *"
              placeholder="Enter your Street Address"
              wrapperClassName={styles.col2Span}
              disabled={!selectedState || !selectedCity}
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
                  setError("address", {
                    message: "",
                  });
                }

                if (selectedCity.toLowerCase() !== place.city.toLowerCase()) {
                  setError("address", {
                    message: "Your address is not in the selected city",
                  });
                  return;
                } else {
                  setError("address", {
                    message: "",
                  });
                }

                setValue("address", place.address);
                setValue("latitude", place.latitude);
                setValue("longitude", place.longitude);
                setValue("state", place.state);
                setValue("city", place.city);
              }}
            />

            <LabeledInput
              label="Password *"
              placeholder="Enter your Password"
              type="password"
              error={errors.password?.message}
              {...register("password", { required: "Password is required" })}
            />

            <LabeledInput
              label="Confirm Password *"
              placeholder="Confirm your Password"
              type="password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
          </div>

          <Button
            variant="primary"
            loading={isSubmitting}
            className={styles.registerButton}
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </Button>

          <div className={styles.bottomLinkContainer}>
            <Typography level="p1">Already have an account?</Typography>
            <Link href={ROUTES.LOGIN.path}>
              <Typography level="p1" className={styles.bottomText} hoverable>
                Log In
              </Typography>
            </Link>
          </div>
        </React.Fragment>
      )}
    </AuthWrapper>
  );
};

export default RegisterForm;
