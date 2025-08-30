"use client";

import classes from "./Addresses.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { popupActions } from "@/redux/store/popup/popup";
import PopupAddress from "@/popups/popup-address/PopupAddress";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import AddressesPreview from "./addresses-preview/AddressesPreview";

export type AddressType = {
	id?: number;
	store: string;
	city: string;
	street: string;
	postalCode: number;
};

const Page = () => {
	const addresses: Partial<AddressType>[] = [];

	const dispatch = useAppDispatch();
	const addressSelector = useAppSelector((state) => state.address.address);

	const btnClickHandler = () => {
		dispatch(popupActions.toggle(<PopupAddress />));
	};

	for (const element of addressSelector) {
		addresses.push({
			id: element.id,
			city: element.city,
			postalCode: element.postalCode,
			street: element.street,
			store: "Nayzak Design",
		});
	}

	return (
		<div className={classes["address"]}>
			<ul className={classes["address__list"]}>
				{addresses &&
					addresses.length > 0 &&
					addresses.map((address, index) => (
						<li key={index}>
							<AddressesPreview
								address={address as AddressType}
							/>
						</li>
					))}
			</ul>

			<ButtonCustom
				styleSettings={{
					fill: "SOLID",
					color: "DARK",
					roundness: "ROUNDED",
					size: "MEDIUM",
					type: "DEFAULT",
				}}
				onClick={btnClickHandler}
			>
				Add address
			</ButtonCustom>
		</div>
	);
};
export default Page;
