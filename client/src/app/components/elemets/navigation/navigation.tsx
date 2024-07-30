"use client";

import Link from "next/link";
import Image from "next/image";

import classes from "./navigation.module.scss";
import DisplayIcon from "../../icons/displayIcon";
import IconsIdList from "../../icons/IconsIdList";

const NavLink_Link_Arr = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/shop",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Pages",
    href: "/pages",
  },
];

export default function Navigation() {
  return (
    <ul className={classes.item}>
      {NavLink_Link_Arr &&
        NavLink_Link_Arr.length &&
        NavLink_Link_Arr.map((value, index) => (
          <li key={index} className={classes.item__list}>
            <Link className={classes["item__list-link"]} href={value.href}>
              <div className={classes["item__list-title"]}>{value.title}</div>
              <DisplayIcon
                className={classes.icon}
                iconName={IconsIdList.CHEVRONE}
              />
            </Link>
          </li>
        ))}
    </ul>
  );
}
