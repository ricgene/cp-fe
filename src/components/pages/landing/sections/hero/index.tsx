import Image from "next/image";
import Marquee from "react-fast-marquee";
import { twMerge } from "tailwind-merge";
import Icon from "@/Icons";
import Header from "./header";
import { Typography } from "@/components/ui";
import Tag from "@/components/pages/landing/shared/tag";
import { LANDING_HERO_CONTENT as CONTENT } from "@/constants";
import Section from "@/components/pages/landing/shared/section";
import StoreButton from "@/components/pages/landing/shared/storeButton";

const styles = {
  section: "pb-8",
  //
  contentWrapper:
    "max-w-[400px] md:max-w-[470px] lg:max-w-[570px] mx-auto text-center mt-16",
  description: "mt-4 text-sm",
  //
  buttonContainer: "flex items-center justify-center gap-2 mt-6",
  //
  tagsContainer: "w-full mt-5 max-xl:hidden",
  tagsRow: "flex items-center justify-between px-28 mb-8",
  tagsRowBottom: "flex items-center justify-between",
  tagRotateLeft: "-rotate-[25deg] ml-16",
  tagRotateRight: "rotate-[25deg] mr-16",
  alertTagTitle: "flex items-center gap-1",
  cautionIcon: "h-3",
  //
  devicesContainer:
    "relative flex items-start justify-center max-xl:mt-20 xl:-mt-20 max-h-[150px] sm:max-h-[200px] md:max-h-[320px] overflow-hidden",
  gradientOverlay:
    "absolute left-0 -bottom-1 w-full h-[35%] [background:var(--gradient-landing-hero)] z-20",
  deviceWrapper:
    "relative aspect-[248/508] w-[100px] sm:w-[150px] md:w-[200px] xl:w-[228px]",
  deviceWrapperCenter: "z-10",
  deviceWrapperLeft:
    "mt-10 sm:mt-12 md:mt-16 xl:mt-20 -mr-[100px] sm:-mr-[150px] md:-mr-[200px] xl:-mr-[228px] device-wrapper-left",
  deviceWrapperRight:
    "mt-10 sm:mt-12 md:mt-16 xl:mt-20 -ml-[100px] sm:-ml-[150px] md:-ml-[200px] xl:-ml-[228px] device-wrapper-right",
  //
  marqueeContainer: "relative z-30 mt-8 py-4",
  marqueeItem: "px-8 border-r border-stroke",
  //
  trustpilotContainer: "max-xl:hidden absolute bottom-0 right-0 z-30",
  trustpilotImageWrapper: "relative aspect-[121/78] w-[121px]",
};

const HeroSection = () => {
  return (
    <Section
      className={styles.section}
      style={{
        backgroundImage: "url('/assets/landing/landing-hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <Header />

      {/* Content */}
      <div className={styles.contentWrapper}>
        <Typography level="l1">{CONTENT.title}</Typography>

        <Typography level="p1" className={styles.description}>
          {CONTENT.description}
        </Typography>

        <div className={styles.buttonContainer}>
          <StoreButton type="appStore" />
          <StoreButton type="playStore" />
        </div>
      </div>

      {/* Tags */}
      <div className={styles.tagsContainer}>
        <div className={styles.tagsRow}>
          {CONTENT.tags.top.map((tag, index) => (
            <Tag
              key={tag.title + index}
              icon={tag.icon}
              title={tag.title}
              image={tag.image}
              description={tag.description}
            />
          ))}
        </div>

        <div className={styles.tagsRowBottom}>
          {CONTENT.tags.bottom.map((tag, index) => (
            <Tag
              key={tag.title + index}
              className={
                index === 0 ? styles.tagRotateLeft : styles.tagRotateRight
              }
              image={tag.image}
              icon={tag.icon}
              title={
                tag.hasCautionIcon ? (
                  <span className={styles.alertTagTitle}>
                    {tag.title}{" "}
                    <Icon name="caution" className={styles.cautionIcon} />
                  </span>
                ) : (
                  tag.title
                )
              }
              description={tag.description}
            />
          ))}
        </div>
      </div>

      {/* Devices */}
      <div className={styles.devicesContainer}>
        <div
          className={twMerge(styles.deviceWrapper, styles.deviceWrapperLeft)}
        >
          <Image
            src="/assets/landing/landing-hero-device-1.webp"
            alt="device-1"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div
          className={twMerge(styles.deviceWrapper, styles.deviceWrapperCenter)}
        >
          <Image
            src="/assets/landing/landing-hero-device-2.webp"
            alt="device-2"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div
          className={twMerge(styles.deviceWrapper, styles.deviceWrapperRight)}
        >
          <Image
            src="/assets/landing/landing-hero-device-3.webp"
            alt="device-3"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Trustpilot */}
        <div className={styles.trustpilotContainer}>
          <div className={styles.trustpilotImageWrapper}>
            <Image
              src="/assets/landing/landing-hero-trustpilot.png"
              alt="trustpilot"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className={styles.marqueeContainer}>
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          direction="left"
          autoFill
        >
          {CONTENT?.marqueeItems?.map((item, index) => (
            <div key={item.icon + index} className={styles.marqueeItem}>
              <Icon name={item.icon} className={item.className} />
            </div>
          ))}
        </Marquee>
      </div>

      {/* White Overlay */}
      <div className={styles.gradientOverlay} />
    </Section>
  );
};

export default HeroSection;
