import React from "react";
import { Typography } from "../../ui";
import Icon from "@/Icons";
import { useMobileSidebar } from "@/store/mobileSidebar.atom";

type Props = {
  pathname: string;
  title: string;
};

const styles = {
  container:
    "flex items-center justify-between px-6 py-4 border-b border-divider",
  breadcrumb: "text-primary capitalize bg-element rounded-md px-2 py-1.5",
  menuIcon: "h-5 stroke-paragraph",
  menuButton:
    "md:hidden cursor-pointer hover:opacity-70 duration-300 ease-in-out",
};

const Header = ({ pathname, title }: Props) => {
  const { openSidebar } = useMobileSidebar();
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs =
    segments.length === 2 ? `${segments[0]} - ${title}` : segments.join(" - ");

  return (
    <div className={styles.container}>
      <Typography level="p1_bold" className={styles.breadcrumb}>
        {breadcrumbs}
      </Typography>

      <button className={styles.menuButton} onClick={openSidebar}>
        <Icon name="menu" className={styles.menuIcon} />
      </button>
    </div>
  );
};

export default Header;
