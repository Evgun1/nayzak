import classes from "./HeaderActionMobile.module.scss";
import Burger from "@/ui/burger/Burger";
import PopupFlyMenuLayout from "@/popups/popup-fly-menu/PopupFlyMenuLayout";
import ActionCart from "../action-laptop/ActionCart";

const HeaderActionMobile = () => {
	return (
		<div className={classes['action-mobile']}>
			<ActionCart />
			<Burger toggle={<PopupFlyMenuLayout />} />
		</div>
	);
};

export default HeaderActionMobile;
