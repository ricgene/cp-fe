import React from "react";
import { IUser } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SecurityFormData, securitySchema } from "@/schemas";
import { Button, LabeledInput, Typography } from "@/components/ui";

const styles = {
  container: "flex flex-col gap-8",
  grid: "grid grid-cols-3 gap-8",
  buttonWrapper: "flex justify-end mt-10",
};

interface Props {
  userData: IUser | null;
}

const SecurityTab = ({ userData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
  });

  const onSubmit = (data: SecurityFormData) => {
    // TODO: handle save changes
    console.log(data);
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
        />

        <LabeledInput
          label="New Password"
          variant="secondary"
          type="password"
          placeholder="Enter new Password"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        <LabeledInput
          label="Confirm New Password"
          variant="secondary"
          type="password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
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
