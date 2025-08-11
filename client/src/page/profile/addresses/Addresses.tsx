"use client";

import classes from "./Addresses.module.scss";
import AddressesPreview from "./AddressesPreview";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { popupActions } from "@/redux/store/popup/popup";
import PopupAddress from "@/popups/popup-address/PopupAddress";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";

export type AddressType = {
	id?: number;
	store: string;
	city: string;
	street: string;
	postalCode: number;
};

export default function Addresses() {
	const addresses: Partial<AddressType>[] = [];

	const dispatch = useAppDispatch();
	const address = useAppSelector((state) => state.address.address);

	const btnClickHandler = () => {
		dispatch(popupActions.toggle(<PopupAddress />));
	};

	for (const element of address) {
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
}
