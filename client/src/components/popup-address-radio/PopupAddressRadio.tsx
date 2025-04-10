"use client";

import { z, ZodEffects, ZodObject } from "zod";
import Form from "../../lib/ui/form/Form";
import classes from "./PopupAddressRadio.module.scss";
import PopupPreview from "../elements/popup/PopupPreview";
import { AddressData } from "@/lib/redux/store/address/address";
import { CustomerItem } from "@/lib/redux/store/customer/customer";
import { useAppSelector } from "@/lib/redux/redux";
import { validation } from "@/utils/validator/validator";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import React, { FC, FormEvent, ReactElement } from "react";

const schemaAddAddress: Array<ZodObject<any> | ZodEffects<any>> = [];
schemaAddAddress.push(z.object(validation.addresses));

type SubmitHandlerProps = AddressData & CustomerItem;

type PopupAddressEditProps = {
    setStateAddressId: React.Dispatch<React.SetStateAction<number>>;
    stateAddressId: number;
};

const PopupAddressRadio: FC<PopupAddressEditProps> = ({
    setStateAddressId,
    stateAddressId,
}) => {
    const currentAddresses = useAppSelector((state) => state.address.address);

    const submitHandler = (
        value: { data: { address: string } },
        event: FormEvent<HTMLFormElement>
    ) => {
        setStateAddressId(+value.data.address);
    };

    return (
        <PopupPreview title={"Edit address"}>
            <Form
                className={classes["popup-address-radio"]}
                submitHandler={submitHandler}
            >
                {currentAddresses.map((data, i) => (
                    <Form.Radio
                        key={i}
                        radioSettings={{
                            id: data.id ?? 0,
                            name: "address",
                            defaultChecked: stateAddressId,
                        }}
                        radioStyle={{ roundness: "CIRCLE", size: "SMALL" }}
                    >
                        <div className={classes["address-radio-preview"]}>
                            {Object.entries(data).map(([key, val], i) => {
                                if (key.includes("id")) return;
                                if (key.includes("customersId")) return;
                                return (
                                    <div
                                        key={i}
                                        className={
                                            classes[
                                                "address-radio-preview__info"
                                            ]
                                        }
                                    >
                                        <span
                                            className={
                                                ButtonClassList.BUTTON_SMALL
                                            }
                                        >
                                            {key.charAt(0).toUpperCase() +
                                                key
                                                    .replace(
                                                        /([a-z])([A-Z])/g,
                                                        "$1 $2"
                                                    )
                                                    .slice(1)
                                                    .toLocaleLowerCase()}
                                        </span>
                                        <span>{val}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </Form.Radio>
                ))}
            </Form>
        </PopupPreview>
    );
};

export default PopupAddressRadio;
