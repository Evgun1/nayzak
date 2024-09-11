"use client";
import { TextClassList } from "@/types/textClassList";
import classes from "./NavLink.module.scss";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useState,
} from "react";

interface HrefObject {
  endpoint?: string;
  queryParams?: { [key: string]: string };
}

type NavLinkProps = {
  href: HrefObject;
  classesName?: string;
  children: ReactNode;
  searchParams?: URLSearchParams;
};

export default function NavLink({
  children,
  href: { queryParams, endpoint },
  searchParams,
  classesName,
}: NavLinkProps) {
  const searhcParams = useSearchParams();
  const pathname = usePathname();
  const urlSearchParams = new URLSearchParams(searchParams);

  let search: boolean;

  if (queryParams) {
    for (const key in queryParams) {
      urlSearchParams.set(key, queryParams[key].toLowerCase());
    }
    search =
      searhcParams.get("category") === children?.toString().toLocaleLowerCase();
  } else {
    search = pathname.endsWith(`${endpoint?.toLowerCase()}`);

    pathname.split("/")[1].toLowerCase();
  }

  const setQueryParams = `?${urlSearchParams}`;

  return (
    <Link
      className={`${
        classesName
          ? classesName && TextClassList.SEMIBOLD_14
          : TextClassList.SEMIBOLD_14
      } ${search ? classes.action || classes.link : classes.link}`}
      scroll={false}
      href={queryParams ? setQueryParams : `/${endpoint}`}
    >
      {children}
    </Link>
  );
}
