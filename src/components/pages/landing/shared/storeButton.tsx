import React from "react";
import { twMerge } from "tailwind-merge";
import Icon from "@/Icons";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type: "appStore" | "playStore";
}

const styles = {
  button:
    "h-8 md:h-11 aspect-[140/44] bg-black text-white rounded-full flex cursor-pointer",
  icon: "h-5 md:h-6 m-auto",
  playStoreIcon: "h-[26px] md:h-[30px] m-auto",
};

const StoreButton = ({ type, className, ...props }: Props) => {
  const iconName = type === "appStore" ? "appStore" : "playStore";
  const iconClassName =
    type === "appStore" ? styles.icon : styles.playStoreIcon;

  return (
    <button className={twMerge(styles.button, className)} {...props}>
      <Icon name={iconName} className={iconClassName} />
    </button>
  );
};

export default StoreButton;
