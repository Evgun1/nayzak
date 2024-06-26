import Image from "next/image";
import NavLink from "./navlink";
import Actions from "./actions";

import classes from "./navigationBar.module.scss";
import DisplayIcon from "../../icons/displayIcon";
import IconsIdList from "../../icons/IconsIdList";

export default function NavigationBar() {
  return (
    <div className={classes.nav}>
      <div className={`container ${classes.nav__wrapper}`}>
        <DisplayIcon iconName={IconsIdList.LOGOTYPE} height="30" width="155" />
        <NavLink />
        <Actions />
      </div>
    </div>
  );
}
