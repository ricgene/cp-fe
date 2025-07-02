import Link from "next/link";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "@/Icons";
import { PathsEnum } from "@/enums";
import { ROUTES } from "@/constants";
import { handleError } from "@/utils";
import { Typography } from "@/components/ui";
import { resendVerificationEmail } from "@/requests";

interface Props {
  type: "verification" | "forgotPassword";
  email: string;
  setIsEmailSent?: React.Dispatch<React.SetStateAction<boolean>>;
}

const styles = {
  container: "flex flex-col items-center",
  logoIcon: "!h-6",
  headingText: "font-medium text-heading text-lg mt-6 mb-8",
  cantLoginIcon: "!h-20 mb-8",
  emailText: "font-medium text-heading text-base",
  bottomLinkContainer: "flex items-center gap-3 mt-12",
  bottomText: "text-primary cursor-pointer",
  separator: "bg-heading h-1 w-1 rounded-full",
  textParagraph: "text-paragraph",
};

const EmailSentCard = ({ email, type, setIsEmailSent }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResend = async () => {
    if (!email || isSubmitting) return;
    try {
      setIsSubmitting(true);
      const response = await resendVerificationEmail(email);
      toast.success(response.data.message || "Verification link sent");
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Icon
        name="logoWithGreenText"
        href={PathsEnum.LANDING}
        className={styles.logoIcon}
      />

      <Typography level="custom" className={styles.headingText}>
        {type === "forgotPassword" ? "Can’t login" : "Verify your Email"}
      </Typography>

      <Icon name="cantLogin" className={styles.cantLoginIcon} />

      <Typography level="p1">
        {type === "forgotPassword"
          ? "We sent a recovery link to you at"
          : "We sent a verification link to you at"}
      </Typography>

      <Typography level="custom" className={styles.emailText}>
        {email}
      </Typography>

      <div className={styles.bottomLinkContainer}>
        {type === "verification" ? (
          <button onClick={handleResend} disabled={isSubmitting}>
            <Typography
              level="p1"
              className={twMerge(
                isSubmitting ? styles.textParagraph : styles.bottomText
              )}
              hoverable
            >
              {isSubmitting ? "Resending..." : "Resend verification link"}
            </Typography>
          </button>
        ) : (
          <React.Fragment>
            <Link href={ROUTES.LOGIN.path}>
              <Typography level="p1" className={styles.bottomText} hoverable>
                Return to Login
              </Typography>
            </Link>

            <div className={styles.separator} />

            <button onClick={() => setIsEmailSent?.(false)}>
              <Typography level="p1" className={styles.bottomText} hoverable>
                Resend recovery link
              </Typography>
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default EmailSentCard;
