"use client";

import { ReactNode, useState } from "react";
import Orders from "./Orders";
import Addresses from "./Addresses";
import AccountDetails from "./AccountDetails";
import Wishlist from "./Wishlist";
import classes from "./Profile.module.scss";
import { ButtonClassList } from "../../types/buttonClassList";
import Dashboard from "./Dashboard";

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
  const [tabAction, setTabAction] = useState(0);

  return (
    <div className={classes.container}>
      <h3>My account</h3>
      <div className={classes.elements}>
        <div className={classes.menu}>
          <div className={classes.menu__image}>
            <img src="https://placehold.co/400" alt="" />
          </div>
          <ul className={classes.menu__list}>
            {MENU &&
              MENU.length > 0 &&
              MENU.map((value, index) => (
                <li className={`${classes["menu__list-item"]} `} key={index}>
                  <button
                    className={`${classes["menu__list-btn"]} ${
                      index === tabAction ? classes.action : ""
                    }
                    ${ButtonClassList.BUTTON_MEDIUM}
                    `}
                    onClick={() => setTabAction(index)}
                  >
                    {value.label}
                  </button>
                </li>
              ))}
            <li>
              <button
                className={`${classes["menu__list-btn"]} ${ButtonClassList.BUTTON_MEDIUM}`}
              >
                Logout
              </button>
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
