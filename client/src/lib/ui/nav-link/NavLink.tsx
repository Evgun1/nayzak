"use client";

import classes from "./NavLink.module.scss";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import {
  LinkCustom,
  StyleSettingsObject,
} from "../custom-elemets/link-custom/LinkCustom";

interface HrefObject {
  endpoint?: string;
  queryParams?: { [key: string]: string };
}

type NavLinkProps = {
  href: HrefObject;
  searchParams?: URLSearchParams;
  classesName?: string;
  children: ReactNode;
  customStyleActive?: string;
  styleSetings: StyleSettingsObject;
};

export default function NavLink({
  children,
  href: { queryParams, endpoint },
  searchParams,
  styleSetings: { color, icon, roundess, size, type },
  classesName,
  customStyleActive,
}: NavLinkProps) {
  const searhcParams = useSearchParams();
  const pathname = usePathname();
  const urlSearchParams = new URLSearchParams(searchParams);
  const params = useParams();

  let active: boolean = false;

  if (queryParams) {
    for (const key in queryParams) {
      urlSearchParams.set(key, queryParams[key].toLowerCase());
    }

    active =
      searhcParams.get("category") === children?.toString().toLocaleLowerCase();
  } else {
    endpoint
      ?.toString()
      .split("/")
      .find(
        (value) => value === pathname.replaceAll("/", " ").trim().split(" ")[1]
      )
      ? (active = true)
      : null;
  }

  const setQueryParams = `?${urlSearchParams}`;

  return (
    <LinkCustom.SiteLink
      className={`${classesName} ${
        active
          ? (customStyleActive ?? classes.action) || classes.link
          : classes.link
      }`}
      styleSettings={{
        color,
        roundess,
        size,
        type,
        icon,
      }}
      href={
        queryParams
          ? { queryParams: { setQueryParams } }
          : { endpoint: `/${endpoint}` }
      }
    >
      {children}
    </LinkCustom.SiteLink>
  );
}
