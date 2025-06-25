"use client";

import { useState } from "react";
import { RoleEnum } from "@/enums";
import { twMerge } from "tailwind-merge";
import GeneralTab from "./tabs/generalTab";
import SecurityTab from "./tabs/securityTab";
import { Typography } from "@/components/ui";
import { useUserData } from "@/store/userData.atom";
import BusinessDetailsTab from "./tabs/businessDetailsTab";

const styles = {
  tabSectionWrapper: "flex-1 flex flex-col gap-5",
  tabList: "w-full border-b border-stroke flex items-center gap-10",
  tabButton:
    "pb-2 border-b-[3px] border-b-transparent text-paragraph duration-150 ease-in-out",
  tabButtonActive: "!text-primary border-b-primary",
  tabTitle: "text-base",
  tabPanel: "flex-1",
};

const TabSection = () => {
  const { userData } = useUserData();
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [
    { title: "General", component: <GeneralTab userData={userData} /> },
    {
      title:
        userData?.role === RoleEnum.ADMIN
          ? "Address Detalis"
          : "Business Details",
      component: <BusinessDetailsTab userData={userData} />,
    },
    { title: "Security", component: <SecurityTab userData={userData} /> },
  ];

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className={styles.tabSectionWrapper}>
      <div className={styles.tabList}>
        {tabs?.map((tab, index) => (
          <button
            key={`${tab.title} ${index}`}
            className={twMerge(
              styles.tabButton,
              index === selectedTab && styles.tabButtonActive
            )}
            onClick={() => handleTabChange(index)}
          >
            <Typography level="custom" className={styles.tabTitle}>
              {tab.title}
            </Typography>
          </button>
        ))}
      </div>

      <div className={styles.tabPanel}>{tabs[selectedTab].component}</div>
    </div>
  );
};

export default TabSection;
