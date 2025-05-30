import React from "react";
import Link from "next/link";
import Icon from "@/Icons";
import { Typography } from "@/components/ui";

const Footer = () => {
  const links = [
    { href: "/", text: "Terms of Use" },
    { href: "/", text: "Privacy Policy" },
    { href: "/", text: "Cookie Policy" },
  ];

  const styles = {
    container:
      "flex items-center justify-center md:justify-between flex-col md:flex-row gap-2 border-t border-stroke pt-3 md:pt-5",
    textContainer: "flex items-center gap-1",
    icon: "!h-5 md:!h-6",
    linkContainer: "flex items-center gap-4",
  };

  return (
    <footer className={styles.container}>
      <div className={styles.textContainer}>
        <Typography level="p1">© 2025 All rights reserved.</Typography>
        <Icon name="logo" className={styles.icon} />
      </div>

      <div className={styles.linkContainer}>
        {links.map((link, index) => (
          <Link key={index} href={link.href}>
            <Typography level="p1" hoverable>
              {link.text}
            </Typography>
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
