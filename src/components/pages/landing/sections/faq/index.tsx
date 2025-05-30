"use client";

import React, { useState, useRef } from "react";
import Icon from "@/Icons";
import Section from "../../shared/section";
import Typography from "@/components/ui/typography";
import { LANDING_FAQ_CONTENT as CONTENT } from "@/constants";

const styles = {
  section: "relative text-center pb-20 lg:pb-60",
  title: "z-10 lg:text-4xl",
  //
  faqList: "space-y-4 mt-10 lg:mt-16",
  faqItem:
    "bg-element rounded-[36px] py-4 px-6 text-left transition-all duration-300 cursor-pointer",
  question: "font-semibold flex items-center justify-between",
  answerWrapper: "overflow-hidden transition-all duration-500 ease-in-out",
  answer: "mt-4 lg:text-sm",
  icon: "ml-4 transition-transform duration-300",
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <Section className={styles.section}>
      {/* Title */}
      <Typography level="l2" className={styles.title}>
        {CONTENT.title}
      </Typography>

      {/* FAQs */}
      <div className={styles.faqList}>
        {CONTENT.faqs.map((item, idx) => {
          // for animating the dropdown
          const isOpen = openIndex === idx;
          const contentHeight = answerRefs.current[idx]?.scrollHeight || 0;
          return (
            <div
              key={idx + item.question}
              className={styles.faqItem}
              onClick={() => handleToggle(idx)}
            >
              {/* Question */}
              <div className={styles.question}>
                <Typography level="h2" className={styles.question}>
                  {item.question}
                </Typography>
                <span
                  className={styles.icon}
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Icon name="chevronDown" className="h-5 stroke-paragraph" />
                </span>
              </div>

              {/* Answer */}
              <div
                ref={(el) => {
                  // for animating the dropdown
                  answerRefs.current[idx] = el;
                }}
                className={styles.answerWrapper}
                style={{
                  // for animating the dropdown
                  maxHeight: isOpen ? contentHeight + 32 : 0,
                  opacity: isOpen ? 1 : 0,
                  marginTop: isOpen ? 16 : 0,
                }}
              >
                <div className={styles.answer}>
                  <Typography level="p1" className={styles.answer}>
                    {item.answer}
                  </Typography>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default FAQ;
