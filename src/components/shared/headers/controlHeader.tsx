import React from "react";
import { ButtonProps } from "@/components/ui/button";
import { UncontrolledSelectProps } from "@/components/ui/select";
import { SearchBarProps } from "@/components/ui/searchBar";
import { Typography, SearchBar, Select, Button } from "@/components/ui";
import { SortByType } from "@/types";

interface SelectProps extends Omit<UncontrolledSelectProps, "onChange"> {
  onChange: (value: SortByType) => void;
  options: { value: SortByType; label: string }[];
}

interface ControlHeaderProps {
  title: string;
  buttonProps?: ButtonProps;
  searchBarProps?: SearchBarProps;
  selectProps?: SelectProps;
}

const styles = {
  headerContainer: "w-full flex items-center flex-wrap gap-2 z-20",
  title: "mr-auto",
  searchContainer:
    "max-lg:w-full max-lg:order-3 flex items-center flex-wrap gap-2",
};

const ControlHeader = ({
  title,
  buttonProps,
  selectProps,
  searchBarProps,
}: ControlHeaderProps) => {
  return (
    <div className={styles.headerContainer}>
      <Typography level="h2" className={styles.title}>
        {title}
      </Typography>

      <div className={styles.searchContainer}>
        {searchBarProps && <SearchBar {...searchBarProps} />}
        {selectProps && (
          <Select
            {...selectProps}
            onChange={(x) => selectProps.onChange(x as SortByType)}
          />
        )}
      </div>

      {buttonProps && <Button {...buttonProps} />}
    </div>
  );
};

export default ControlHeader;
