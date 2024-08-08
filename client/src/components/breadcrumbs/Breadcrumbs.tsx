"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./Breadcrumbs.module.scss";
import { TextClassList } from "../types/textClassList";
import DisplayIcon from "../icons/displayIcon";
import IconsIdList from "../icons/IconsIdList";
import { CSSProperties, HTMLAttributes } from "react";
import { ButtonClassList } from "../types/buttonClassList";
import { Type } from "../custom-elemets/button-custom/ButtonType";
import LinkCustom from "../custom-elemets/link-custom/LinkCustom";

type BreadcrumbsProps = {
  style?: CSSProperties;
};

export default function Breadcrumbs({ style }: BreadcrumbsProps) {
  const pathName = usePathname();
  const fullPath = "home" + pathName;

  return (
    // <div>
    <ul className={classes.breadcrumbs} style={style ? style : undefined}>
      {fullPath
        .replaceAll("/", " ")
        .split(" ")
        .map((value, index, array) => (
          <li key={index} className={classes["breadcrumbs-item"]}>
            {index + 1 !== array.length ? (
              <>
                <LinkCustom.SiteLinkCustom
                  styleSettings={{
                    type: LinkCustom.Type.text,
                    color: { dark: true },
                    roundess: LinkCustom.Roundness.sharp,
                    size: LinkCustom.Size.S,
                  }}
                  href={{ endpoint: `/${value.replace("home", "/")}` }}
                  className={`${TextClassList.REGULAR_12} ${classes["breadcrumbs-item--link"]}`}
                >
                  {value[0].toUpperCase() + value.slice(1).replaceAll("_", " ")}
                </LinkCustom.SiteLinkCustom>
                <DisplayIcon
                  className={classes.icon}
                  iconName={IconsIdList.CHEVRONE}
                />
              </>
            ) : (
              <span
                className={`${TextClassList.REGULAR_12} ${classes["breadcrumbs-item--link"]}`}
              >
                {value[0].toUpperCase() + value.slice(1).replaceAll("_", " ")}
              </span>
            )}
          </li>
        ))}
    </ul>
    // </div>
  );
}
