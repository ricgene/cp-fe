"use client";

import React, { forwardRef } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import Typography from "./typography";

// Styles
const styles = {
  switchContainer: "flex items-center gap-2",
  button:
    "w-[42px] h-[22px] rounded-full border-none relative cursor-pointer transition-colors duration-200 focus:outline-none",
  buttonChecked: "bg-primary",
  buttonUnchecked: "bg-[#E3E6ED]",
  thumb:
    "block w-[18px] h-[18px] rounded-full bg-white absolute top-0.5 transition-all duration-200",
  thumbChecked: "left-[22px]",
  thumbUnchecked: "left-0.5",
  labelError: "text-red-500 text-xs ml-2",
  error: "text-[10px] text-red-600 mt-1",
};

// Types
interface BaseSwitchProps {
  name: string;
  labelLeft?: string;
  labelRight?: string;
  error?: string;
  wrapperClassName?: string;
  disabled?: boolean;
  className?: string;
}

interface UncontrolledSwitchProps extends BaseSwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

interface ControlledSwitchProps<T extends FieldValues> extends BaseSwitchProps {
  control: Control<T>;
  name: Path<T>;
}

type SwitchProps<T extends FieldValues> =
  | ControlledSwitchProps<T>
  | UncontrolledSwitchProps;

const SwitchInputComponent = <T extends FieldValues>(
  props: SwitchProps<T>,
  ref: React.Ref<HTMLDivElement>
) => {
  const {
    labelLeft = "Offer",
    labelRight = "Perk",
    error,
    disabled,
    className,
    wrapperClassName,
  } = props;

  const renderSwitch = (value: boolean, onChange: (value: boolean) => void) => (
    <div className={twMerge(styles.switchContainer, className)} ref={ref}>
      <Typography level="p1">{labelLeft}</Typography>

      <button
        type="button"
        role="switch"
        aria-checked={!!value}
        onClick={() => onChange(!value)}
        disabled={disabled}
        className={twMerge(
          styles.button,
          value ? styles.buttonChecked : styles.buttonUnchecked
        )}
      >
        <span
          className={twMerge(
            styles.thumb,
            value ? styles.thumbChecked : styles.thumbUnchecked
          )}
        />
      </button>

      <Typography level="p1">{labelRight}</Typography>
      {error && <span className={styles.labelError}>{error}</span>}
    </div>
  );

  return (
    <div className={wrapperClassName}>
      {"control" in props ? (
        <Controller
          control={props.control}
          name={props.name}
          render={({ field: { value, onChange } }) =>
            renderSwitch(!!value, onChange)
          }
        />
      ) : (
        renderSwitch(!!props.value, props.onChange || (() => {}))
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

const Switch = forwardRef(SwitchInputComponent) as <T extends FieldValues>(
  props: SwitchProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

// @ts-expect-error: displayName is not in the type but is safe to set
Switch.displayName = "Switch";

export default Switch;
