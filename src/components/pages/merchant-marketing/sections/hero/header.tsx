import Link from "next/link";
import Icon from "@/Icons";
import { PathsEnum } from "@/enums";

const styles = {
  header: "flex items-center gap-2",
  //
  logoContainer: "flex-1",
  logo: "h-6 lg:h-8 mr-auto",
  //
  navContainer: "flex-1 max-lg:hidden",
  nav: "w-fit flex items-center gap-4 xl:gap-6 mx-auto",
  navButton:
    "text-sm font-medium text-white p-2 cursor-pointer text-nowrap hover:opacity-80",
  //
  startedContainer: "flex-1 flex items-center justify-end",
  startedButton:
    "rounded-full h-8 px-3 md:h-9 md:px-4 lg:h-10 lg:px-5 !text-xs md:!text-sm lg:text-base border border-element flex items-center gap-2 text-white bg-element/30 cursor-pointer hover:opacity-80",
};

const Header = () => {
  const NAV_ITEMS = [
    {
      text: "About",
      link: "/",
    },
    {
      text: "Benifits",
      link: "/",
    },
    {
      text: "How it works?",
      link: "/",
    },
    {
      text: "Testimonials",
      link: "/",
    },
  ];
  return (
    <div className={styles.header}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Icon
          name="logoWithWhiteText"
          href={PathsEnum.DASHBOARD}
          className={styles.logo}
        />
      </div>

      {/* Nav */}
      <div className={styles.navContainer}>
        <div className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link href={item.link} key={item.text}>
              <button className={styles.navButton}>{item.text}</button>
            </Link>
          ))}
        </div>
      </div>

      {/* Started Button */}
      <div className={styles.startedContainer}>
        <Link href={"/demo"}>
          <button className={styles.startedButton}>
            Book a Demo
            <Icon name="demo" className="h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
