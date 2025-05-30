"use client";

import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Typography } from "@/components/ui";

interface Props {
  label: string;
  error?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
  onChange?: (
    value: string,
    data: {
      countryCode: string;
      dialCode: string;
      format: string;
      name: string;
    },
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => void;
}

const styles = {
  wrapper: "w-full",
  label: "block mb-1.5",
  error: "text-[10px] text-red-600 mt-1",
  container:
    "!relative flex w-full bg-white border-1 border-stroke rounded-lg h-11",
  inputWrapper: "mt-1.5",
  input:
    "!flex-1 !order-2 min-h-full !border-none !outline-none !rounded-lg !px-4 !text-left",
  button:
    "!static !left-0 !bg-transparent !order-1 !border-none !outline-none !rounded-lg hover:!rounded-lg hover: [&>div]:!rounded-lg",
  dropdown:
    "!absolute !top-full !left-0 !min-w-full !max-w-full !mt-1 !bg-white !border-1 !border-divider !rounded-lg !shadow-lg !z-10 !max-h-60 !text-paragraph !overflow-y-auto",
  dropdownItem:
    "[&_li]:relative  [&_li]:!px-4 [&_li]:!py-2 [&_li]:!mb-[1px]  [&_li:not(:first-child)]:hover:!bg-stroke ",
  dropdownItemSelected: "[&>li[aria-selected='true']]:!bg-stroke",
  dropdownItemDivider:
    "[&_li:not(:last-child)::before]:content-['']  [&_li:not(:last-child)::before]:absolute [&_li:not(:last-child)::before]:left-0 [&_li:not(:last-child)::before]:!-bottom-0  [&_li:not(:last-child)::before]:!w-[calc(100%-8px)]  [&_li:not(:last-child)::before]:!z-10  [&_li:not(:last-child)::before]:!-mb-[1px] [&_li:not(:last-child)::before]:!mx-1  [&_li:not(:last-child)::before]:!border-b-[0.5px] [&_li:not(:last-child)::before]:!border-b-divider",
};

const LabeledPhoneInputComponent = (
  {
    label,
    error,
    value,
    disabled,
    className,
    wrapperClassName,
    onChange,
  }: Props,
  ref: React.Ref<HTMLDivElement>
) => {
  return (
    <div className={twMerge(styles.wrapper, wrapperClassName)}>
      <label>
        <Typography level="p1_bold">{label}</Typography>
      </label>

      <div className={styles.inputWrapper} ref={ref}>
        <PhoneInput
          country="us"
          value={value}
          autoFormat={true}
          disabled={disabled}
          enableSearch={true}
          disableSearchIcon={true}
          countryCodeEditable={false}
          inputClass={styles.input}
          buttonClass={styles.button}
          dropdownClass={twMerge(
            styles.dropdown,
            styles.dropdownItem,
            styles.dropdownItemSelected,
            styles.dropdownItemDivider
          )}
          searchClass="!bg-white hover:!bg-white !py-0 !z-20 !shadow [&>input]:!w-full [&>input]:!m-0 [&>input]:!border-none [&>input]:!shadow-none"
          containerClass={twMerge(styles.container, className)}
          onChange={onChange}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

const LabeledPhoneInput = forwardRef<HTMLDivElement, Props>(
  LabeledPhoneInputComponent
);
LabeledPhoneInput.displayName = "LabeledPhoneInput";

export default LabeledPhoneInput;
