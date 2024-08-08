import { ButtonClassList } from "@/components/types/buttonClassList";
import { TextClassList } from "@/components/types/textClassList";
import Link from "next/link";

import classes from "./Colums.module.scss";
import { FC } from "react";
import LinkCustom from "@/components/custom-elemets/link-custom/LinkCustom";

const COLUM_DATA = [
  {
    title: "Shop",
    item: [
      { title: "My account" },
      { title: "Login" },
      { title: "Wishlist" },
      { title: "Cart" },
    ],
  },
  {
    title: "Information",
    item: [
      { title: "Shipping Policy" },
      { title: "Returns & Refunds" },
      { title: "Cookies Policy" },
      { title: "Frequently asked" },
    ],
  },
  {
    title: "Company",
    item: [
      { title: "About us" },
      { title: "Privacy Policy" },
      { title: "Terms & Conditions" },
      { title: "Contact Us" },
    ],
  },
];

const Colums: FC = () => {
  return (
    <div className={classes["colums"]}>
      {COLUM_DATA &&
        COLUM_DATA.length &&
        COLUM_DATA.map((data, index) => (
          <div key={index}>
            <div
              className={`${classes[`colums--title`]} ${
                ButtonClassList.BUTTON_XSMALL
              }  `}
            >
              {data.title}
            </div>
            <ul className={classes[`colums--list`]}>
              {data.item &&
                data.item.length &&
                data.item.map((itemData, index) => (
                  <li key={index}>
                    <LinkCustom.SiteLinkCustom
                      href={{ endpoint: "#" }}
                      styleSettings={{
                        roundess: LinkCustom.Roundness.sharp,
                        type: LinkCustom.Type.text,
                        color: { dark: true },
                        size: LinkCustom.Size.XS,
                      }}
                      className={`${classes[`colums--list-link`]} ${
                        TextClassList.REGULAR_14
                      }`}
                    >
                      {itemData.title}
                    </LinkCustom.SiteLinkCustom>
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Colums;
