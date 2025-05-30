"use client";
import React from "react";
import { IconsType } from "@/types";
import { ICONS_LIST } from "./resolver";

interface Props {
  name: IconsType;
  className?: string;
}

const Icon = ({ name, className = "" }: Props) => {
  const IconElement = ICONS_LIST[name] || ICONS_LIST["logo"];

  return <IconElement className={className} />;
};

export default Icon;
