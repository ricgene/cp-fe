"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/requests";
import { RoleEnum } from "@/enums";
import { ROUTES } from "@/constants";
import { handleError } from "@/utils";
import { useUserData } from "@/store/userData.atom";
import { LoginFormData, loginSchema } from "@/schemas";
import { Button, LabeledInput, Typography } from "@/components/ui";
import AuthWrapper from "@/components/pages/auth/shared/authWrapper";
import EmailSentCard from "@/components/pages/auth/shared/emailSentCard";

const styles = {
  formBig: "md:w-[550px]",
  formSmall: "md:w-[400px]",
  forgotPasswordText: "text-primary mt-7 mb-6",
  button: "w-full",
  bottomLinkContainer: "flex items-center justify-center gap-2 mt-10",
  bottomText: "text-primary",
  inputGrid: "grid grid-cols-1 gap-4",
};

const LoginForm = () => {
  const router = useRouter();
  const { setUserData } = useUserData();
  const [isEmailUnverified, setIsEmailUnverified] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      const user = response.data.user;
      if (user.role === RoleEnum.MERCHANT && !user.isEmailVerified) {
        setIsEmailUnverified(true);
      } else {
        router.push(ROUTES.DASHBOARD.path);
        setUserData(user); // update user data in store
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthWrapper
      title={!isEmailUnverified ? "Login" : undefined}
      formClassName={isEmailUnverified ? styles.formSmall : styles.formBig}
    >
      {isEmailUnverified ? (
        <EmailSentCard type="verification" email={getValues("email")} />
      ) : (
        <React.Fragment>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputGrid}>
              <LabeledInput
                label="Email"
                placeholder="Enter your Email"
                {...register("email", { required: "Email is required" })}
                error={errors.email?.message}
              />

              <LabeledInput
                label="Password"
                placeholder="Enter your Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                error={errors.password?.message}
              />
            </div>

            <Link href={ROUTES.FORGOT_PASSWORD.path} prefetch={false}>
              <Typography
                level="p1"
                className={styles.forgotPasswordText}
                hoverable
              >
                Forgot Password?
              </Typography>
            </Link>

            <Button
              variant="primary"
              className={styles.button}
              type="submit"
              loading={isSubmitting}
            >
              Login
            </Button>
          </form>

          <div className={styles.bottomLinkContainer}>
            <Typography level="p1">Don’t have an account?</Typography>

            <Link href={ROUTES.REGISTER.path}>
              <Typography level="p1" className={styles.bottomText} hoverable>
                Sign Up
              </Typography>
            </Link>
          </div>
        </React.Fragment>
      )}
    </AuthWrapper>
  );
};

export default LoginForm;
