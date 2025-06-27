"use client";

import Icon from "@/Icons";
import React from "react";
import { Loader } from "@/components/ui";
import TabSection from "./shared/tabSection";
import { Footer } from "@/components/shared";
import ImageSection from "./shared/imageSection";
import { useUserData } from "@/store/userData.atom";
import { PathsEnum } from "@/enums";

const styles = {
  root: "min-h-screen bg-white flex flex-col",
  header: "h-fit w-full border-b border-b-stroke py-4 px-6 md:px-16",
  logo: "h-6",
  container: "pb-4 px-6 md:px-16 flex-1 flex flex-col justify-between",
  content: "flex-1 flex flex-col gap-10 py-6",
  loader: "m-auto !stroke-primary",
};

const Profile = () => {
  const { userData } = useUserData();
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Icon
          name="logoWithGreenText"
          href={PathsEnum.DASHBOARD}
          className={styles.logo}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          {userData ? (
            <React.Fragment>
              <ImageSection />
              <TabSection />
            </React.Fragment>
          ) : (
            <Loader className={styles.loader} />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
