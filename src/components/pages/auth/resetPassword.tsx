"use client";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleError } from "@/utils";
import { Button, LabeledInput } from "@/components/ui";
import { resetPassword } from "@/requests/recovery.requests";
import AuthWrapper from "@/components/pages/auth/shared/authWrapper";
import { ResetPasswordFormData, resetPasswordSchema } from "@/schemas";

const styles = {
  form: "md:w-[550px]",
  button: "w-full mt-10",
  inputGrid: "grid grid-cols-1 gap-4",
};

const ResetPasswordForm = () => {
  const router = useRouter();
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token || typeof token !== "string") {
      toast.error("Invalid token");
      return;
    }

    try {
      const response = await resetPassword({ password: data.password, token });
      toast.success(response.data.message || "Recovery link sent");
      router.push("/login");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthWrapper
      title="Reset Password"
      description="Set a new password to proceed"
      formClassName={styles.form}
    >
      <div className={styles.inputGrid}>
        <LabeledInput
          label="Enter new password"
          placeholder="Enter new password"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />

        <LabeledInput
          label="Confirm your new password"
          placeholder="Confirm your new password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
          })}
          error={errors.confirmPassword?.message}
        />
      </div>

      <Button
        variant="primary"
        loading={isSubmitting}
        className={styles.button}
        onClick={handleSubmit(onSubmit)}
      >
        Save Password
      </Button>
    </AuthWrapper>
  );
};

export default ResetPasswordForm;
