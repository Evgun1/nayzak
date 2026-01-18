"use client";
import classes from "./Addresses..module.scss";
import PopupAddressRadio from "@/popups/popup-address-radio/PopupAddressRadio";
import PopupAddress from "@/popups/popup-address/PopupAddress";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { AddressData } from "@/redux/store/address/address";
import { popupActions } from "@/redux/store/popup/popup";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { FunctionComponent, useEffect, useState } from "react";
import AddressPreview from "./components/AddressPreview";

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	const addresses: Required<AddressData[]> = useAppSelector(
		(state) => state.address.address,
	);
	const responsive = useAppSelector((state) => state.responsive);
	const dispatch = useAppDispatch();

	const [addressId, setAddressId] = useState<number>(0);

	useEffect(() => {
		if (addresses && addresses.length > 0) {
			setAddressId(addresses[0].id as number);
		}
	}, [addresses]);

	const address = addresses.find((data) => {
		return data.id === addressId;
	});

	const btnEditHandler = () => {
		dispatch(
			popupActions.toggle(
				addresses.length > 0 ? (
					<PopupAddressRadio
						setStateAddressId={setAddressId}
						stateAddressId={addressId}
					/>
				) : (
					<PopupAddress />
				),
			),
		);
	};

	return (
		<div
			className={`${classes["addresses"]}`}
			id="checkout-address"
		>
			{address && (
				<input
					type="hidden"
					name="addressesId"
					value={address.id}
					id={address.id ? address.id.toString() : ""}
				/>
			)}
			<div className={classes["addresses__header"]}>
				<div className={classes["addresses__header-title"]}>
					Shipping address
				</div>
				<ButtonCustom
					onClick={btnEditHandler}
					styleSettings={{
						color: "DARK",
						roundness: "PILL",
						type: "TEXT",
						size:
							responsive.isDesktop || responsive.isTablet
								? "MEDIUM"
								: "SMALL",
						icon: { left: "DIT" },
					}}
				>
					Edit
				</ButtonCustom>
			</div>
			<div className={classes["addresses__info"]}>
				{address &&
					Object.entries(address).map(([key, val], i) => {
						if (!key.includes("id") && !key.includes("customersId"))
							return (
								<AddressPreview
									key={i}
									keyValue={key}
									value={val}
								/>
							);
					})}
			</div>
		</div>
	);
};

export default Page;
