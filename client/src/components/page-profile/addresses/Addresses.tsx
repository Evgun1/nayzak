'use client';

import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import classes from './Addresses.module.scss';
import AddressesPreview from './AddressesPreview';
import { useAppDispatch, useAppSelector } from '@/lib/redux/redux';
import { popupActions } from '@/lib/redux/store/popup/popup';
import { uiAction } from '@/lib/redux/store/ui/ui-sllice';
import PopupAddress from '@/components/popup-address/PopupAddress';
import PopupAddressEdit from '@/components/popup-address-edit/PopupAddressEdit';

export type AddressType = {
	id?: number;
	userName: string;
	store: string;
	city: string;
	street: string;
	postalCode: number;
};

export default function Addresses() {
	const addresses: AddressType[] = [];

	const dispatch = useAppDispatch();
	const address = useAppSelector((state) => state.address.address);
	const customer = useAppSelector((state) => state.customer.customerData);

	const btnClickHandler = () => {
		dispatch(popupActions.toggle(<PopupAddress />));
	};

	for (const element of address) {
		addresses.push({
			id: element.id,
			userName: `${customer?.firstName} ${customer?.lastName}`,
			city: element.city,
			postalCode: element.postalCode,
			street: element.street,
			store: 'Nayzak Design',
		});
	}

	return (
		<div className={classes['address--wrapper']}>
			<ul className={classes['address--wrapper-list']}>
				{addresses &&
					addresses.length > 0 &&
					addresses.map((address, index) => (
						<li key={index}>
							<AddressesPreview address={address} />
						</li>
					))}
			</ul>

			<ButtonCustom
				styleSettings={{
					fill: 'SOLID',
					color: 'DARK',
					roundness: 'ROUNDED',
					size: 'MEDIUM',
					type: 'DEFAULT',
				}}
				onClick={btnClickHandler}
			>
				Add address
			</ButtonCustom>
		</div>
	);
}
