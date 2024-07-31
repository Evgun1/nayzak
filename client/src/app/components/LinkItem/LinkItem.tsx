"use client";

import Link from "next/link";
import { FC } from "react";
import classes from "./Linkitem.module.scss";
import ButtonCustom from "../button-custom/ButtonCustom";

type LinkItemProps = {
  linkName: string;
  urlQueryName?: string;
  deleteUrlQueryName?: string;
  searchParams: URLSearchParams;
};
const LinkItem: FC<LinkItemProps> = ({
  linkName,
  urlQueryName,
  deleteUrlQueryName,
  searchParams,
}) => {
  const urlSearchParams = new URLSearchParams(searchParams);

  if (deleteUrlQueryName) {
    urlSearchParams.delete(deleteUrlQueryName);
  }

  urlQueryName ? urlSearchParams.set(urlQueryName, linkName.toLowerCase()) : "";
  const href = `?${urlSearchParams}`;

  return (
    <ButtonCustom.SiteButton
      className={classes["link-item"]}
      element={{ link: href }}
      size={ButtonCustom.Size.XS}
      type={ButtonCustom.Type.text}
    >
      {linkName}
    </ButtonCustom.SiteButton>

    // <Link className={classes["link-item"]} scroll={false} href={href}>
    // </Link>
  );
};

export default LinkItem;
