"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./Breadcrumbs.module.scss";
import { TextClassList } from "../types/textClassList";
import DisplayIcon from "../icons/displayIcon";
import IconsIdList from "../icons/IconsIdList";

export default function Breadcrumbs() {
  const pathName = usePathname();
  const home = "home";
  const fullPath = home + pathName;

  return (
    <div>
      <ul className={classes.list}>
        {fullPath
          .replace("/", " ")
          .split(" ")
          .map((value, index) => (
            <li key={index} className={classes.list__item}>
              <Link
                className={`${TextClassList.REGULAR_12} ${classes["list__item-link"]}`}
                href={`/${value.replace("home", "/")}`}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </Link>
              <DisplayIcon
                iconName={IconsIdList.CHEVRONE}
                width="12"
                height="12"
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
