"use client";

import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import Header from "./header";
import Sidebar from "./sidebar";
import { ROUTES } from "@/constants";
import { loadUser } from "@/requests";
import { useStaticData } from "@/store";
import { IStaticData } from "@/types";
import { useUserData } from "@/store/userData.atom";
import { useMobileSidebar } from "@/store/mobileSidebar.atom";

type Props = {
  children: React.ReactNode;
  staticData: IStaticData | null;
};

const styles = {
  layoutContainer: "flex h-full w-full overflow-hidden",
  contentContainer: "flex-1 flex flex-col overflow-hidden bg-white",
  content: "flex-1 m-6 overflow-hidden",
  borderedContent: "px-5 py-6  border border-divider rounded-xl",
  contentInner: "h-full w-full overflow-y-hidden",
};

const AppLayout = ({ children, staticData }: Props) => {
  const pathname = usePathname();
  const { setUserData, userData } = useUserData();
  const { setStaticData } = useStaticData();
  const { closeSidebar } = useMobileSidebar();

  const currentRoute = Object.values(ROUTES).find(
    (route) => route.path === pathname
  );
  const title = currentRoute?.title || "";
  const showLayout = currentRoute?.showSidebar;
  const isBorderedContent = currentRoute?.borderedContent !== false;

  const fetchUserData = async () => {
    try {
      const response = await loadUser();
      setUserData(response.data.user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (staticData) {
      setStaticData(staticData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticData]);

  return (
    <React.Fragment>
      <Toaster
        toastOptions={{
          position: "top-right",
        }}
      />
      {showLayout ? (
        <div className={styles.layoutContainer}>
          {/* Sidebar */}
          <Sidebar pathname={pathname} />

          <div className={styles.contentContainer}>
            {/* Header */}
            <Header pathname={pathname} title={title} />

            <div
              className={twMerge(
                styles.content,
                isBorderedContent && styles.borderedContent
              )}
            >
              {/* Content */}
              <div className={styles.contentInner}>{children}</div>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </React.Fragment>
  );
};

export default AppLayout;
