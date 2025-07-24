import { IconsType } from "@/types";
import { ROUTES } from "./app.constants";
/*
 * This file contains all the content for the landing page
 * Change the content in this file to update the landing page
 */

// Header Content
export const LANDING_HEADER_CONTENT = {
  nav: {
    items: [
      { text: "About", link: "#about" },
      { text: "Features", link: "#features" },
      { text: "How it works?", link: "#how-it-works" },
    ],
  },
  button: {
    text: "Get Started",
    link: ROUTES.LOGIN.path,
  },
} as const;

// Hero Content
export const LANDING_HERO_CONTENT = {
  title: "Making Everyday Living Smarter and Safer.",
  description:
    "A Platform that empowers cities to drive engagement, support local businesses, & connect with residents through rewards & real-time communication.",
  tags: {
    top: [
      {
        icon: "percentageCircle" as IconsType,
        title: "Nearby Deals",
        description: "Exclusive offers",
      },
      {
        image: "/assets/shared/earned-icon.png",
        title: "Points Earned",
        description: "800 Points",
      },
    ],
    bottom: [
      {
        image: "/assets/shared/female-avatar.png",
        title: "User Profile",
        description: "John Doe",
      },
      {
        icon: "alertCircle" as IconsType,
        title: "City Alerts",
        description: "Important Updates",
        hasCautionIcon: true,
      },
    ],
  },
  marqueeItems: [
    { icon: "amplitudeIcon", className: "h-5" },
    { icon: "invoice2goIcon", className: "h-5" },
    { icon: "pengIcon", className: "h-4" },
    { icon: "veroxFlorIcon", className: "h-4" },
    { icon: "rpublicIcon", className: "h-4" },
  ] as { icon: IconsType; className: string }[],
};

// Broker 1 Content
export const LANDING_BROKER_1_CONTENT = {
  title: {
    text: "Our Merchants have",
    highlight1: "43%",
    middle: "more",
    highlight2: "Loyal",
    end: "Customers then other Merchants.",
  },
  button: {
    text: "Become a Merchant",
    link: ROUTES.REGISTER.path,
  },
};

// Why CityPerks Content
export const LANDING_WHY_CP_CONTENT = {
  title: "Why CityPerks?",
  cards: {
    residents: {
      title: "For Residents:",
      items: [
        "Get notified about city alerts, local events, & exclusive offers.",
        "Earn digital points for good deeds.",
        "Build strong community connections.",
        "Get amazing exclusive offers.",
        "Redeem perks using your earned points – just scan and enjoy!",
        "Build strong community connections.",
        "Enjoy Local Events.",
        "Earn digital points for good deeds.",
      ],
    },
    businesses: {
      title: "For Local Businesses:",
      items: [
        "Publish offers & perks to nearby residents.",
        "Boost foot traffic with location-based engagement.",
        "Customize perks based on residents' preferences",
      ],
    },
    admins: {
      title: "For City Admins:",
      items: [
        "Share emergency alerts & community updates.",
        "Reward civic participation with digital points.",
        "Gain insights on resident activity & merchant performance.",
      ],
    },
  },
};

// Track Engagement Content
export const LANDING_TRACK_ENGAGEMENT_CONTENT = {
  smartTitle: "Join Community and Receive Real-Time City Alerts",
  engagementTitle: {
    line1: "Track Engagement.",
    line2: "Shape Smart Communities.",
  },
  engagementDescription:
    "CityPerks gives local governments the tools to act with clarity—offering secure, realtime insights that support smarter policy, economic growth, and resident engagement.",
};

// Broker 2 Content
export const LANDING_BROKER_2_CONTENT = {
  title: "Ready to Build a Stronger Community?",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscin elit. Praesent eget purus at nibh gravida porta et eget enim.",
};

