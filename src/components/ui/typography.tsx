import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  level: "l1" | "l2" | "h1" | "h1_bold" | "h2" | "p1" | "p1_bold" | "custom";
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const styles = {
  custom: "",
  l1: "text-[24px]/[30px] md:text-[28px]/[40px] lg:text-[38px]/[50px] font-semibold text-heading",
  l2: "text-xl md:text-2xl lg:text-3xl font-bold text-heading",
  h1: "text-xl font-medium text-heading",
  h1_bold: "text-xl font-bold text-heading",
  h2: "text-sm sm:text-base lg:text-lg font-medium text-heading",
  p1: "text-xs text-paragraph",
  p1_bold: "text-xs font-medium text-heading",
};

const Typography = ({ level, className, children, hoverable }: Props) => {
  const Tag = (() => {
    switch (level) {
      case "h1":
      case "h1_bold":
        return "h1";
      case "h2":
        return "h2";
      case "p1":
      case "p1_bold":
      default:
        return "div";
    }
  })();

  return (
    <Tag
      className={twMerge(
        styles[level],
        className,
        hoverable && "hover:underline"
      )}
    >
      {children}
    </Tag>
  );
};

export default Typography;
