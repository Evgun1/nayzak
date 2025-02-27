import NotificationPreview from '@/lib/ui/notification/NotificationPreview';
import IconsIdList from '../icons/IconsIdList';
import DisplayIcon from '../icons/displayIcon';
import classes from './NotificationCheckout.module.scss';
import PopupNotification from '@/components/popup-notifications/PopupNotifications';
import { TextClassList } from '@/types/textClassList.enum';

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
