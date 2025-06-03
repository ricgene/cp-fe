import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Icon from "@/Icons";
import { IconsType } from "@/types";

interface Props {
  href: string;
  label: string;
  icon: IconsType;
  disabled?: boolean;
  activePath: string;
}

const styles = {
  link: {
    base: "flex items-center gap-2 py-2 cursor-pointer hover:bg-white/10 rounded-md px-2",
    active: "bg-white/10",
    disabled: "!text-gray-100 hover:bg-transparent cursor-default opacity-60",
  },
  icon: {
    base: "h-5 !stroke-white",
  },
};

const MenuItem = ({ label, icon, href, activePath, disabled }: Props) =>
  disabled ? (
    <span className={twMerge(styles.link.base, styles.link.disabled)}>
      <Icon name={icon} className={styles.icon.base} />
      <span>{label}</span>
    </span>
  ) : (
    <Link
      href={href}
      className={twMerge(
        styles.link.base,
        activePath === href && styles.link.active
      )}
    >
      <Icon name={icon} className={styles.icon.base} />
      <span>{label}</span>
    </Link>
  );

export default MenuItem;
