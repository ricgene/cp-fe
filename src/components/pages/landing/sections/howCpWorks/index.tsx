import React from "react";
import Image from "next/image";
import Section from "../../shared/section";
import Typography from "@/components/ui/typography";
import { LANDING_HOW_CP_WORKS_CONTENT as CONTENT } from "@/constants";

const styles = {
  section: "relative py-16 text-center bg-element",
  smartTitle: "text-primary font-medium z-10",
  title: "my-3 md:my-6 md:leading-10 z-10",
  //
  container:
    "relative w-full max-sm:px-0 max-md:px-20 lg:px-24 xl:px-32 mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 z-10",
  card: "w-full h-full bg-white p-4 rounded-2xl border border-stroke text-center duration-300 ease-in-out hover:shadow-[0px_4px_30.5px_rgba(0,0,0,0.1)]",
  image: "w-full",
  cardTitle: "mt-4 font-semibold",
  cardDescription:
    "mt-2 text-xs lg:text-base text-paragraph max-w-[350px] mx-auto",
};

const HowCpWorks = () => {
  return (
    <Section className={styles.section}>
      {/* Smart Title */}
      <Typography level="p1" className={styles.smartTitle}>
        {CONTENT.smartTitle}
      </Typography>

      {/* Title */}
      <Typography level="l2" className={styles.title}>
        {CONTENT.title}
      </Typography>

      {/* Cards */}
      <div className={styles.container}>
        {CONTENT.cards.map((card, index) => (
          <div className={styles.card} key={card.title + index}>
            <Image
              src={card.image}
              alt="How CityPerks Works"
              width={375}
              height={227}
              className={styles.image}
            />

            <Typography level="h2" className={styles.cardTitle}>
              {index + 1}. {card.title}
            </Typography>

            <Typography level="custom" className={styles.cardDescription}>
              {card.description}
            </Typography>
          </div>
        ))}
      </div>

      {/* Left Vector */}
      <Image
        src="/assets/landing/landing-how-cp-works-left-vector.svg"
        alt="How CityPerks Works"
        width={250}
        height={430}
        className={"absolute top-0 left-0 w-[80px] lg:w-[120px] z-0"}
      />
    </Section>
  );
};

export default HowCpWorks;
