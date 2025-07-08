"use client";

import React, { useEffect, useState } from "react";
import CookieBanner from "./cookie-banner";
import NewsletterForm from "./newsletter-form";

const Banners = () => {
  const [cookieManaged, setCookieManaged] = useState<boolean | null>(null);
  const [showCookie, setShowCookie] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    const managed = localStorage.getItem("cookie-banner-managed");
    const subscribed = localStorage.getItem("newsletter-subscribed");
    if (subscribed) {
      setNewsletterSubscribed(true);
    }
    if (!managed) {
      setCookieManaged(false);
      setShowCookie(true);
    } else {
      setCookieManaged(true);
      if (!subscribed) {
        setShowNewsletter(true);
      }
    }
  }, []);

  const handleCookieManaged = () => {
    localStorage.setItem("cookie-banner-managed", "true");
    setShowCookie(false);
    setCookieManaged(true);
    setTimeout(() => {
      if (!newsletterSubscribed) {
        setShowNewsletter(true);
      }
    }, 1000);
  };

  return (
    <>
      {showCookie && !cookieManaged && (
        <CookieBanner onManaged={handleCookieManaged} />
      )}
      {showNewsletter && cookieManaged && !newsletterSubscribed && (
        <NewsletterForm />
      )}
    </>
  );
};

export default Banners;
