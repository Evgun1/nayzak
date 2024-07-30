import IconsIdList from "../../icons/IconsIdList";
import DisplayIcon from "../../icons/displayIcon";
import { ButtonClassList } from "../../types/buttonClassList";
import { TextClassList } from "../../types/textClassList";

import classes from "./Addresses.module.scss";

type AddressType = {
  title: string;
  userName: string;
  store: string;
  address: string;
  country: string;
};

const ADDRESSES_DATA: AddressType[] = [
  {
    title: "Billing address",
    userName: "Jill Dower",
    store: "Nayzak Design",
    address: "10 Strudwick CourtLondonSW4 6TE",
    country: "United Kingdom (UK)",
  },
  {
    title: "Billing address",
    userName: "Jill Dower",
    store: "Nayzak Design",
    address: "10 Strudwick CourtLondonSW4 6TE",
    country: "United Kingdom (UK)",
  },
  {
    title: "Billing address",
    userName: "Jill Dower",
    store: "Nayzak Design",
    address: "10 Strudwick CourtLondonSW4 6TE",
    country: "United Kingdom (UK)",
  },
];

export default function Addresses() {
  return (
    <ul className={classes.wrapper}>
      {ADDRESSES_DATA &&
        ADDRESSES_DATA.length > 0 &&
        ADDRESSES_DATA.map((address, index) => (
          <li className={classes.address} key={index}>
            <div className={classes.address__header}>
              <div className={TextClassList.SEMIBOLD_18}>{address.title}</div>
              <button className={classes["address__header-btn"]}>
                <DisplayIcon
                  className={classes.icon}
                  iconName={IconsIdList.DIT}
                />
                <span className={` ${ButtonClassList.BUTTON_SMALL}`}>Edit</span>
              </button>
            </div>
            <div className={classes.address__info}>
              <span className={`${TextClassList.REGULAR_18}`}>
                {address.userName}
              </span>
              <span className={`${TextClassList.REGULAR_18}`}>
                {address.store}
              </span>
              <span className={`${TextClassList.REGULAR_18}`}>
                {address.address}
              </span>
              <span className={`${TextClassList.REGULAR_18}`}>
                {address.country}
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
}
