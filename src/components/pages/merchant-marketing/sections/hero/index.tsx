"use client";

import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import Icon from "@/Icons";
import Header from "./header";
import MeetingBox from "./meetingBox";
import Section from "../../shared/section";
import { Typography } from "@/components/ui";

const CONTENT = [
  {
    image: "/assets/marketing/marketing-hero-bg-1.jpg",
    title: "Smart Loyalty & Engagement Platform",
    heading: "Making Everyday Living Smarter and Safer.",
  },
  {
    image: "/assets/marketing/marketing-hero-bg-2.jpg",
    title: "Track Your Performance",
    heading: "Create & Track Offers, Engagement, Redemptions.",
  },
  {
    image: "/assets/marketing/marketing-hero-bg-3.jpg",
    title: "Drive Foot Traffic and Repeat Visits",
    heading: "Drive Engagement. Build Audiences. Track Results.",
  },
];

const styles = {
  section: "!py-8 min-h-screen z-10 relative flex flex-col",
  gradientOverlay: "absolute top-0 left-0 w-full h-full -z-10",
  contentWrapper:
    "flex items-center flex-col lg:flex-row gap-12 lg:gap-8 mt-28 lg:mt-auto mb-12 ",
  //
  leftCol: "flex-1 flex flex-col gap-5 max-lg:text-center max-lg:items-center",
  title: "text-white text-base",
  heading:
    "text-white font-semibold text-4xl 2xl:text-5xl leading-[140%] max-w-[700px] lg:max-w-[550px]",
  bookDemoBtn:
    "rounded-full w-fit h-8 px-3 md:h-9 md:px-4 lg:h-10 lg:px-5 !pr-2  !text-xs md:!text-sm lg:text-base border border-element/20 flex items-center gap-4 text-white font-semibold bg-white/20 cursor-pointer hover:opacity-80",
  playIconWrapper:
    "border-[0.5px] border-white/20 bg-white/20 p-1.5 rounded-full",
  rightCol: "flex-1 w-full",
  //
  bottomNav:
    "w-full flex items-center justify-between pt-6 border-t-2 border-[#027472]",
  bottomNavLeft: "flex items-center gap-1",
  bottomNavNumber: "text-white text-sm font-medium w-8",
  bottomNavDot: "bg-white/20 h-1.5 w-11 rounded-full cursor-pointer",
  bottomNavDotActive: "bg-[#4FB27F]",
  bottomNavRight: "flex items-center gap-2",
  navArrowBtn:
    "bg-white/20 rounded-full flex h-9 aspect-square border border-white/30 cursor-pointer",
  navArrowIcon: "stroke-white/40 h-4 w-4 rotate-90 m-auto backdrop-blur-xl",
  navArrowIconActive: "stroke-white h-4 w-4 -rotate-90 m-auto backdrop-blur-xl",
};

const HeroSection = () => {
  const [contentNo, setContentNo] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setContentNo((prev) => (prev + 1) % CONTENT.length);
    }, 10000);
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Section
      className={styles.section}
      style={{
        backgroundImage: `url(${CONTENT[contentNo].image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient Overlay */}
      <div
        className={styles.gradientOverlay}
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(170.66deg, rgba(0, 0, 0, 0.45) 6.8%, rgba(10, 151, 77, 0.49) 34.49%, #006260 92.77%)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Header */}
      <Header />

      {/* Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.leftCol}>
          <Typography level="custom" className={styles.title}>
            {CONTENT[contentNo].title}
          </Typography>

          <Typography level="custom" className={styles.heading}>
            {CONTENT[contentNo].heading}
          </Typography>

          <button className={styles.bookDemoBtn}>
            Book a demo
            <div className={styles.playIconWrapper}>
              <Icon name="play" className="h-3 w-3" />
            </div>
          </button>
        </div>

        <div className={styles.rightCol}>
          <MeetingBox />
        </div>
      </div>

      {/* Bottom Nav */}
      <div className={styles.bottomNav}>
        <div className={styles.bottomNavLeft}>
          <Typography level="custom" className={styles.bottomNavNumber}>
            0{contentNo + 1}
          </Typography>

          {CONTENT.map((_, index) => (
            <button
              key={index}
              className={twMerge(
                styles.bottomNavDot,
                contentNo === index && styles.bottomNavDotActive
              )}
              onClick={() => {
                setContentNo(index);
                resetInterval();
              }}
            ></button>
          ))}
        </div>

        <div className={styles.bottomNavRight}>
          <button
            className={styles.navArrowBtn}
            onClick={() => {
              setContentNo(
                (prev) => (prev - 1 + CONTENT.length) % CONTENT.length
              );
              resetInterval();
            }}
          >
            <Icon name="chevronDown" className={styles.navArrowIcon} />
          </button>

          <button
            className={styles.navArrowBtn}
            onClick={() => {
              setContentNo((prev) => (prev + 1) % CONTENT.length);
              resetInterval();
            }}
          >
            <Icon name="chevronDown" className={styles.navArrowIconActive} />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
