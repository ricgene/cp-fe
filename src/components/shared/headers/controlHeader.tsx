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
  description?: string;
  buttonProps?: ButtonProps;
  searchBarProps?: SearchBarProps;
  selectProps?: SelectProps;
}

const styles = {
  headerContainer: "w-full flex items-center flex-wrap gap-2 z-20",
  titleContainer: "mr-auto",
  searchContainer:
    "max-lg:w-full max-lg:order-3 flex items-center flex-wrap gap-2",
};

const ControlHeader = ({
  title,
  buttonProps,
  selectProps,
  description,
  searchBarProps,
}: ControlHeaderProps) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <Typography level="h2">{title}</Typography>

        {description && <Typography level="p1">{description}</Typography>}
      </div>

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
