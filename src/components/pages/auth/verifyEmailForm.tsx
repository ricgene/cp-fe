"use client";

import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Icon from "@/Icons";
import { handleError } from "@/utils";
import { Loader, Typography } from "@/components/ui";
import { verifyEmailToken } from "@/requests/auth.requests";
import AuthWrapper from "@/components/pages/auth/shared/authWrapper";
import { PathsEnum } from "@/enums";

const styles = {
  form: "md:w-[450px] text-justify",
  logoIcon: "h-8 mb-7 mx-auto",
  flexContainer: "flex flex-col items-center justify-center gap-5 py-5",
  strokeParagraph: "stroke-paragraph",
  textParagraph: "text-paragraph mr-auto",
};

const VerifyEmailForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || typeof token !== "string") {
        setIsVerified(false);
        return;
      }
      try {
        setIsSubmitting(true);
        const response = await verifyEmailToken(token);
        const user = response.data.user;
        setUserName(`${user.firstName} ${user.lastName}`);
        toast.success(response.data.message || "Email verified successfully");
        setIsVerified(true);
      } catch (error) {
        handleError(error);
        setIsVerified(false);
      } finally {
        setIsSubmitting(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <AuthWrapper formClassName={styles.form}>
      {isSubmitting ? (
        <div className={styles.flexContainer}>
          <Typography level="p1">Verifying your email...</Typography>
          <Loader className={styles.strokeParagraph} />
        </div>
      ) : !isVerified ? (
        <div className={styles.flexContainer}>
          <Typography level="p1">Invalid or expired token</Typography>
        </div>
      ) : (
        <React.Fragment>
          <Icon
            name="logoWithGreenText"
            href={PathsEnum.LANDING}
            className={styles.logoIcon}
          />
          <Typography level="p1">
            Dear {userName},
            <br />
            <br />
            Thank you for verifying your email address and completing the first
            step in creating your account with us.
            <br />
            <br />
            We sincerely appreciate your interest in our platform and are
            pleased to inform you that your email has been successfully
            verified. Your account creation request is now under review by our
            administration team.
            <br />
            <br />
            You will receive a notification once your account has been approved
            and fully activated. This process typically takes up to 3 days, and
            we appreciate your patience during this time.
            <br />
            <br />
            Warm regards,
          </Typography>

          <Typography level="p1_bold" className={styles.textParagraph}>
            The CityPerks Team
          </Typography>
          <br />
          <br />
          <Typography level="p1">
            Message sent by Admin account of CityPerks
          </Typography>
        </React.Fragment>
      )}
    </AuthWrapper>
  );
};

export default VerifyEmailForm;
