import PopupNotification from "@/popups/popup-notifications/PopupNotifications";
import { TextClassList } from "@/types/textClassList.enum";

const NotificationChangePassword = () => {
	return (
		<PopupNotification icon="CHECK">
			<span className={TextClassList.REGULAR_16}>
				Password successfully changed
			</span>
		</PopupNotification>
	);
};
