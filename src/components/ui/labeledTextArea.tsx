"use client";

import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "@/components/ui";

interface LabeledTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  wrapperClassName?: string;
  variant?: "primary" | "secondary";
}

const styles = {
  container: {
    wrapper: "w-full",
    textareaWrapper: "relative mt-1.5",
  },
  textarea: {
    base: "w-full bg-white border-1 border-stroke rounded-lg px-4 py-2 focus:outline-none placeholder:text-paragraph text-sm text-heading resize-none",
    secondary:
      "bg-element border-divider text-paragraph placeholder:text-unactive",
  },
  error: "text-[10px] text-red-600 mt-1",
};

const LabeledTextAreaComponent = (
  {
    name,
    error,
    label,
    variant = "primary",
    wrapperClassName,
    rows = 3,
    ...rest
  }: LabeledTextAreaProps,
  ref: React.Ref<HTMLTextAreaElement>
) => {
  return (
    <div className={twMerge(styles.container.wrapper, wrapperClassName)}>
      <label htmlFor={name}>
        <Typography level="p1_bold">{label}</Typography>
      </label>

      <div className={styles.container.textareaWrapper}>
        <textarea
          ref={ref}
          id={name}
          name={name}
          rows={rows}
          className={twMerge(
            styles.textarea.base,
            variant === "secondary" && styles.textarea.secondary
          )}
          {...rest}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

const LabeledTextArea = forwardRef<HTMLTextAreaElement, LabeledTextAreaProps>(
  LabeledTextAreaComponent
);
LabeledTextArea.displayName = "LabeledTextArea";

export default LabeledTextArea;
