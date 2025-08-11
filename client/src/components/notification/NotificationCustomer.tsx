import { TextClassList } from "@/types/textClassList.enum";
import PopupNotification from "@/popups/popup-notifications/PopupNotifications";
const NotificationCustomer = () => {
	return (
		<PopupNotification icon="CHECK">
			<span className={TextClassList.REGULAR_16}>
				Data updated successfully
			</span>
		</PopupNotification>
	);
};

export default NotificationCustomer;
