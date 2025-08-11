import { AppDispatch, RootState } from "../../store";
import { addressAction, AddressData } from "./address";
import { writeCustomerAction } from "../customer/action";
import { popupActions } from "../popup/popup";
import { notificationAction } from "../notification/notification";
import PopupNotification from "@/popups/popup-notifications/PopupNotifications";
import { appCookieGet } from "@/lib/api/cookie";
import {
	appAddressesPut,
	appAddressesInitGet,
	appAddressesDelete,
	appAddressesPost,
} from "@/lib/api/addresses";

export const initAddress = () => {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const token = await appCookieGet("user-token");
		if (!token || token === null) return;

		try {
			const { result, totalCount } = await appAddressesInitGet(token);
			dispatch(addressAction.uploadAddress({ address: result }));
		} catch (error) {
			console.log(error);
		}
	};
};

type UploadAddressProps = AddressData;

export const uploadAddress = (inputData: UploadAddressProps) => {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const customerId = getState().customer.customerData?.id;
		const token = appCookieGet("user-token");
		if (!token) return;
		if (!customerId) return;

		const addressesArray = [...getState().address.address];

		const objData = {} as AddressData;

		const addressesIndex = addressesArray.findIndex(
			({ id }) => parseInt(`${id}`) === parseInt(`${inputData.id}`),
		);

		try {
			if (addressesIndex === -1) {
				const address = await appAddressesPost({
					sendData: {
						id: +inputData.id,
						city: inputData.city,
						street: inputData.street,
						postalCode: +inputData.postalCode,
					},
					token,
				});

				addressesArray.push(address);
				dispatch(
					notificationAction.toggle(
						PopupNotification({
							icon: "CHECK",
							text: "The address has been set successfully.",
						}),
					),
				);
			} else {
				const address = await appAddressesPut({
					sendData: {
						city: inputData.city,
						postalCode: +inputData.postalCode,
						street: inputData.street,
						id: parseInt(`${inputData.id}`),
					},
					token,
				});

				addressesArray[addressesIndex] = address;
				dispatch(
					notificationAction.toggle(
						PopupNotification({
							icon: "CHECK",
							text: "The address has been successfully changed.",
						}),
					),
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
		const token = appCookieGet("user-token");
		if (!token) return;
		const addressId = getState()
			.address.address.filter((data) => data.id === deleteData)
			.map((address) => address.id)
			.pop();

		if (!addressId) return;

		try {
			const { id } = await appAddressesDelete({
				deleteData: { addressId },
				token,
			});

			dispatch(addressAction.deleteAddress({ id }));
		} catch (error) {
			console.log(error);
		}
	};
};
