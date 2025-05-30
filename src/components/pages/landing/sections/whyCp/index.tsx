import React from "react";
import Icon from "@/Icons";
import Typography from "@/components/ui/typography";
import Section from "@/components/pages/landing/shared/section";
import { LANDING_WHY_CP_CONTENT as CONTENT } from "@/constants";

const styles = {
  section: "py-12",
  title: "text-center",
  //
  container: "flex flex-col lg:flex-row mt-10 gap-5",
  card: "w-full h-full border border-points rounded-2xl p-6 [background:var(--gradient-whyCp-cards)]",
  cardTitle: "text-base md:text-lg !font-semibold",
  //
  listItem: "flex gap-2 py-1.5",
  listIcon: "h-4 min-w-4",
  listText: "text-sm font-heading",
  //
  leftColumn: "w-full lg:w-[40%]",
  rightColumn: "flex-1 flex flex-col gap-3",
  listContainer: "mt-2",
};

const WhyCP = () => {
  return (
    <Section className={styles.section}>
      {/* Title */}
      <Typography level="l2" className={styles.title}>
        {CONTENT.title}
      </Typography>

      <div className={styles.container}>
        <div className={styles.leftColumn}>
          {/* Card 1 */}
          <div className={styles.card}>
            <Typography level="h2" className={styles.cardTitle}>
              {CONTENT.cards.residents.title}
            </Typography>

            <ul className={styles.listContainer}>
              {CONTENT.cards.residents.items.map((text, index) => (
                <li key={index + text} className={styles.listItem}>
                  <Icon name="listIcon" className={styles.listIcon} />
                  <Typography level="custom" className={styles.listText}>
                    {text}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.rightColumn}>
          {/* Card 2 */}
          <div className={styles.card}>
            <Typography level="h2" className={styles.cardTitle}>
              {CONTENT.cards.businesses.title}
            </Typography>

            <ul className={styles.listContainer}>
              {CONTENT.cards.businesses.items.map((text, index) => (
                <li key={index + text} className={styles.listItem}>
                  <Icon name="listIcon" className={styles.listIcon} />
                  <Typography level="custom" className={styles.listText}>
                    {text}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 */}
          <div className={styles.card}>
            <Typography level="h2" className={styles.cardTitle}>
              {CONTENT.cards.admins.title}
            </Typography>

            <ul className={styles.listContainer}>
              {CONTENT.cards.admins.items.map((text, index) => (
                <li key={index + text} className={styles.listItem}>
                  <Icon name="listIcon" className={styles.listIcon} />
                  <Typography level="custom" className={styles.listText}>
                    {text}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WhyCP;
