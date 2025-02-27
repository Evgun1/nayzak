import { ProductItem } from '@/types/product.types';
import IconsIdList from '../icons/IconsIdList';
import DisplayIcon from '../icons/displayIcon';
import ButtonCustom from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import classes from './NotificationCart.module.scss';
import { FC } from 'react';
import NotificationPreview from '@/lib/ui/notification/NotificationPreview';
import LinkCustom from '@/lib/ui/custom-elements/link-custom/LinkCustom';
import PopupNotification from '@/components/popup-notifications/PopupNotifications';
import { TextClassList } from '@/types/textClassList.enum';

type NotificationCartProps = {
	product: ProductItem;
};

const NotificationCart: FC<NotificationCartProps> = ({ product }) => {
	return (
		<PopupNotification icon={'CHECK'}>
			<span className={TextClassList.REGULAR_16}>
				{product.title} was successfully added to your cart.
			</span>
			<LinkCustom
				href={{ endpoint: '/cart' }}
				styleSettings={{
					type: 'UNDERLINE',
					color: 'DARK',
					size: 'SMALL',
					fill: 'SOLID',
				}}
			>
				View cart
			</LinkCustom>
		</PopupNotification>
	);
};

export default NotificationCart;
