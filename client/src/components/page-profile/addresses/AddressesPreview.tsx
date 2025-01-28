'use client';

import DisplayIcon from '@/components/elements/icons/displayIcon';

import classes from './AddressesPreview.module.scss';
import { ButtonClassList } from '@/types/buttonClassList.enum';
import IconsIdList from '@/components/elements/icons/IconsIdList';
import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { TextClassList } from '@/types/textClassList.enum';
import { AddressType } from './Addresses';
import { useAppDispatch } from '@/lib/redux/redux';
import { popupActions } from '@/lib/redux/store/popup/popup';
import PopupAddress from '@/components/popup-address/PopupAddress';
import { deleteAddresses } from '@/lib/redux/store/address/action';

export default function AddressesPreview({
	address,
}: {
	address: AddressType;
}) {
	const dispatch = useAppDispatch();

	const btnEditHandler = () => {
		dispatch(popupActions.toggle(<PopupAddress data={address} />));
	};

	const btnDeleteHandler = () => {
		if (address.id) dispatch(deleteAddresses(address.id));
	};

	return (
		<div className={classes.address}>
			<div className={classes['address__info-container']}>
				<div className={TextClassList.SEMIBOLD_18}>Billing address</div>
				<div className={classes.address__info}>
					<span className={`${TextClassList.REGULAR_18}`}>
						{address.userName}
					</span>
					<span className={`${TextClassList.REGULAR_18}`}>{address.store}</span>
					<span className={`${TextClassList.REGULAR_18}`}>{address.city}</span>
					<span className={`${TextClassList.REGULAR_18}`}>
						{address.street}
					</span>
					<span className={`${TextClassList.REGULAR_18}`}>
						{address.postalCode}
					</span>
				</div>
			</div>
			<div className={classes['address__button-container']}>
				<ButtonCustom
					styleSettings={{
						type: 'TEXT',
						size: 'SMALL',
						color: 'DARK',
						icon: { left: 'DIT' },
					}}
					onClick={btnEditHandler}
				>
					Edit
				</ButtonCustom>
				<ButtonCustom
					styleSettings={{
						type: 'TEXT',
						size: 'SMALL',
						color: 'DARK',
						icon: { left: 'TRASH' },
					}}
					onClick={btnDeleteHandler}
				>
					Delete
				</ButtonCustom>
			</div>
		</div>
	);
}
