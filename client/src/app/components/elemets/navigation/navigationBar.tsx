import Image from "next/image";
import Navigation from "./navigation";
import Actions from "./actions";

import classes from "./navigationBar.module.scss";
import DisplayIcon from "../../icons/displayIcon";
import IconsIdList from "../../icons/IconsIdList";

export default function NavigationBar() {
  return (
    <div className={classes.nav}>
      <div className={`container ${classes.nav__wrapper}`}>
        <DisplayIcon className={classes.icon} iconName={IconsIdList.LOGOTYPE} />
        <Navigation />
        <Actions />
      </div>
    </div>
  );
}