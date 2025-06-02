import Image from "next/image";
import { Typography } from "@/components/ui";
import Section from "@/components/pages/landing/shared/section";
import { LANDING_BROKER_3_CONTENT as CONTENT } from "@/constants";
import StoreButton from "@/components/pages/landing/shared/storeButton";

const styles = {
  section:
    "lg:!py-0 relative lg:min-h-[390px] overflow-visible w-full flex flex-col lg:flex-row justify-between gap-7 z-20 [background:var(--gradient-button)]",
  contentContainer:
    "max-lg:flex-1 flex flex-col max-lg:items-center justify-center py-8 gap-6 lg:max-w-[500px]",
  title: "!text-white !font-semibold",
  description: "text-white max-lg:mx-auto max-w-[500px]",
  buttonContainer: "flex items-center gap-2",
  //
  deviceImage:
    "max-lg:hidden absolute bottom-0 lg:right-[60px] xl:right-[110px] 2xl:right-[160px] z-10",
  leftVector: "object-contain absolute top-0 left-0 z-0",
  rightVector: "absolute bottom-0 right-0 translate-x-1/ z-0",
};

const Broker3 = () => {
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

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <StoreButton type="appStore" />
          <StoreButton type="playStore" />
        </div>
      </div>

      {/* Device */}
      <Image
        src="/assets/landing/landing-broker-3-hand-device.svg"
        alt="broker-3-device"
        width={507}
        height={463}
        className={styles.deviceImage}
      />

      {/* Left Vector */}
      <Image
        src="/assets/landing/landing-broker-3-left-vector.svg"
        alt="broker-2-left-vector"
        width={120}
        height={80}
        className={styles.leftVector}
      />

      {/* Right Vector */}
      <Image
        src="/assets/landing/landing-broker-3-right-vector.svg"
        alt="broker-2-right-vector"
        width={190}
        height={110}
        className={styles.rightVector}
      />
    </Section>
  );
};

export default Broker3;
