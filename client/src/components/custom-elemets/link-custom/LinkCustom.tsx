import Link from "next/link";
import { FC, ReactNode, RefObject } from "react";

import "./style.scss";
import { Url } from "url";
import { Color, Roundness, Size, Type } from "./LinkType";
import IconsIdList from "@/components/icons/IconsIdList";
import DisplayIcon from "@/components/icons/displayIcon";

interface HrefObject {
  endpoint?: Url | string;
  queryParams?: { [key: string]: string };
  deleteQuertParams?: string;
}

export interface StyleSettingsObject {
  size: Size;
  roundess: Roundness;
  type: Type;
  color: { dark?: boolean; light?: boolean };
  icon?: IconsIdList;
}

type SiteLinkProps = {
  styleSettings: StyleSettingsObject;

  className?: string;
  children?: ReactNode;

  target?: boolean;
  searchParams?: URLSearchParams;
  linkRef?: RefObject<HTMLAnchorElement>;
  href: HrefObject;
};
const SiteLink: FC<SiteLinkProps> = ({
  styleSettings: { color, icon, roundess, size, type },

  className,
  searchParams,
  href: { queryParams, deleteQuertParams, endpoint },

  linkRef,
  children,
  target,
}) => {
  let linkColor;

  if (type === Type.default || type === Type.circle) {
    color?.dark
      ? (linkColor = Color.dark_default)
      : (linkColor = Color.light_default);
  }

  if (type === Type.text) {
    color?.dark
      ? (linkColor = Color.dark_text)
      : (linkColor = Color.light_text);
  }

  if (type === Type.underline) {
    color?.dark
      ? (linkColor = Color.dark_underline)
      : (linkColor = Color.light_underline);
  }

  const classes: any[] = [linkColor, size, roundess, type];

  const urlSearchParams = new URLSearchParams(searchParams);

  if (deleteQuertParams) urlSearchParams.delete(deleteQuertParams);

  if (queryParams)
    for (const urlNameKey in queryParams) {
      urlSearchParams.set(urlNameKey, queryParams[urlNameKey].toLowerCase());
    }

  const setQueryParams = `?${urlSearchParams}`;

  return (
    <Link
      ref={linkRef}
      scroll={false}
      href={queryParams ? setQueryParams : `/${endpoint}`}
      className={`${className} ${classes.join(" ")}`}
      target={target ? "_blank" : "_self"}
    >
      {children ?? ""}
      {icon ? <DisplayIcon iconName={icon} /> : ""}
    </Link>
  );
};

export default {
  SiteLinkCustom: SiteLink,
  Size,
  Color,
  Roundness,
  Type,
  IconsIdList,
};
