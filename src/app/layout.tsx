import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { Poppins } from "next/font/google";
import { getLayoutData } from "@/requests/server-side.requests";
import { AppLayout } from "@/components/shared";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CityPerks",
  description: "CityPerks Merchant & Admin Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // fetch static data
  const data = await getLayoutData();

  return (
    <html lang="en">
      <body className={twMerge(poppins.className, "h-screen")}>
        <AppLayout staticData={data.staticData} user={data.user}>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
