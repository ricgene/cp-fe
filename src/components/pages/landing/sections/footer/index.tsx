import Icon from "@/Icons";
import Link from "next/link";
import { Typography } from "@/components/ui";
import Section from "@/components/pages/landing/shared/section";
import { LANDING_FOOTER_CONTENT as CONTENT } from "@/constants";
import { PathsEnum } from "@/enums";

const styles = {
  section:
    "!py-4 !bg-heading flex items-center justify-between gap-2 md:gap-4 flex-wrap",
  //
  logoContainer: "flex-1",
  logo: "h-6",
  //
  description:
    "text-white flex-1 md:text-center max-md:min-w-full max-md:order-3",
  //
  socialContainer: "flex-1 flex items-center justify-end gap-2 p-1",
  socialButton: "rounded-full overflow-hidden cursor-pointer",
  socialIcon: "h-7",
};

const Footer = () => {
  return (
    <Section className={styles.section}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Icon
          name="logoWithWhiteText"
          href={PathsEnum.DASHBOARD}
          className={styles.logo}
        />
      </div>

      {/* Copyright */}
      <Typography level="p1" className={styles.description}>
        {CONTENT.copyright}
      </Typography>

      {/* Social Links */}
      <div className={styles.socialContainer}>
        {CONTENT.socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.link}
            target="_blank"
            className={styles.socialButton}
          >
            <Icon name={link.icon} className={styles.socialIcon} />
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default Footer;
