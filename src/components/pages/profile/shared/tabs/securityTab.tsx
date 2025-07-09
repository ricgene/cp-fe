import React, { Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleError } from "@/utils";
import { updatePassword } from "@/requests";
import { SecurityFormData, securitySchema } from "@/schemas";
import { Button, LabeledInput, Typography } from "@/components/ui";
import { useModal } from "@/hooks/useModal";
import ConfirmationModal from "@/components/shared/modals/confirmationModal";

interface Props {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const styles = {
  container: "flex flex-col gap-8",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
  buttonWrapper: "flex justify-end mt-10",
};

const SecurityTab = ({ setIsLoading }: Props) => {
  const saveModal = useModal();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: SecurityFormData) => {
    try {
      setIsLoading(true);
      const response = await updatePassword({
        oldPassword: data.oldPassword,
        password: data.password,
      });
      reset();
      toast.success(response?.data?.message || "Password updated successfully");
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
      <Typography level="h2">Change Password</Typography>

      <div className={styles.grid}>
        <LabeledInput
          label="Old Password"
          variant="secondary"
          type="password"
          placeholder="Enter your old password"
          error={errors.oldPassword?.message}
          {...register("oldPassword")}
          leftIcon="lock"
        />

        <LabeledInput
          label="New Password"
          variant="secondary"
          type="password"
          placeholder="Enter new Password"
          error={errors.password?.message}
          {...register("password")}
          leftIcon="lock"
        />

        <LabeledInput
          label="Confirm New Password"
          variant="secondary"
          type="password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          leftIcon="lock"
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button size="small" onClick={handleSaveClick} loading={isSubmitting}>
          Save Changes
        </Button>
      </div>

      <ConfirmationModal
        title="Save Changes Confirmation"
        centerContent={
          <Typography level="p1">
            Are you sure you want to save the changes to your password?
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

export default SecurityTab;
