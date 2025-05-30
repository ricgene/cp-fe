import Icon from "@/Icons";
import { Typography } from "@/components/ui";
import { IconsType } from "@/types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props {
  icon?: IconsType;
  image?: string;
  className?: string;
  description: string;
  title: React.ReactNode;
}

const styles = {
  tag: "scale-75 md:scale-90 lg:scale-100 w-fit px-3.5 py-2.5 rounded-xl bg-element border-[0.5px] border-unactive flex items-center justify-center gap-2",
  icon: "h-6",
  image: "rounded-full -mx-1",
  title: "text-[9px] font-semibold",
  description: "text-[8px]",
};

const Tag = ({ icon, image, title, description, className }: Props) => {
  return (
    <div className={twMerge(styles.tag, className)}>
      {image && (
        <Image
          src={image || "/assets/shared/fallback-avatar.png"}
          alt={"tag_image"}
          height={30}
          width={30}
          className={styles.image}
        />
      )}
      {icon && <Icon name={icon} className={styles.icon} />}
      <div className="">
        <Typography level="custom" className={styles.title}>
          {title}
        </Typography>
        <Typography level="custom" className={styles.description}>
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default Tag;