// How CityPerks Works Content
export const LANDING_HOW_CP_WORKS_CONTENT = {
  smartTitle: "Join Community and Receive Real-Time City Alerts",
  title: "How CityPerks Works?",
  cards: [
    {
      image: "/assets/landing/landing-how-cp-works-card-1.png",
      title: "Register - Create Account",
      description:
        "Download the App and Register as a Resident, Merchant, or Admin.",
    },
    {
      image: "/assets/landing/landing-how-cp-works-card-2.png",
      title: "Interact with Community",
      description:
        "Interact with your city, whether it's shopping locally or helping a neighbor.",
    },
    {
      image: "/assets/landing/landing-how-cp-works-card-3.png",
      title: "Earn Rewards",
      description:
        "Collect points through approved actions and redeem perks at local outlets.",
    },
    {
      image: "/assets/landing/landing-how-cp-works-card-4.png",
      title: "Redeem Points",
      description:
        "Present the QR code to the Merchant when ordering. One - time use only.",
    },
  ],
};

// Stories Content
export const LANDING_STORIES_CONTENT = {
  title: "Stories from Users",
  rating: {
    score: "Excellent",
    reviewCount: "456 reviews",
  },
  stories: [
    {
      date: "2 days ago",
      title: "Best on the market",
      content:
        "I love this product because the support is great. Please Support",
      author: "Worldtraveler",
    },
    {
      date: "1 week ago",
      title: "Amazing experience",
      content:
        "The service was exceptional and the team was very helpful throughout the process.",
      author: "TravelEnthusiast",
    },
    {
      date: "2 weeks ago",
      title: "Highly recommended",
      content:
        "Great value for money and excellent customer service. Will use again!",
      author: "CityExplorer",
    },
    {
      date: "2 days ago",
      title: "Best on the market",
      content:
        "I love this product because the support is great. Please Support",
      author: "Worldtraveler",
    },
    {
      date: "1 week ago",
      title: "Amazing experience",
      content:
        "The service was exceptional and the team was very helpful throughout the process.",
      author: "TravelEnthusiast",
    },
    {
      date: "2 weeks ago",
      title: "Highly recommended",
      content:
        "Great value for money and excellent customer service. Will use again!",
      author: "CityExplorer",
    },
  ],
};

// FAQ Content
export const LANDING_FAQ_CONTENT = {
  title: "Frequently asked questions",
  faqs: [
    {
      question: "What is CityPerks?",
      answer:
        "CityPerks is a community-driven platform that connects local residents with exclusive perks, discounts, and events from businesses and organizations in their city.",
    },
    {
      question: "How do I join CityPerks?",
      answer:
        "You can sign up for CityPerks by creating an account on our website. Simply provide your name, email address, and location to get started and access all the community benefits.",
    },
    {
      question: "Is CityPerks free to use?",
      answer:
        "Yes! CityPerks is completely free for users. Our goal is to help you discover and enjoy the best your city has to offer without any subscription fees.",
    },
    {
      question: "How can businesses join CityPerks?",
      answer:
        "Local businesses can partner with CityPerks by registering through our Business Portal. Once approved, you can offer perks, promote events, and connect with the local community.",
    },
    {
      question: "What kind of perks can I expect?",
      answer:
        "Perks range from discounts at restaurants and cafes to free event tickets, local tours, and special offers from gyms, wellness centers, and more. Perks are updated regularly to keep things fresh.",
    },
    {
      question: "Can I suggest a business to be added to CityPerks?",
      answer:
        "Absolutely! We love community suggestions. You can recommend a local business by filling out the 'Suggest a Partner' form in your dashboard or emailing us directly.",
    },
  ],
};

// Broker 3 Content
export const LANDING_BROKER_3_CONTENT = {
  title: "Ready to Build a Stronger Community?",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscin elit.",
};

// Footer Content
export const LANDING_FOOTER_CONTENT = {
  copyright: "Copyright 2025©cityperks LLC | All Rights Reserved",
  socialLinks: [
    {
      name: "facebook",
      icon: "facebook" as IconsType,
      link: "https://www.cityperks.co/",
    },
    {
      name: "twitter",
      icon: "twitter" as IconsType,
      link: "https://www.cityperks.co/",
    },
    {
      name: "instagram",
      icon: "instagram" as IconsType,
      link: "https://www.cityperks.co/",
    },
    {
      name: "linkedin",
      icon: "linkedin" as IconsType,
      link: "https://www.cityperks.co/",
    },
  ],
};
