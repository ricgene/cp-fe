import Image from "next/image";
import { Typography } from "@/components/ui";
import { LANDING_BROKER_2_CONTENT as CONTENT } from "@/constants";
import Section from "@/components/pages/landing/shared/section";
import StoreButton from "@/components/pages/landing/shared/storeButton";

const styles = {
  section:
    "lg:!py-0 relative min-h-[150px] w-full flex flex-col lg:flex-row justify-between gap-7 z-20 [background:var(--gradient-button)] overflow-hidden",
  //
  contentContainer:
    "flex-1 lg:py-8 z-10 flex flex-col justify-center gap-2 max-lg:text-center lg:max-w-[665px]",
  title: "!text-white !font-semibold",
  description: "text-white max-lg:mx-auto max-w-[500px]",
  buttonContainer:
    "relative flex lg:flex-col items-center justify-center gap-2 z-10",
  //
  leftVector: "object-contain absolute top-0 left-0 z-0",
  rightVector: "absolute bottom-0 right-0 translate-x-1/ z-0",
};

const Broker2 = () => {
  return (
    <Section className={styles.section}>
      {/* Content */}
      <div className={styles.contentContainer}>
        <Typography level="l2" className={styles.title}>
          {CONTENT.title}
        </Typography>
        <Typography level="p1" className={styles.description}>
          {CONTENT.description}
        </Typography>
      </div>

      {/* Buttons */}
      <div className={styles.buttonContainer}>
        <StoreButton type="appStore" />
        <StoreButton type="playStore" />
      </div>

      {/* Left Vector */}
      <Image
        src="/assets/landing/landing-broker-2-left-vector.svg"
        alt="broker-2-left-vector"
        width={140}
        height={80}
        className={styles.leftVector}
      />

      {/* Right Vector */}
      <Image
        src="/assets/landing/landing-broker-2-right-vector.svg"
        alt="broker-2-right-vector"
        width={190}
        height={110}
        className={styles.rightVector}
      />
    </Section>
  );
};

export default Broker2;
