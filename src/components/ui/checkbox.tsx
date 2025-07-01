import React from "react";
import Icon from "@/Icons";
import { Typography } from ".";

type Props = {
  checked: boolean;
  onChange: () => void;
  title?: string;
};

const styles = {
  button:
    "flex items-center gap-2 cursor-pointer hover:opacity-60 duration-150 ease-in-out",
  checkbox: "w-4.5 h-4.5",
};

const Checkbox = ({ onChange, checked, title }: Props) => {
  return (
    <button onClick={onChange} className={styles.button}>
      <Icon
        name={checked ? "uncheckedCheckbox" : "checkedCheckbox"}
        className={styles.checkbox}
      />
      {title && <Typography level="p1">{title}</Typography>}
    </button>
  );
};

export default Checkbox;
