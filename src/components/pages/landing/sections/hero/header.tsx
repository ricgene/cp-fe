import Link from "next/link";
import Icon from "@/Icons";
import { Button } from "@/components/ui";
import { LANDING_HEADER_CONTENT as CONTENT } from "@/constants";
import { PathsEnum } from "@/enums";

const styles = {
  header: "flex items-center gap-2",
  //
  logoContainer: "flex-1",
  logo: "h-6 lg:h-8 mr-auto",
  //
  navContainer: "flex-1 max-lg:hidden",
  nav: "bg-element rounded-full w-fit h-10 flex items-center gap-4 py-6 px-6 mx-auto shadow-[0_0_0_2px_#F4F9F8] border border-white",
  navButton: "text-sm font-medium text-heading p-2 cursor-pointer text-nowrap",
  //
  startedContainer: "flex-1 flex items-center justify-end",
  startedButton:
    "rounded-full h-8 px-3 md:h-9 md:px-4 lg:h-10 lg:px-5 !text-xs md:!text-sm lg:text-base",
};

const Header = () => {
  return (
    <div className={styles.header}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Icon
          name="logoWithGreenText"
          href={PathsEnum.DASHBOARD}
          className={styles.logo}
        />
      </div>

      {/* Nav */}
      <div className={styles.navContainer}>
        <div className={styles.nav}>
          {CONTENT.nav.items.map((item) => (
            <Link href={item.link} key={item.text}>
              <button className={styles.navButton}>{item.text}</button>
            </Link>
          ))}
        </div>
      </div>

      {/* Started Button */}
      <div className={styles.startedContainer}>
        <Link href={CONTENT.button.link}>
          <Button variant="primary" className={styles.startedButton}>
            {CONTENT.button.text}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
