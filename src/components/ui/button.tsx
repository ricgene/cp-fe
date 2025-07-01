import React from "react";
import { twMerge } from "tailwind-merge";
import { Loader } from "@/components/ui";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "text";
  size?: "default" | "small";
  loading?: boolean;
}

const styles = {
  button: {
    base: "min-w-fit h-11 px-4 text-base rounded-lg cursor-pointer hover:opacity-80 duration-300 ease-in-out disabled:opacity-60 flex items-center justify-center disabled:cursor-default",
    small: "h-8 px-3.5 text-xs rounded-md",
  },
  variant: {
    primary: "[background:var(--gradient-button)] text-white",
    secondary: "bg-primary/10 text-primary border-1 border-divider",
    text: "bg-transparent text-paragraph",
  },
  loader: {
    base: "h-4",
    secondary: "stroke-primary",
  },
};

const Button = ({
  children,
  disabled,
  className,
  loading = false,
  size = "default",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  return (
    <button
      className={twMerge(
        styles.button.base,
        size === "small" && styles.button.small,
        styles.variant[variant],
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <Loader
          className={twMerge(
            styles.loader.base,
            variant === "secondary" && styles.loader.secondary
          )}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
