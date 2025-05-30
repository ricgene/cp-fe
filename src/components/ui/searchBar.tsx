"use client";

import Icon from "@/Icons";
import { useEffect, useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import debounce from "lodash.debounce";

export interface SearchBarProps {
  className?: string;
  placeholder?: string;
  debounceDelay?: number;
  iconClassName?: string;
  disableDebounce?: boolean;
  wrapperClassName?: string;
  onChangeText?: (value: string) => void;
}

const styles = {
  searchInputContainer: "relative",
  searchIcon: "h-5 fill-paragraph absolute top-1/2 left-2.5 -translate-y-1/2",
  searchInput:
    "min-w-[240px] w-full h-8 border border-divider text-sm pl-9 text-paragraph placeholder:text-paragraph focus:outline-none rounded-md",
};

const SearchBar = ({
  className,
  onChangeText,
  iconClassName,
  wrapperClassName,
  debounceDelay = 1000,
  disableDebounce = false,
  placeholder = "Search Here...",
  ...props
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(
    debounce(
      (value: string) => {
        onChangeText?.(value);
      },
      disableDebounce ? 0 : debounceDelay
    ),
    [onChangeText, debounceDelay, disableDebounce]
  );

  useEffect(() => {
    debouncedOnChange(inputValue);
    return () => {
      debouncedOnChange.cancel();
    };
  }, [inputValue, debouncedOnChange]);

  return (
    <div className={twMerge(styles.searchInputContainer, wrapperClassName)}>
      <Icon
        name="search"
        className={twMerge(styles.searchIcon, iconClassName)}
      />
      <input
        type="text"
        className={twMerge(styles.searchInput, className)}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default SearchBar;
