"use client";

import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "@/Icons";
import { Button, Typography } from "@/components/ui";
import Link from "next/link";
import { PathsEnum } from "@/enums";

const styles = {
  container:
    "absolute bottom-0 w-full px-6 md:px-12 lg:px-20 py-6 bg-element z-[999] border border-stroke flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-2 transition-all duration-700 ease-in-out opacity-0 translate-y-10 pointer-events-none",
  containerVisible: "opacity-100 !translate-y-0 pointer-events-auto",
  iconWrapper: "min-w-[10px] min-h-[10px]",
  text: "text-heading lg:max-w-[420px] 2xl:max-w-[570px]",
  actions: "max-lg:ml-auto flex items-center gap-2",
  acceptNecessaryBtn: "rounded-full !bg-transparent border border-points",
  acceptAllBtn: "rounded-full",
  closeBtn: "!p-0 ml-2",
  closeIcon: "w-6 h-6 stroke-heading",
  cookiesIcon: "w-10 h-10",
};

interface Props {
  onManaged?: () => void;
}

const CookieBanner = ({ onManaged }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isManaged, setIsManaged] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const managed = localStorage.getItem("cookie-banner-managed");
    if (!managed) {
      setIsManaged(false);
      setIsMounted(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeBanner = () => {
    localStorage.setItem("cookie-banner-managed", "true");
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
      setIsManaged(true);
      if (onManaged) onManaged();
    }, 700);
  };

  if (isManaged || !isMounted) return null;

  return (
    <div
      className={twMerge(
        styles.container,
        isVisible && styles.containerVisible
      )}
    >
      <div className="flex items-center gap-10">
        <div className={styles.iconWrapper}>
          <Icon name="cookies" className={styles.cookiesIcon} />
        </div>

        <Typography level="p1" className={styles.text}>
          We use cookies to enhance your browsing experience, serve personalized
          content, and analyze our traffic. By clicking &quot;Accept All&quot;,
          you consent to our use of cookies.{" "}
          <Link
            href={PathsEnum.COOKIE_POLICY}
            className="text-primary underline"
          >
            Learn more
          </Link>
        </Typography>
      </div>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="small"
          className={styles.acceptNecessaryBtn}
          onClick={closeBanner}
        >
          Accept Necessary Cookies
        </Button>

        <Button
          variant="primary"
          size="small"
          className={styles.acceptAllBtn}
          onClick={closeBanner}
        >
          Accept All
        </Button>

        <Button
          variant="text"
          size="small"
          className={styles.closeBtn}
          onClick={closeBanner}
        >
          <Icon name="close" className={styles.closeIcon} />
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
