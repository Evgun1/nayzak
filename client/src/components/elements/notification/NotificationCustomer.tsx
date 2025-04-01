import NotificationPreview from '@/lib/ui/notification/NotificationPreview';
import DisplayIcon from '../icons/displayIcon';
import classes from './NotificationCustomer.module.scss';
import IconsIdList from '../icons/IconsIdList';
import { TextClassList } from '@/types/textClassList.enum';
import PopupNotification from '@/components/popup-notifications/PopupNotifications';
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
