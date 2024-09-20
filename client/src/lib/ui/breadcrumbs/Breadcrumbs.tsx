"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import classes from "./Breadcrumbs.module.scss";

import { CSSProperties, HTMLAttributes } from "react";
import { Type } from "../custom-elemets/button-custom/ButtonType";
import {LinkCustom} from "../custom-elemets/link-custom/LinkCustom";
import { TextClassList } from "@/types/textClassList";
import IconsIdList from "@/components/elemets/icons/IconsIdList";
import DisplayIcon from "@/components/elemets/icons/displayIcon";
import { ButtonClassList } from "@/types/buttonClassList";

type BreadcrumbsProps = {
  style?: CSSProperties;
};

export default function Breadcrumbs({ style }: BreadcrumbsProps) {
  const params = useParams<{ slug: string[] }>();

  return (
    <ul className={classes.breadcrumbs} style={style ? style : undefined}>
      <li className={classes["breadcrumbs-item"]}>
        <LinkCustom.SiteLink
          styleSettings={{
            type: LinkCustom.Type.text,
            color: { dark: true },
            roundess: LinkCustom.Roundness.sharp,
            size: LinkCustom.Size.S,
          }}
          href={{ endpoint: "/" }}
          className={`${TextClassList.REGULAR_12} ${classes["breadcrumbs-item--link"]}`}
        >
          Home
        </LinkCustom.SiteLink>
      </li>
      {params.slug &&
        params.slug.length > 0 &&
        params.slug.map((value, index, array) => (
          <li key={index} className={classes["breadcrumbs-item"]}>
            {index + 1 !== array.length ? (
              <>
                <LinkCustom.SiteLink
                  styleSettings={{
                    type: LinkCustom.Type.text,
                    color: { dark: true },
                    roundess: LinkCustom.Roundness.sharp,
                    size: LinkCustom.Size.S,
                  }}
                  href={{ endpoint: `${value.replace("home", "/")}` }}
                  className={`${TextClassList.REGULAR_12} ${classes["breadcrumbs-item--link"]}`}
                >
                  {value[0].toUpperCase() + value.slice(1).replaceAll("_", " ")}
                </LinkCustom.SiteLink>
                <DisplayIcon
                  className={classes.icon}
                  iconName={IconsIdList.CHEVRONE}
                />
              </>
            ) : (
              <span
                className={`${
                  TextClassList.REGULAR_12 && ButtonClassList.BUTTON_XSMALL
                } ${classes["breadcrumbs-item--link"]}`}
              >
                {value[0].toUpperCase() + value.slice(1).replaceAll("_", " ")}
              </span>
            )}
          </li>
        ))}
    </ul>

  );
}
