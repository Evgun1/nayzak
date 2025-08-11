import PopupNotification from "@/popups/popup-notifications/PopupNotifications";
import { TextClassList } from "@/types/textClassList.enum";

const NotificationCheckout = () => {
	return (
		<PopupNotification icon="CHECK">
			<span className={TextClassList.REGULAR_16}>
				Order successfully placed
			</span>
		</PopupNotification>
	);
};

export default NotificationCheckout;
