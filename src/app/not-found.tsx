import Link from "next/link";
import Image from "next/image";
import { PathsEnum } from "@/enums";
import { Button, Typography } from "@/components/ui";

const styles = {
  container:
    "h-screen p-8 md:p-16 lg:p-20 w-full flex flex-col items-center justify-center gap-6 md:gap-8",
  imageWrapper: "relative aspect-[778/270] w-full max-w-[700px] mb-5 md:mb-10",
  button: "rounded-full",
};

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image src={"/assets/shared/404.svg"} alt="404 Image" fill />
      </div>

      <Typography level="h2">Page Not Found</Typography>

      <Link href={PathsEnum.DASHBOARD}>
        <Button size="small" className={styles.button}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
