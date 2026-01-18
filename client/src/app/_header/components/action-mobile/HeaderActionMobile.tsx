import classes from "./HeaderActionMobile.module.scss";
import Burger from "@/ui/burger/Burger";
import ActionCart from "../action/ActionCart";
import PopupFlyMenuLayout from "@/popups/popup-fly-menu/PopupFlyMenuLayout";

const HeaderActionMobile = () => {
	return (
		<div className={classes['action-mobile']}>
			<ActionCart />
			<Burger toggle={<PopupFlyMenuLayout />} />
		</div>
	);
};

export default HeaderActionMobile;
