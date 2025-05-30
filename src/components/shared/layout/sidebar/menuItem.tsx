import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Icon from "@/Icons";
import { IconsType } from "@/types";

interface Props {
  label: string;
  icon: IconsType;
  href: string;
  activePath: string;
}

const styles = {
  link: "flex items-center gap-2 py-2 cursor-pointer hover:bg-white/10 rounded-md px-2 font-light",
  active: "bg-white/10",
  icon: "h-5",
};

const MenuItem = ({ label, icon, href, activePath }: Props) => (
  <Link
    href={href}
    className={twMerge(styles.link, activePath === href && styles.active)}
  >
    <Icon name={icon} className={styles.icon} />
    <span>{label}</span>
  </Link>
);

export default MenuItem;
