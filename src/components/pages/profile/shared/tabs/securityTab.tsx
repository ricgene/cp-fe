import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SecurityFormData, securitySchema } from "@/schemas";
import { Button, LabeledInput, Typography } from "@/components/ui";
import { handleError } from "@/utils";
import { updatePassword } from "@/requests";
import { toast } from "react-hot-toast";

const styles = {
  container: "flex flex-col gap-8",
  grid: "grid grid-cols-3 gap-8",
  buttonWrapper: "flex justify-end mt-10",
};

const SecurityTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: SecurityFormData) => {
    try {
      const response = await updatePassword(data);
      toast.success(response?.data?.message || "Password updated successfully");
    } catch (error) {
      handleError(error);
    }
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
          error={errors.newPassword?.message}
          {...register("newPassword")}
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

export default SecurityTab;
