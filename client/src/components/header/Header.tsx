import DisplayIcon from "@/components/elemets/icons/displayIcon";
import IconsIdList from "@/components/elemets/icons/IconsIdList";

import classes from "./Header.module.scss";
import DropDown from "@/lib/ui/drop-down/DropDown";
import Actions from "./Actions";
import {
  Roundness,
  Size,
  Type,
} from "@/lib/ui/custom-elemets/button-custom/ButtonType";
import Navigation from "./Navigation";
import Link from "next/link";

const Header = () => {
  return (
    <header className={`container ${classes.navigation}`}>
      <Link href={"/"} className={classes["navigation--logo"]}>
        <DisplayIcon
          className={classes["navigation--logo-icon"]}
          iconName={IconsIdList.LOGOTYPE}
        />
      </Link>
      <Navigation />
      <Actions />
    </header>
  );
};

export default Header;
