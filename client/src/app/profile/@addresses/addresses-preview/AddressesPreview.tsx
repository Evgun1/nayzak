"use client";

import classes from "./AddressesPreview.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import { useAppDispatch } from "@/redux/redux";
import { popupActions } from "@/redux/store/popup/popup";
import PopupAddress from "@/popups/popup-address/PopupAddress";
import { deleteAddresses } from "@/redux/store/address/action";
import { ReactElement } from "react";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { AddressType } from "../page";

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

	const addressInfoItem: ReactElement[] = [];

	for (const key in address) {
		if (key === "id") continue;

		const keyType = key as keyof typeof address;

		addressInfoItem.push(
			<div className={classes["address__info-item"]}>
				<span className={`${TextClassList.REGULAR_18}`}>
					{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
				</span>
				-
				<span className={`${TextClassList.REGULAR_18}`}>
					{address[keyType]}
				</span>
			</div>,
		);
	}

	return (
		<div className={classes.address}>
			<div className={classes["address__info-wrap"]}>
				<div className={TextClassList.SEMIBOLD_18}>Billing address</div>
				<div className={classes.address__info}>
					{addressInfoItem.map((item, i) => (
						<div key={i}>{item}</div>
					))}
				</div>
			</div>
			<div className={classes["address__button-wrap"]}>
				<ButtonCustom
					styleSettings={{
						type: "TEXT",
						size: "SMALL",
						color: "DARK",
						icon: { left: "DIT" },
					}}
					onClick={btnEditHandler}
				>
					Edit
				</ButtonCustom>
				<ButtonCustom
					styleSettings={{
						type: "TEXT",
						size: "SMALL",
						color: "DARK",
						icon: { left: "TRASH" },
					}}
					onClick={btnDeleteHandler}
				>
					Delete
				</ButtonCustom>
			</div>
		</div>
	);
}
