"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import Icon from "@/Icons";
import MenuItem from "./menuItem";
import { logout } from "@/requests";
import { handleError } from "@/utils";
import {
  MERCHANT_MENU_ITEMS,
  ADMIN_MENU_ITEMS,
  ROUTES,
  DISABLED_MENU_ITEMS,
} from "@/constants";
import { Typography, Button } from "@/components/ui";
import ExpandableMenuItem from "./expandableMenuItem";
import { useMobileSidebar } from "@/store/mobileSidebar.atom";
import { useUserData } from "@/store/userData.atom";
import { RoleEnum } from "@/enums";

interface Props {
  pathname: string;
}

interface ProfileSectionProps {
  name: string;
  role: string;
  avatarSrc: string;
  loading: boolean;
}

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

const styles = {
  wrapper: {
    base: "max-md:absolute max-md:top-0 max-md:left-0 max-md:h-full max-md:z-20 max-md:w-full max-md:-translate-x-full  max-md:ease-in-out max-md:transition-opacity max-md:duration-300 max-md:opacity-0",
    open: "max-md:translate-x-0",
    visible: "max-md:opacity-100",
  },
  container: "relative h-full w-full flex",
  backdrop:
    "md:hidden absolute top-0 left-0 h-full w-full bg-black/20 transition-opacity duration-300",
  sidebar: {
    base: "w-[230px] h-full [background:var(--gradient-button)] flex flex-col text-white z-10 relative",
    header: "flex items-center justify-between px-4 py-4.5",
    nav: "flex flex-col gap-1 px-2 py-4 text-[13px] overflow-y-auto",
  },
  closeButton: {
    base: "md:hidden relative z-10 !ml-auto mr-3 mt-2 h-12 w-12 !opacity-100 duration-150",
    hover: "hover:scale-95",
  },
  button: {
    base: "cursor-pointer transition-opacity duration-300 ease-in-out",
    hover: "hover:opacity-70",
  },
  profile: {
    container: "flex gap-3 px-4 py-3",
    name: "!text-white font-medium",
    role: "!text-white mt-0.5 text-sm",
    status: {
      container: "flex items-center gap-0.5 mt-1",
      dot: "bg-[#50CD89] h-1 w-1 rounded-full",
      text: "!text-[#50CD89] text-[9px] font-medium",
    },
  },
  search: {
    container: "gap-3 px-4 py-4",
    inputContainer: "relative",
    icon: "h-5 fill-white absolute top-1/2 left-2 -translate-y-1/2",
    input:
      "w-full h-8 bg-white/[0.1] border-none focus:outline-none rounded-md text-white placeholder:text-white/70 font-light text-sm pl-8 transition-colors duration-200",
  },
  divider: "border-b border-white/10",
  closeIcon: "h-4 w-4 stroke-white",
} as const;

const Sidebar = ({ pathname }: Props) => {
  const router = useRouter();
  const { userData } = useUserData();
  const { isOpen, closeSidebar } = useMobileSidebar();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([
    "Offers",
    "Points",
    "Merchants",
  ]);
  const MENU_ITEMS = !!userData
    ? userData?.role === RoleEnum.MERCHANT
      ? MERCHANT_MENU_ITEMS
      : ADMIN_MENU_ITEMS
    : DISABLED_MENU_ITEMS;

  const toggleMenu = (menu: string) => {
    if (expandedMenus.includes(menu)) {
      setExpandedMenus((prev) => prev.filter((item) => item !== menu));
    } else {
      setExpandedMenus((prev) => [...prev, menu]);
    }
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleCloseSidebar = () => {
    setIsVisible(false);

    setTimeout(() => {
      closeSidebar();
    }, 300);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      toast.success(response.data.mesage || "Logged out successfully");
      router.push(ROUTES.LOGIN.path);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  return (
    <div
      className={twMerge(
        styles.wrapper.base,
        isOpen && styles.wrapper.open,
        isVisible && styles.wrapper.visible
      )}
    >
      <div className={styles.container}>
        {/* backdrop */}
        <div className={twMerge(styles.backdrop)} />

        {/* Sidebar */}
        <div className={styles.sidebar.base}>
          <div className={styles.sidebar.header}>
            <Icon name="logoWithWhiteText" className="h-6" />
            <button
              onClick={handleLogout}
              className={twMerge(styles.button.base, styles.button.hover)}
            >
              <Icon name="logout" className="h-6" />
            </button>
          </div>

          <Divider />

          <ProfileSection
            loading={!userData}
            name={userData?.name || "..."}
            role={userData?.role || "..."}
            avatarSrc={
              userData?.image?.url || "/assets/shared/fallback-avatar.png"
            }
          />

          <Divider />

          <SearchSection onSearch={handleSearch} />

          <Divider />

          <nav className={styles.sidebar.nav}>
            {MENU_ITEMS.map((item, index) =>
              item.items ? (
                <ExpandableMenuItem
                  icon={item.icon}
                  key={item.label + index}
                  label={item.label}
                  items={item.items}
                  activePath={pathname}
                  isOpen={expandedMenus.includes(item.label)}
                  onToggle={() => toggleMenu(item.label)}
                />
              ) : (
                <MenuItem key={item.label} activePath={pathname} {...item} />
              )
            )}
          </nav>
        </div>

        {/* Close Button */}
        <Button
          className={twMerge(styles.closeButton.base, styles.closeButton.hover)}
          onClick={handleCloseSidebar}
        >
          <Icon name="close" className={styles.closeIcon} />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

// ------------------------------------------------------------------------------
// Profile Section Component
const ProfileSection = ({
  name,
  role,
  avatarSrc,
  loading,
}: ProfileSectionProps) => (
  <div className={styles.profile.container}>
    {loading ? (
      <React.Fragment>
        <div className="animate-pulse bg-gradient-to-r from-stroke/50 via-stroke to-stroke/50 bg-[length:200%_100%] h-[55px] aspect-square rounded-full" />
        <div>
          <div className="animate-pulse bg-gradient-to-r from-stroke/50 via-stroke to-stroke/50 bg-[length:200%_100%] rounded h-3 w-16" />
          <div className="animate-pulse bg-gradient-to-r from-stroke/50 via-stroke to-stroke/50 bg-[length:200%_100%] rounded h-4 w-24 my-2" />
          <div className="animate-pulse bg-gradient-to-r from-stroke/50 via-stroke to-stroke/50 bg-[length:200%_100%] rounded h-2 w-12" />
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Image
          src={avatarSrc}
          alt="profile"
          width={55}
          height={55}
          className="rounded-full"
        />
        <div>
          <Typography level="p1_bold" className={styles.profile.name}>
            {name}
          </Typography>
          <Typography level="p1" className={styles.profile.role}>
            {role}
          </Typography>
          <div className={styles.profile.status.container}>
            <span className={styles.profile.status.dot} />
            <Typography level="custom" className={styles.profile.status.text}>
              online
            </Typography>
          </div>
        </div>
      </React.Fragment>
    )}
  </div>
);

// ------------------------------------------------------------------------------
// Search Section Component
const SearchSection = ({ onSearch }: SearchSectionProps) => (
  <div className={styles.search.container}>
    <div className={styles.search.inputContainer}>
      <Icon name="search" className={styles.search.icon} />
      <input
        type="text"
        className={styles.search.input}
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  </div>
);

// ------------------------------------------------------------------------------
// Divider Component
const Divider = () => <div className={styles.divider} />;
