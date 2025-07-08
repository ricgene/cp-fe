"use client";

import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "@/Icons";
import { handleError } from "@/utils";
import { subscribeToNewsletter } from "@/requests";
import { Button, Typography } from "@/components/ui";
import { EmailFormData, emailSchema } from "@/schemas";

const styles = {
  container:
    "absolute bottom-2 right-2 bg-element flex flex-col gap-2 p-4 w-[95%] max-md:max-w-[500px] md:w-[600px] rounded-lg border border-points transition-all duration-700 ease-in-out opacity-0 translate-y-10 pointer-events-none",
  containerVisible: "opacity-100 !translate-y-0 pointer-events-auto",
  closeIcon: "w-6 h-6 ml-auto stroke-heading",
  mailIconContainer:
    "bg-[#F4FFFD] border border-white h-16 w-16 rounded-full flex mx-auto",
  mailIcon: "w-10 h-10 m-auto ",
  heading: "text-heading text-center",
  description: "mt-2 text-center mx-auto",
  emailInputContainer:
    "max-md:max-w-full md:w-[400px] h-11 py-1 px-2 flex items-center bg-white rounded-full border border-[#D9D9D9] my-6 mx-auto",
  emailInput:
    "h-full flex-1 min-w-0 bg-transparent focus:outline-none px-4 text-paragraph text-sm rounded-full",
  emailInputError: "border-red-500",
  errorText: "text-red-500 text-xs pl-6 pt-1 mr-auto text-left",
  joinButton: "rounded-full h-full w-[120px]",
  joinButtonIcon: "h-4 stroke-white -rotate-90 ml-1",
  policyText: "mt-2 mb-8 text-center",
};

const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmailFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const closeForm = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
    }, 700);
  };

  const onSubmit = async (data: EmailFormData) => {
    try {
      await subscribeToNewsletter(data);
      toast.success("You have been added to the waitlist");
      reset();
      localStorage.setItem("newsletter-subscribed", "true");
      closeForm();
    } catch (error) {
      handleError(error);
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className={twMerge(
        styles.container,
        isVisible && styles.containerVisible
      )}
    >
      <Button variant="text" className="!p-0" onClick={closeForm}>
        <Icon name="close" className={styles.closeIcon} />
      </Button>

      <div className="flex flex-col gap-2 px-4 sm:px-10">
        <div
          className={styles.mailIconContainer}
          style={{
            boxShadow:
              "0px 4px 28.4px #E9FFF5, inset 0px 4px 4px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Icon name="mail1" className={styles.mailIcon} />
        </div>
        <Typography level="h2" className={styles.heading}>
          Subscribe to Our Newsletter
        </Typography>
        <Typography level="p1" className={styles.description}>
          Stay up to date with the latest articles and business updates. You’ll
          even get special recommendations weekly.
        </Typography>
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
            {isSubmitting ? "Subscribing..." : "Subscribe"}
            <Icon name="chevronDown" className={styles.joinButtonIcon} />
          </Button>
        </form>
        <Typography level="p1" className={styles.policyText}>
          By subscribing, you agree to our privacy policy and terms of services.
        </Typography>
      </div>
    </div>
  );
};

export default NewsletterForm;
