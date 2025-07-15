import React from "react";
import { twMerge } from "tailwind-merge";

const styles = {
  section:
    "relative w-full px-[24px] sm:px-[60px] md:px-[95px] xl:px-[110px] 2xl:px-[130px] py-[20px]",
};

const Section = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={twMerge(styles.section, className)} />;
};

export default Section;
