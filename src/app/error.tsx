"use client";

import Link from "next/link";
import Image from "next/image";
import { PathsEnum } from "@/enums";
import { Button } from "@/components/ui";

const styles = {
  container:
    "h-screen p-8 md:p-16 lg:p-20 w-full flex flex-col items-center justify-center gap-6 md:gap-8",
  imageWrapper: "relative aspect-[459/304] w-full max-w-[450px] mb-5 md:mb-10",
  button: "rounded-full",
};

export default function GlobalError() {
  return (
    <html>
      <body className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image src={"/assets/shared/error.svg"} alt="Error Image" fill />
        </div>

        <Link href={PathsEnum.DASHBOARD}>
          <Button size="small" className={styles.button}>
            Back to Home
          </Button>
        </Link>
      </body>
    </html>
  );
}
