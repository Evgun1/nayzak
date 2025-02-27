import Form from '@/components/elements/form-component/FormComponent';
import classes from './CheckoutFormPreview.module.scss';
import { ButtonClassList } from '@/types/buttonClassList.enum';
import { useAppDispatch, useAppSelector } from '@/lib/redux/redux';
import React, { FC, useEffect, useState } from 'react';
import ButtonCustom from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import PopupAddressEdit from '@/components/popup-address-edit/PopupAddressEdit';
import { popupActions } from '@/lib/redux/store/popup/popup';
import PopupAddress from '@/components/popup-address/PopupAddress';
import { renderToStaticMarkup } from 'react-dom/server';

export const CheckoutFormContactInformation = () => {
	const customerState = useAppSelector((state) => state.customer.customerData);
	const credentialState = useAppSelector((state) => state.auth.credentials);

	return (
		<div className={classes['preview']}>
			<input
				type="hidden"
				name="customersId"
				value={customerState?.id}
				id={customerState?.id?.toString()}
			/>
			<input
				type="hidden"
				name="credentialsId"
				value={credentialState?.id}
				id={credentialState?.id?.toString()}
			/>
			<div className={ButtonClassList.BUTTON_LARGE}>Contact information</div>
			<div className={classes['preview__double']}>
				<Form.InputDefault
					customClasses={classes['preview__input']}
					label="First name"
					style={'contained'}
					inputSettings={{
						name: 'firstName',
						id: 'firstName',
						type: 'text',
						placeholder: 'First name',
						defaultValue: customerState?.firstName,
					}}
				/>
				<Form.InputDefault
					customClasses={classes['preview__input']}
					label="Last name"
					style={'contained'}
					inputSettings={{
						name: 'lastName',
						id: 'lastName',
						type: 'text',
						placeholder: 'Last name',
						defaultValue: customerState?.lastName,
					}}
				/>

				<Form.InputDefault
					customClasses={`${classes['preview__input']} ${classes['preview__input--phone']}`}
					label="Phone"
					style={'contained'}
					inputSettings={{
						name: 'phone',
						id: 'phone',
						type: 'text',
						placeholder: 'Last name',
						defaultValue: customerState?.phone,
					}}
				/>
			</div>
		</div>
	);
};

export const CheckoutFormAddress = () => {
	const addresses = useAppSelector((state) => state.address.address);
	const dispatch = useAppDispatch();

	const [addressId, setAddressId] = useState<number>(0);

	useEffect(() => {
		setAddressId(addresses[0]?.id as number);
	}, [addresses]);

	const address = addresses.find((data) => {
		if (addressId) {
			return data.id === addressId;
		}
	});

	const btnEditHandler = () => {
		dispatch(
			popupActions.toggle(
				addresses.length > 0 ? (
					<PopupAddressEdit
						setStateAddressId={setAddressId}
						stateAddressId={addressId}
					/>
				) : (
					<PopupAddress />
				)
			)
		);
	};

	return (
		<div className={`${classes['preview']} ${'preview-addresses'}`}>
			<input
				type="hidden"
				name="addressesId"
				value={address?.id}
				id={address?.id?.toString()}
			/>
			<div className={classes['preview-addresses__header']}>
				<div className={ButtonClassList.BUTTON_LARGE}>Shipping address</div>
				<ButtonCustom
					onClick={btnEditHandler}
					styleSettings={{
						color: 'DARK',
						roundness: 'PILL',
						type: 'TEXT',
						size: 'MEDIUM',
						icon: { left: 'DIT' },
					}}
				>
					Edit
				</ButtonCustom>
			</div>
			<div className={classes['preview-addresses__info']}>
				{address &&
					Object.entries(address).map(([key, val], i) => {
						if (!key.includes('id') && !key.includes('customersId'))
							return (
								<CheckoutFormAddressTable key={i} keyValue={key} value={val} />
							);
					})}
			</div>
		</div>
	);
};

const CheckoutFormAddressTable: FC<{ keyValue: string; value: string }> = ({
	keyValue,
	value,
}) => {
	return (
		<>
			<span className={ButtonClassList.BUTTON_SMALL}>
				{keyValue.charAt(0).toUpperCase() +
					keyValue
						.replace(/([a-z])([A-Z])/g, '$1 $2')
						.slice(1)
						.toLocaleLowerCase()}
			</span>
			<span>{value}</span>
		</>
	);
};
