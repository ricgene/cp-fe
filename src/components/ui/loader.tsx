import React from "react";
import { twMerge } from "tailwind-merge";
import Icon from "@/Icons";

interface Props {
  className?: string;
}

const styles = {
  loader: "h-5 animate-spin-slow stroke-white",
};

const Loader = ({ className }: Props) => {
  return <Icon name="loading" className={twMerge(styles.loader, className)} />;
};

export default Loader;
