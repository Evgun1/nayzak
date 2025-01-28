import {
	appAddressesAllGet,
	appAddressesDelete,
	appAddressesPost,
	appAddressesPut,
} from '@/utils/http/addresses';
import { AppDispatch, RootState } from '../../store';
import { addressAction, AddressData } from './address';
import { writeCustomerAction } from '../customer/action';


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

type UploadAddressProps = AddressData & {
	firstName?: string;
	lastName?: string;
};

export const uploadAddress = (inputData: UploadAddressProps) => {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const customerId = getState().customer.customerData?.id;
		if (!customerId) return;

		const addressesArray = [...getState().address.address];
		if (inputData.firstName && inputData.lastName) {
			const customerFormData = new FormData();
			customerFormData.set('firstName', inputData.firstName);
			customerFormData.set('lastName', inputData.lastName);
			dispatch(writeCustomerAction(customerFormData));
		}

		const formData = new FormData();

		const addressesIndex = addressesArray.findIndex(
			({ id }) => id === inputData.id
		);

		if (addressesIndex === -1) {
			for (const key in inputData) {
				const typeKey = key as keyof UploadAddressProps;

				if (!inputData[typeKey]) continue;

				const customerFormData = new FormData();
				if (typeKey.includes('firstName') && typeKey.includes('lastName')) {
					customerFormData.set(typeKey, inputData[typeKey].toString());
					dispatch(writeCustomerAction(customerFormData));
				}

				formData.set(typeKey, inputData[typeKey].toString());
			}
			formData.set('customersId', customerId.toString());

			const address = await appAddressesPost({
				sendData: formData,
			});

			addressesArray.push(address);
		} else {
			if (inputData.id) {
				const address = await appAddressesPut({
					id: +inputData.id,
					sendData: {
						city: inputData.city,
						postalCode: +inputData.postalCode,
						street: inputData.street,
						id: +inputData.id,
					},
				});

				addressesArray.push(address);
			}
		}

		dispatch(addressAction.uploadAddress({ address: addressesArray }));
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
