import classes from "./NotificationCart.module.scss";
import { FC } from "react";
import PopupNotification from "@/popups/popup-notifications/PopupNotifications";
import { TextClassList } from "@/types/textClassList.enum";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";

type NotificationCartProps = {
	title: string;
};

const NotificationCart: FC<NotificationCartProps> = (props) => {
	const { title } = props;

	return (
		<PopupNotification
			icon={"CHECK"}
			className={classes["notification-cart"]}
		>
			<span className={TextClassList.REGULAR_16}>
				{title} was successfully added to your cart.
			</span>
			<LinkCustom
				href={{ endpoint: "/cart" }}
				styleSettings={{
					type: "UNDERLINE",
					color: "DARK",
					size: "SMALL",
					fill: "SOLID",
				}}
			>
				View cart
			</LinkCustom>
		</PopupNotification>
	);
};

export default NotificationCart;
