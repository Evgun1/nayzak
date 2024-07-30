"use client";
import classes from "./NavLink.module.scss";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { TextClassList } from "../types/textClassList";

type NavLinkProps = {
  title: string;
  urlSearchParams: URLSearchParams;
  nameQueryParams: string;
};

export default function NavLink({
  title,
  urlSearchParams,
  nameQueryParams,
}: NavLinkProps) {
  const searhcParams = useSearchParams();

  const getSearchParams = searhcParams.get("category");

  urlSearchParams.set(nameQueryParams, title.toLowerCase());
  const href = `?${urlSearchParams}`;

  return (
    <Link
      className={`${TextClassList.SEMIBOLD_14} ${
        getSearchParams === title.toLowerCase()
          ? `${classes.action} ${classes.btn}`
          : classes.btn
      }`}
      scroll={false}
      href={href}
    >
      {title}
    </Link>
  );
}
