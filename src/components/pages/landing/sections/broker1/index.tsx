import Link from "next/link";
import Image from "next/image";
import { Button, Typography } from "@/components/ui";
import { LANDING_BROKER_1_CONTENT as CONTENT } from "@/constants";
import Section from "@/components/pages/landing/shared/section";

const styles = {
  section:
    "lg:!py-0 relative min-h-[150px] w-full flex flex-col lg:flex-row justify-between gap-7 z-20",
  backdrop: "absolute top-0 left-0 w-full h-full bg-black/80",
  //
  contentContainer: "flex-1 lg:py-8 flex items-center z-10",
  title: "!text-white !font-semibold max-lg:text-center lg:max-w-[565px]",
  //
  buttonContainer:
    "relative lg:h-[150px] lg:w-[200px] flex items-center justify-center z-10",
  rings: "max-lg:hidden absolute top-0 left-0 h-full -z-10",
  button:
    "rounded-full h-8 px-3 md:h-9 md:px-4 lg:h-10 lg:px-5 !text-xs md:!text-sm lg:text-base",
};

const Broker1 = () => {
  return (
    <Section
      className={styles.section}
      style={{
        backgroundImage: "url('/assets/landing/landing-broker-1-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
      id="about"
    >
      {/* Backdrop */}
      <div className={styles.backdrop} />

      {/* Content */}
      <div className={styles.contentContainer}>
        <Typography level="l2" className={styles.title}>
          {CONTENT.title.text}{" "}
          <span className="text-points">{CONTENT.title.highlight1}</span>{" "}
          {CONTENT.title.middle}{" "}
          <span className="text-points">{CONTENT.title.highlight2}</span>{" "}
          {CONTENT.title.end}
        </Typography>
      </div>

      <div className={styles.buttonContainer}>
        {/* Right Rings */}
        <Image
          src="/assets/landing/landing-broker-1-right-rings.svg"
          alt="Broker Rings"
          width={200}
          height={200}
          className={styles.rings}
        />

        {/* Button */}
        <Link href={CONTENT.button.link}>
          <Button variant="primary" className={styles.button}>
            {CONTENT.button.text}
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default Broker1;
