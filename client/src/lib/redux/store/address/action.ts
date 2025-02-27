import {
	appAddressesAllGet,
	appAddressesDelete,
	appAddressesPost,
	appAddressesPut,
} from '@/utils/http/addresses';
import { AppDispatch, RootState } from '../../store';
import { addressAction, AddressData } from './address';
import { writeCustomerAction } from '../customer/action';
import { popupActions } from '../popup/popup';
import { notificationAction } from '../notification/notification';
import PopupNotification from '@/components/popup-notifications/PopupNotifications';

export const initAddress = () => {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const customerId = getState().customer.customerData?.id;
		if (!customerId) return;

		const urlSearchParams = new URLSearchParams();
		urlSearchParams.set('customersId', customerId.toString());

		try {
			const { response, totalCount } = await appAddressesAllGet({
				searchParams: urlSearchParams,
			});
			dispatch(addressAction.uploadAddress({ address: response }));
		} catch (error) {
			console.log(error);
		}
	};
};

type UploadAddressProps = AddressData;

export const uploadAddress = (inputData: UploadAddressProps) => {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const customerId = getState().customer.customerData?.id;
		if (!customerId) return;

		const addressesArray = [...getState().address.address];

		const formData = new FormData();

		const addressesIndex = addressesArray.findIndex(
			({ id }) => parseInt(`${id}`) === parseInt(`${inputData.id}`)
		);

		try {
			if (addressesIndex === -1) {
				for (const key in inputData) {
					const typeKey = key as keyof UploadAddressProps;
					if (!inputData[typeKey]) continue;
					formData.set(typeKey, inputData[typeKey].toString());
				}
				formData.set('customersId', customerId.toString());

				const address = await appAddressesPost({
					sendData: formData,
				});

				addressesArray.push(address);
				dispatch(
					notificationAction.toggle(
						PopupNotification({
							icon: 'CHECK',
							text: 'The address has been set successfully.',
						})
					)
				);
			} else {
				const address = await appAddressesPut({
					sendData: {
						city: inputData.city,
						postalCode: +inputData.postalCode,
						street: inputData.street,
						id: parseInt(`${inputData.id}`),
					},
				});

				addressesArray[addressesIndex] = address;
				dispatch(
					notificationAction.toggle(
						PopupNotification({
							icon: 'CHECK',
							text: 'The address has been successfully changed.',
						})
					)
				);
			}

			dispatch(addressAction.uploadAddress({ address: addressesArray }));
			dispatch(popupActions.toggle(null));
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteAddresses = (deleteData: number) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const addressId = getState()
			.address.address.filter((data) => data.id === deleteData)
			.map((address) => address.id)
			.pop();

		if (!addressId) return;

		try {
			const { id } = await appAddressesDelete({
				deleteData: { addressId },
			});

			dispatch(addressAction.deleteAddress({ id }));
		} catch (error) {
			console.log(error);
		}
	};
};
