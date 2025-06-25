"use client";

import React, { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "@/Icons";
import { Typography } from "@/components/ui";
import { IconsType } from "@/types";

// Types
interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: IconsType;
  wrapperClassName?: string;
  leftIconClassName?: string;
  selectedFile?: FileList;
  variant?: "primary" | "secondary";
}

// Styles
const styles = {
  container: {
    wrapper: "w-full",
    inputWrapper: "relative mt-1.5",
  },
  leftIcon: "h-4 stroke-unactive mr-3",
  input: {
    base: "w-full flex items-center bg-white border-1 border-stroke rounded-lg h-11 px-4",
    secondary:
      "h-10 bg-element border-divider text-paragraph placeholder:text-unactive",
    file: "absolute top-0 left-0 h-full w-full z-10 opacity-0 cursor-pointer",
    disabled:
      "disabled:opacity-50 disabled:bg-stroke disabled:cursor-not-allowed",
    inner:
      "flex-1 focus:outline-none placeholder:text-paragraph text-sm text-heading no-spinner",
  },
  fileInput: {
    container:
      "relative w-full bg-white border-1 border-stroke rounded-lg !h-20 px-4 flex items-center justify-center gap-2 overflow-hidden",
    text: "text-unactive",
  },
  password: {
    container: "absolute top-0 h-full right-0 flex pr-3",
    toggle: "cursor-pointer m-auto",
  },
  error: "text-[10px] text-red-600 mt-1",
  inputWithIcon: "pr-10",
};

const LabeledInputComponent = (
  {
    name,
    error,
    label,
    leftIcon,
    className,
    selectedFile,
    type = "text",
    variant = "primary",
    wrapperClassName,
    leftIconClassName,
    ...rest
  }: LabeledInputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const isFileType = type === "file";
  const inputType = isPasswordType && showPassword ? "text" : type;

  return (
    <div className={twMerge(styles.container.wrapper, wrapperClassName)}>
      <label htmlFor={name}>
        <Typography level="p1_bold">{label}</Typography>
      </label>

      <div className={styles.container.inputWrapper}>
        {isFileType ? (
          <div
            className={twMerge(
              styles.fileInput.container,
              variant === "secondary" && styles.input.secondary
            )}
          >
            <FileInputContent selectedFile={selectedFile} />
            <input
              ref={ref}
              id={name}
              name={name}
              type="file"
              className={twMerge(
                styles.input.file,
                styles.input.disabled,
                className
              )}
              {...rest}
            />
          </div>
        ) : (
          <React.Fragment>
            <div
              className={twMerge(
                styles.input.base,
                isPasswordType && styles.inputWithIcon,
                styles.input.disabled,
                variant === "secondary" && styles.input.secondary,
                className
              )}
            >
              {leftIcon && (
                <Icon
                  name={leftIcon}
                  className={twMerge(styles.leftIcon, leftIconClassName)}
                />
              )}
              <input
                ref={ref}
                id={name}
                name={name}
                type={inputType}
                autoComplete="off"
                className={styles.input.inner}
                {...rest}
              />
            </div>

            {isPasswordType && (
              <PasswordToggle
                showPassword={showPassword}
                onToggle={() => setShowPassword((prev) => !prev)}
              />
            )}
          </React.Fragment>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  LabeledInputComponent
);
LabeledInput.displayName = "LabeledInput";

export default LabeledInput;

// ------------------------------------------------------------------------------
// File Input Content
const FileInputContent = ({ selectedFile }: { selectedFile?: FileList }) => {
  if (selectedFile?.[0]) {
    return (
      <Typography level="p1" className={styles.fileInput.text}>
        {selectedFile[0].name}
      </Typography>
    );
  }

  return (
    <>
      <Icon name="upload" className="!h-4" />
      <Typography level="p1" className={styles.fileInput.text}>
        Upload Image
      </Typography>
    </>
  );
};

// ------------------------------------------------------------------------------
// Password Toggle
const PasswordToggle = ({
  showPassword,
  onToggle,
}: {
  showPassword: boolean;
  onToggle: () => void;
}) => (
  <div className={styles.password.container}>
    <button type="button" className={styles.password.toggle} onClick={onToggle}>
      {showPassword ? (
        <Icon name="eyeOff" className="!h-4" />
      ) : (
        <Icon name="eye" className="!h-4" />
      )}
    </button>
  </div>
);
