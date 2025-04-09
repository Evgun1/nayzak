"use client";

import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import classes from "./Addresses.module.scss";
import AddressesPreview from "./AddressesPreview";
import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { popupActions } from "@/lib/redux/store/popup/popup";
import PopupAddress from "@/components/popup-address/PopupAddress";

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
