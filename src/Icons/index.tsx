"use client";
import React from "react";
import { IconsType } from "@/types";
import { ICONS_LIST } from "./resolver";
import Link from "next/link";

interface Props {
  name: IconsType;
  className?: string;
  href?: string;
}

const Icon = ({ name, href, className = "" }: Props) => {
  const IconElement = ICONS_LIST[name] || ICONS_LIST["logo"];

  return href ? (
    <Link href={href} className="cursor-default">
      <IconElement className={className} />
    </Link>
  ) : (
    <IconElement className={className} />
  );
};

export default Icon;
