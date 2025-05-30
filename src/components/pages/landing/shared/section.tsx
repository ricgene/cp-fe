import React from "react";
import { twMerge } from "tailwind-merge";

const styles = {
  section:
    "relative w-full px-[24px] sm:px-[64px] md:px-[104px] xl:px-[164px] 2xl:px-[214px] py-[24px]",
};

const Section = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={twMerge(styles.section, className)} />;
};

export default Section;
