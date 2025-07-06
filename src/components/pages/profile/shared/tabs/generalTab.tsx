import React, { Dispatch, SetStateAction } from "react";
import { IUser } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneralFormData, generalSchema } from "@/schemas";
import {
  Button,
  LabeledInput,
  Typography,
  LabeledPhoneInput,
} from "@/components/ui";
import { updateProfile } from "@/requests";
import { handleError } from "@/utils";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/useModal";
import ConfirmationModal from "@/components/shared/modals/confirmationModal";

interface Props {
  userData: IUser | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const styles = {
  container: "flex flex-col gap-8",
  grid: "grid grid-cols-3 gap-8",
  buttonWrapper: "flex justify-end mt-10",
  button: "min-w-[120px]",
};

const GeneralTab = ({ userData, setIsLoading }: Props) => {
  const saveModal = useModal();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GeneralFormData>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phone: userData?.phone,
      countryCode: userData?.countryCode,
      callingCode: userData?.callingCode,
    },
  });

  const onSubmit = async (data: GeneralFormData) => {
    try {
      setIsLoading(true);
      const response = await updateProfile(data);
      toast.success(response?.data?.message || "Profile updated successfully");
      saveModal.close();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClick = () => {
    saveModal.open();
  };

  return (
    <div className={styles.container}>
      <Typography level="h2">Profile</Typography>

      <div className={styles.grid}>
        <LabeledInput
          label="First Name"
          leftIcon="user"
          variant="secondary"
          placeholder="Enter your First Name"
          disabled={isSubmitting}
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <LabeledInput
          label="Last Name"
          leftIcon="user"
          variant="secondary"
          placeholder="Enter your Last Name"
          disabled={isSubmitting}
          error={errors.lastName?.message}
          {...register("lastName")}
        />

        <LabeledPhoneInput
          label="Phone Number"
          variant="secondary"
          disabled={isSubmitting}
          error={
            errors.phone?.message ||
            ((errors.countryCode?.message || errors.callingCode?.message) &&
              "Invalid phone number")
          }
          value={`${userData?.callingCode || ""}${userData?.phone || ""}`}
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
          label="Email"
          leftIcon="mail"
          variant="secondary"
          value={userData?.email}
          disabled
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          size="small"
          onClick={handleSaveClick}
          loading={isSubmitting}
          className={styles.button}
        >
          Save Changes
        </Button>
      </div>

      <ConfirmationModal
        title="Save Changes Confirmation"
        centerContent={
          <Typography level="p1">
            Are you sure you want to save the changes to your profile?
          </Typography>
        }
        isOpen={saveModal.isOpen}
        isLoading={isSubmitting}
        onCancel={saveModal.close}
        onApprove={handleSubmit(onSubmit)}
        approveButtonText="Save Changes"
      />
    </div>
  );
};

export default GeneralTab;
