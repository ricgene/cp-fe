import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Icon from "@/Icons";
import { IconsType } from "@/types";

type Props = {
  label: string;
  icon: IconsType;
  isOpen: boolean;
  onToggle: () => void;
  items: { label: string; href: string }[];
  activePath: string;
};

const styles = {
  container: "flex flex-col",
  button:
    "flex items-center justify-between py-2 px-2 hover:bg-white/10 rounded-md",
  buttonContent: "flex items-center gap-2",
  icon: "h-5 !stroke-white",
  chevron: "h-3 duration-300 ease-in-out !stroke-white",
  chevronClosed: "rotate-270",
  chevronOpen: "rotate-180",
  linkContainer: "px-2 mt-1 flex flex-col gap-1",
  link: "flex items-center py-2 px-2 hover:bg-white/10 rounded-md text-[13px]",
  activeLink: "!bg-white/10",
};

const ExpandableMenuItem = ({
  label,
  icon,
  isOpen,
  onToggle,
  items,
  activePath,
}: Props) => {
  return (
    <div className={styles.container}>
      <button onClick={onToggle} className={styles.button}>
        <div className={styles.buttonContent}>
          <Icon name={icon} className={styles.icon} />
          <span>{label}</span>
        </div>
        <Icon
          name="chevronDown"
          className={twMerge(
            styles.chevron,
            !isOpen ? styles.chevronClosed : styles.chevronOpen
          )}
        />
      </button>

      {isOpen && (
        <div className={styles.linkContainer}>
          {items.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className={twMerge(
                styles.link,
                activePath === item.href && styles.activeLink
              )}
            >
              - &nbsp;&nbsp;&nbsp;{item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpandableMenuItem;
