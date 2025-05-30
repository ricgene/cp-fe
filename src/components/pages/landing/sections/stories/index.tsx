import React from "react";
import Icon from "@/Icons";
import Section from "../../shared/section";
import { truncateText } from "@/utils/misc.utils";
import Typography from "@/components/ui/typography";
import { LANDING_STORIES_CONTENT as CONTENT } from "@/constants";

const styles = {
  section: "relative py-16 text-center",
  title: "z-10 mb-6",
  //
  ratingContainer: "flex flex-col items-center justify-center gap-2 mx-auto",
  ratingRow: "flex items-center justify-center gap-8",
  ratingText: "font-medium md:text-lg text-heading",
  reviewText: "text-heading lg:text-sm",
  reviewCount: "font-bold underline",
  trustPilotIcon: "h-6",
  //
  storiesContainer: "flex items-stretch gap-4 overflow-x-scroll pt-16 pb-4",
  storyCard:
    "bg-white rounded-2xl border border-stroke px-4 py-8 min-w-[270px] text-left ml-1 duration-300 ease-in-out hover:shadow-md cursor-default",
  storyHeader: "flex items-center justify-between",
  starsIcon: "h-4",
  dateText: "text-xs text-heading font-light",
  storyTitle: "lg:!text-base font-semibold mt-3 mb-2",
  storyContent: "",
  divider: "w-14 border-t border-t-stroke my-4",
  authorName: "font-semibold text-heading",
};

const Stories = () => {
  return (
    <Section className={styles.section}>
      {/* Title */}
      <Typography level="l2" className={styles.title}>
        {CONTENT.title}
      </Typography>

      {/* Rating */}
      <div className={styles.ratingContainer}>
        <div className={styles.ratingRow}>
          <Typography level="p1" className={styles.ratingText}>
            {CONTENT.rating.score}
          </Typography>

          <Icon name="stars" className="h-5" />
        </div>

        <Typography level="p1" className={styles.reviewText}>
          Based on{" "}
          <span className={styles.reviewCount}>
            {CONTENT.rating.reviewCount}
          </span>
        </Typography>

        <Icon name="trustPilot" className={styles.trustPilotIcon} />
      </div>

      {/* Cards */}
      <div className={styles.storiesContainer}>
        {CONTENT.stories.map((card, index) => (
          <div key={index + card.title} className={styles.storyCard}>
            <div className={styles.storyHeader}>
              <Icon name="stars" className={styles.starsIcon} />

              <Typography level="custom" className={styles.dateText}>
                {card.date}
              </Typography>
            </div>

            <Typography level="h2" className={styles.storyTitle}>
              {truncateText(card.title, 23)}
            </Typography>

            <Typography level="p1" className={styles.storyContent}>
              {truncateText(card.content, 56)}
            </Typography>

            <div className={styles.divider} />

            <Typography level="p1" className={styles.authorName}>
              {truncateText(card.author, 56)}
            </Typography>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Stories;
