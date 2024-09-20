"use client";

import { ReactNode, useEffect, useState } from "react";
import Orders from "./Orders";
import Addresses from "./Addresses";
import AccountDetails from "./AccountDetails";
import classes from "./Profile.module.scss";
import Dashboard from "./Dashboard";
import { ButtonCustom } from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";
import { useAppDispatch } from "@/lib/redux/redux";
import { useRouter, redirect } from "next/navigation";
import { cartAction } from "@/lib/redux/store/cart/cart";
import Wishlist from "./wishlist/Wishlist";
import Image from "next/image";
import { logOut } from "@/lib/redux/store/auth/action";
import { useCookiGet } from "@/hooks/useCookie";

type PageContentType = {
  label: string;
  content: () => ReactNode;
};

const MENU: PageContentType[] = [
  {
    label: "Dashboard",
    content: () => <Dashboard />,
  },
  {
    label: "Orders",
    content: () => <Orders />,
  },
  {
    label: "Addresses",
    content: () => <Addresses />,
  },
  {
    label: "Account details",
    content: () => <AccountDetails />,
  },
  {
    label: "Wishlist",
    content: () => <Wishlist />,
  },
];

export default function Profile() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [tabAction, setTabAction] = useState(0);

  const btnLogOut = () => {
    dispatch(logOut());
    dispatch(cartAction.cleanCart());
    router.push("/");
  };

  if (!useCookiGet("user-token")) {
    redirect("/");
  }

  return (
    <div className={classes.profile}>
      <h3>My account</h3>
      <div className={classes["profile--dashboard"]}>
        <div className={classes["profile--dashboard-menu"]}>
          <Image
            unoptimized
            width={0}
            height={0}
            layout="responsive"
            className={classes["profile--menu-image"]}
            src="https://placehold.co/400"
            alt="avatar"
          />
          <ul className={classes["profile--menu-list"]}>
            {MENU &&
              MENU.length > 0 &&
              MENU.map((data, index) => (
                <li key={index} className={classes["profile--menu-item"]}>
                  <ButtonCustom.SiteButton
                    styleSettings={{
                      type: ButtonCustom.Type.text,
                      roundess: ButtonCustom.Roundness.sharp,
                      color: { dark: true },
                      size: ButtonCustom.Size.M,
                    }}
                    onClick={() => setTabAction(index)}
                    className={
                      index === tabAction
                        ? classes["profile--btn-action"]
                        : classes["profile--btn"]
                    }
                  >
                    {data.label}
                  </ButtonCustom.SiteButton>
                </li>
              ))}
            <li className={classes["profile--menu-item"]}>
              <ButtonCustom.SiteButton
                styleSettings={{
                  type: ButtonCustom.Type.text,
                  roundess: ButtonCustom.Roundness.sharp,
                  color: { dark: true },
                  size: ButtonCustom.Size.M,
                }}
                className={classes["profile--btn"]}
                onClick={btnLogOut}
              >
                Logout
              </ButtonCustom.SiteButton>
            </li>
          </ul>
        </div>
        <div>
          {MENU.map((menuItem, index) => (
            <div key={index}>
              {index === tabAction ? menuItem.content() : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
