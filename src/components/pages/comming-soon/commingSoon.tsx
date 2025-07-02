"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "@/Icons";
import { handleError } from "@/utils";
import { addToWaitlist } from "@/requests";
import { Button, Typography } from "@/components/ui";
import Section from "@/components/pages/landing/shared/section";
import { waitlistSchema, WaitlistFormData } from "@/schemas";

const waitlistUsers = [
  "/assets/comming-soon/user-1.png",
  "/assets/comming-soon/user-2.png",
  "/assets/comming-soon/user-3.png",
  "/assets/comming-soon/user-4.png",
  "/assets/comming-soon/user-5.png",
];

const styles = {
  section: "!pb-0 !pt-8 h-screen overflow-hidden flex flex-col",
  logo: "h-6 lg:h-8 mr-auto",
  header: "flex justify-between",
  comingSoonContainer:
    "relative aspect-[283/63] w-[150px] md:w-[200px] lg:w-[283px] md:mt-2 lg:-mr-20",
  content: "flex-1 flex gap-10",
  contentLeft:
    "max-lg:mx-auto max-lg:items-center max-lg:text-center h-full flex flex-col justify-center gap-6 md:max-w-[550px] overflow-x-hidden",
  badge:
    "text-heading flex items-center gap-2 bg-[#E5F2FB] w-fit py-1.5 px-3 rounded-full",
  badgeIcon: "h-4",
  title: "text-heading text-4xl font-medium",
  titleHighlight:
    "font-bold [background-image:var(--gradient-button)] bg-clip-text text-transparent",
  description: "text-sm text-paragraph",
  emailInputContainerWrapper: "max-w-full",
  emailInputContainer:
    "max-md:max-w-full md:w-[420px] h-12 py-1 px-2 flex items-center bg-[#EEEDEDFC] rounded-full border border-[#D9D9D9]",
  emailInput:
    "h-full flex-1 min-w-0 bg-transparent focus:outline-none px-4 text-paragraph text-sm rounded-full",
  emailInputError: "border-red-500",
  errorText: "text-red-500 text-xs pl-6 pt-1 mr-auto text-left",
  joinButton: "rounded-full h-full w-[120px]",
  joinButtonIcon: "h-4 stroke-white -rotate-90 ml-1",
  waitlistContainer: "w-fit flex items-center justify-center flex-wrap gap-5",
  waitlistText: "text-sm text-paragraph",
  waitlistImages: "flex items-center",
  waitlistImage: "-ml-2 bg-gray-100 rounded-full",
  deviceContainer:
    "ml-auto relative aspect-[491/550] max-lg:hidden lg:w-[400px] xl:w-[491px]",
  deviceImage: "my-auto ml-auto",
  footer: "flex items-center justify-center p-4",
  footerText: "text-heading",
  confirmationBox:
    "m-auto bg-element rounded-3xl max-w-[450px] py-12 px-10 text-center border border-stroke shadow-[0_4px_8px_rgba(0,0,0,0.1)] space-y-5",
  confirmationIconBox: "mx-auto bg-[#F4FFFD] rounded-full p-2 h-28 w-28 flex",
  confirmationIcon: "h-16 m-auto",
};

const CommingSoon = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WaitlistFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isAddedToWaitlist, setIsAddedToWaitlist] = useState(false);

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      await addToWaitlist(data);
      setIsAddedToWaitlist(true);
      reset();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Section
      className={styles.section}
      style={{
        backgroundImage: "url('/assets/landing/landing-hero-bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.header}>
        {/* Logo */}
        <Icon name="logoWithGreenText" className={styles.logo} />

        {/* Comming Soon */}
        {!isAddedToWaitlist && (
          <div className={styles.comingSoonContainer}>
            <Image
              src={"/assets/comming-soon/comming-soon-text.svg"}
              alt="Comming Soon Text"
              fill
              priority
            />
          </div>
        )}
      </div>

      {/* Content */}
      {!isAddedToWaitlist ? (
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <Typography level="p1" className={styles.badge}>
              CityPerks 2025 Release – Cutting-edge approach
              <Icon name="rightArrow" className={styles.badgeIcon} />
            </Typography>

            <Typography level="custom" className={styles.title}>
              Join <span className={styles.titleHighlight}>CityPerks</span>{" "}
              Waitlist
            </Typography>

            <Typography level="custom" className={styles.description}>
              A Platform that empowers cities to drive engagement, support local
              businesses, & connect with residents through rewards & real-time
              communication.
            </Typography>

            <div className={styles.emailInputContainerWrapper}>
              <form
                className={styles.emailInputContainer}
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="email"
                  className={`${styles.emailInput} ${
                    errors.email ? styles.emailInputError : ""
                  }`}
                  placeholder="Enter your email"
                  {...register("email")}
                />

                <Button
                  type="submit"
                  size="small"
                  className={styles.joinButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Join waitlist"}
                  <Icon name="chevronDown" className={styles.joinButtonIcon} />
                </Button>
              </form>
              {errors.email && (
                <Typography level="custom" className={styles.errorText}>
                  {errors.email.message}
                </Typography>
              )}
            </div>

            <div className={styles.waitlistContainer}>
              <Typography level="custom" className={styles.waitlistText}>
                Over 200+ have already joined
              </Typography>

              <div className={styles.waitlistImages}>
                {waitlistUsers?.map?.((image, index) => (
                  <Image
                    src={image}
                    key={`${image}-${index}`}
                    alt={`waitlist-item-${index}`}
                    className={styles.waitlistImage}
                    height={35}
                    width={35}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Device */}
          <div className={styles.deviceContainer}>
            <Image
              className={styles.deviceImage}
              src={"/assets/comming-soon/devices.svg"}
              alt="Devices Image"
              fill
              priority
              loading="eager"
              sizes="(min-width: 1280px) 490px, (min-width: 768px) 350px, (min-width: 640px) 300px, 200px"
            />
          </div>
        </div>
      ) : (
        <div className={styles.confirmationBox}>
          <div className={styles.confirmationIconBox}>
            <Icon name="cantLogin" className={styles.confirmationIcon} />
          </div>
          <Typography level="h2">Thanks for Joining Early!</Typography>
          <Typography level="p1">
            You’re now on our waitlist. We’ll keep you updated with the latest
            features, launch announcements, and early access opportunities.
          </Typography>
        </div>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <Typography level="p1" className={styles.footerText}>
          Copyright 2025©cityperks LLC | All Rights Reserved
        </Typography>
      </footer>
    </Section>
  );
};

export default CommingSoon;
