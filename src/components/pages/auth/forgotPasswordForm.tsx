"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/constants";
import { handleError } from "@/utils";
import { forgotPassword } from "@/requests/recovery.requests";
import { Button, LabeledInput, Typography } from "@/components/ui";
import AuthWrapper from "@/components/pages/auth/shared/authWrapper";
import EmailSentCard from "@/components/pages/auth/shared/emailSentCard";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/schemas";

const styles = {
  formBig: "md:w-[550px]",
  formSmall: "md:w-[400px]",
  forgotPasswordText: "text-primary mt-7 mb-6",
  button: "w-full mt-6",
  bottomLinkContainer: "flex items-center justify-center gap-2 mt-10",
  bottomText: "text-primary",
};

const ForgotPasswordForm = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword(data);
      toast.success(response.data.message || "Recovery link sent");
      setIsEmailSent(true);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthWrapper
      title={!isEmailSent ? "Forgot Password" : undefined}
      description={
        !isEmailSent
          ? "Enter your email, we’ll send a recovery link"
          : undefined
      }
      formClassName={isEmailSent ? styles.formSmall : styles.formBig}
    >
      {isEmailSent ? (
        <EmailSentCard
          type="forgotPassword"
          email={getValues("email")}
          setIsEmailSent={setIsEmailSent}
        />
      ) : (
        <React.Fragment>
          <LabeledInput
            label="Email"
            placeholder="email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />

          <Button
            variant="primary"
            loading={isSubmitting}
            className={styles.button}
            onClick={handleSubmit(onSubmit)}
          >
            Send Recovery Link
          </Button>

          <div className={styles.bottomLinkContainer}>
            <Link href={ROUTES.LOGIN.path}>
              <Typography level="p1" className={styles.bottomText} hoverable>
                Login
              </Typography>
            </Link>
          </div>
        </React.Fragment>
      )}
    </AuthWrapper>
  );
};

export default ForgotPasswordForm;
