import React from "react";
import Image from "next/image";
import Section from "../../shared/section";
import Typography from "@/components/ui/typography";
import { LANDING_TRACK_ENGAGEMENT_CONTENT as CONTENT } from "@/constants";

const styles = {
  section: "py-16 text-center",
  smartTitle: "text-primary font-medium",
  engagementTitle: "my-6 md:leading-10",
  engagementDescription: "max-w-[600px] md:leading-6 mx-auto",
  imageContainer: "relative aspect-[853/555] w-full lg:w-[853px] mx-auto mt-10",
};

const TrackEngagement = () => {
  return (
    <Section className={styles.section}>
      {/* Smart Title */}
      <Typography level="p1" className={styles.smartTitle}>
        {CONTENT.smartTitle}
      </Typography>

      {/* Engagement Title */}
      <Typography level="l2" className={styles.engagementTitle}>
        {CONTENT.engagementTitle.line1} <br />
        {CONTENT.engagementTitle.line2}
      </Typography>

      {/* Engagement Description */}
      <Typography level="p1" className={styles.engagementDescription}>
        {CONTENT.engagementDescription}
      </Typography>

      {/* Image Container */}
      <div className={styles.imageContainer}>
        <Image
          src="/assets/landing/landing-track-engagement-device.svg"
          alt="Track Engagement"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </Section>
  );
};

export default TrackEngagement;
