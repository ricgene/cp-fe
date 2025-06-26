"use client";

import { twMerge } from "tailwind-merge";
import React, { forwardRef, useState, useRef } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import Icon from "@/Icons";
import { useOutsideClick } from "@/hooks";
import { Typography } from "@/components/ui";
import { IconsType } from "@/types";

// Types
type SelectOption = {
  value: string;
  label: string;
};

type SelectSize = "default" | "small";
type SelectVariant = "primary" | "secondary";

interface BaseSelectProps {
  name: string;
  label?: string;
  error?: string;
  icon?: IconsType;
  size?: SelectSize;
  className?: string;
  disabled?: boolean;
  rotateIcon?: boolean;
  leftIcon?: IconsType;
  placeholder?: string;
  options: SelectOption[];
  variant?: SelectVariant;
  optionClassName?: string;
  wrapperClassName?: string;
  dropdownClassName?: string;
  leftIconClassName?: string;
  onChange?: (value: string) => void;
}

export interface UncontrolledSelectProps extends BaseSelectProps {
  value?: string;
}

export interface ControlledSelectProps<T extends FieldValues>
  extends BaseSelectProps {
  control: Control<T>;
  name: Path<T>;
}

type SelectProps<T extends FieldValues> =
  | ControlledSelectProps<T>
  | UncontrolledSelectProps;

const styles = {
  wrapper: {
    base: "w-full",
    small: "w-[90px]",
  },
  selectWrapper: {
    base: "relative mt-1.5",
    small: "!mt-0",
  },
  select: {
    base: "w-full bg-white border-1 border-stroke rounded-lg h-11 px-4 focus:outline-none placeholder:text-paragraph text-sm text-heading appearance-none flex items-center justify-between cursor-pointer",
    secondary: "h-10 !bg-element !border-divider !text-paragraph",
    emptySecondary: "!text-unactive",
    small: "h-8 px-3 text-xs rounded-md !border-divider",
    empty: "!text-paragraph",
    disabled: "!bg-stroke !cursor-not-allowed !opacity-50",
    leftIcon: "h-4 stroke-unactive mr-3",
  },
  error: "text-[10px] text-red-600 mt-1",
  dropdown: {
    base: "absolute top-full left-0 min-w-full mt-1 bg-white border-1 border-divider rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto",
    small: "rounded-md",
  },
  option: {
    base: "px-4 py-2 text-sm text-paragraph hover:bg-stroke cursor-pointer",
    small: "px-3 py-3",
    selected: "bg-stroke",
  },
  divider: "mx-1 border-b-[0.5px] border-divider",
  chevron: {
    base: "ml-auto h-4 w-4 stroke-paragraph transition-transform duration-200",
    open: "rotate-180",
  },
} as const;

const SelectComponent = <T extends FieldValues>(
  props: SelectProps<T>,
  ref: React.Ref<HTMLDivElement>
) => {
  const {
    name,
    label,
    error,
    options,
    leftIcon,
    disabled,
    className,
    placeholder,
    optionClassName,
    size = "default",
    wrapperClassName,
    dropdownClassName,
    leftIconClassName,
    variant = "primary",
    icon = "chevronDown",
    rotateIcon = true,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const renderSelect = (value: string, onChange: (value: string) => void) => {
    const selectedOption = options.find((opt) => opt.value === value);
    const displayValue = selectedOption
      ? selectedOption.label
      : placeholder || (size === "small" ? name : `Select a ${name}`);

    return (
      <div
        className={twMerge(
          styles.selectWrapper.base,
          size === "small" && styles.selectWrapper.small
        )}
      >
        <div
          ref={ref}
          id={name}
          className={twMerge(
            styles.select.base,
            !value && styles.select.empty,
            size === "small" && styles.select.small,
            variant === "secondary" && styles.select.secondary,
            variant === "secondary" && !value && styles.select.emptySecondary,
            disabled && styles.select.disabled,
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {leftIcon && (
            <Icon
              name={leftIcon}
              className={twMerge(styles.select.leftIcon, leftIconClassName)}
            />
          )}
          <span>{displayValue}</span>

          <Icon
            name={icon}
            className={twMerge(
              styles.chevron.base,
              isOpen && rotateIcon && styles.chevron.open
            )}
          />
        </div>

        {isOpen && !disabled && (
          <SelectDropdown
            size={size}
            options={options}
            selectedValue={value}
            optionClassName={optionClassName}
            dropdownClassName={dropdownClassName}
            onSelect={(newValue) => {
              onChange(newValue);
              setIsOpen(false);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div
      className={twMerge(
        styles.wrapper.base,
        size === "small" && styles.wrapper.small,
        wrapperClassName
      )}
      ref={dropdownRef}
    >
      {label && (
        <label htmlFor={name}>
          <Typography level="p1_bold">{label}</Typography>
        </label>
      )}

      {"control" in props ? (
        <Controller
          control={props.control}
          name={props.name}
          render={({ field: { value, onChange } }) => {
            const handleChange = (newValue: string) => {
              onChange(newValue);
              if ("onChange" in props) {
                props.onChange?.(newValue);
              }
            };
            return renderSelect(value, handleChange);
          }}
        />
      ) : (
        renderSelect(props.value || "", props.onChange || (() => {}))
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

// ------------------------------------------------------------------------------
// Select

type SelectType = <T extends FieldValues>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

const Select = forwardRef(SelectComponent) as SelectType & {
  displayName: string;
};
Select.displayName = "Select";

export default Select;

// ------------------------------------------------------------------------------
// Select Dropdown Component

interface SelectDropdownProps {
  size: SelectSize;
  selectedValue: string;
  options: SelectOption[];
  optionClassName?: string;
  dropdownClassName?: string;
  onSelect: (value: string) => void;
}

const SelectDropdown = ({
  size,
  options,
  selectedValue,
  optionClassName,
  dropdownClassName,
  onSelect,
}: SelectDropdownProps) => (
  <div
    className={twMerge(
      styles.dropdown.base,
      size === "small" && styles.dropdown.small,
      dropdownClassName
    )}
  >
    {options?.map((option, index) => (
      <React.Fragment key={option.value + index}>
        <div
          className={twMerge(
            styles.option.base,
            size === "small" && styles.option.small,
            option.value === selectedValue && styles.option.selected,
            optionClassName
          )}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </div>
        {index !== options.length - 1 && <div className={styles.divider} />}
      </React.Fragment>
    ))}
  </div>
);
