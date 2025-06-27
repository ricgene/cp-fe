import React from "react";
import { twMerge } from "tailwind-merge";
import Icon from "@/Icons";
import { PathsEnum } from "@/enums";
import { Typography } from "@/components/ui";
import { Footer } from "@/components/shared/layout";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  formClassName?: string;
};

const styles = {
  container:
    "bg-white min-h-full w-full pt-8 md:pt-12 pb-3 md:pb-6 px-6 md:px-16 flex flex-col gap-8 md:gap-12",
  icon: "!h-10 mx-auto",
  formWrapper: "flex-1 flex",
  form: "m-auto md:min-w-md bg-primary/10 py-8 px-10 md:px-12 rounded-3xl",
  title: "mb-6",
  description: "-mt-3 mb-8",
};

const AuthWrapper = ({
  title,
  children,
  description,
  formClassName,
}: Props) => {
  return (
    <div className={styles.container}>
      <Icon
        name="logoWithGreenText"
        href={PathsEnum.LANDING}
        className={styles.icon}
      />

      <div className={styles.formWrapper}>
        <div className={twMerge(styles.form, formClassName)}>
          {title && (
            <Typography level="h1" className={styles.title}>
              {title}
            </Typography>
          )}

          {description && (
            <Typography level="p1" className={styles.description}>
              {description}
            </Typography>
          )}

          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthWrapper;
