import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import NavLink from "@/components/nav-link/NavLink";
import Actions from "./Actions";

import classes from "./Navigation.module.scss";
import DropDown from "@/components/drop-down/DropDown";

const NAVIGATION_DATA = [
  {
    title: "Home",
    endpoint: "",
  },
  {
    title: "Shop",
    endpoint: "shop",
  },
  {
    title: "Products",
    endpoint: "products",
  },
  {
    title: "Pages",
    endpoint: "pages",
  },
];

const Header = () => {
  return (
    <header className={`container ${classes.navigation}`}>
      <DisplayIcon
        className={classes["navigation--icon"]}
        iconName={IconsIdList.LOGOTYPE}
      />
      <div className={classes["navigation--links"]}>
        {NAVIGATION_DATA &&
          NAVIGATION_DATA.length > 0 &&
          NAVIGATION_DATA.map((data) => (
            <DropDown >
              <NavLink href={{ endpoint: data.endpoint }}>{data.title}</NavLink>
            </DropDown>
          ))}
      </div>
      <Actions />
    </header>
  );
};

export default Header;
