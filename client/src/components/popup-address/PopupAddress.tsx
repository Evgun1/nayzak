"use client";

import { z, ZodEffects, ZodObject } from "zod";
import Form from "../../lib/ui/form/Form";
import classes from "./PopupAddress.module.scss";
import PopupPreview from "../elements/popup/PopupPreview";
import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { uploadAddress } from "@/lib/redux/store/address/action";
import { AddressData } from "@/lib/redux/store/address/address";
import { CustomerItem } from "@/lib/redux/store/customer/customer";
import { validation } from "@/utils/validator/validator";
import { FormEvent } from "react";
import { AddressType } from "../page-profile/addresses/Addresses";

type SubmitHandlerProps = AddressData & CustomerItem;

export default function PopupAddress({ data }: { data?: AddressType }) {
    const dispatch = useAppDispatch();
    const customer = useAppSelector((state) => state.customer.customerData);

    const schemaAddAddress: Array<ZodObject<any> | ZodEffects<any>> = [
        z.object(validation.addresses),
    ];

    if (!customer?.firstName && !customer?.lastName)
        schemaAddAddress.push(z.object(validation.customer));

    const submitHandler = (
        object: { data: SubmitHandlerProps },
        element: FormEvent<HTMLFormElement>
    ) => {
        const eventData = object.data;

        dispatch(uploadAddress(eventData));
    };

    return (
        <PopupPreview title={!data ? "Add address" : "Edit address"}>
            <Form
                submitHandler={submitHandler}
                oneMessage
                className={classes["popup-address__form"]}
                schema={schemaAddAddress}
            >
                <input type='hidden' value={data?.id} name='id' />

                <div className={classes["popup-address__input-wrap"]}>
                    <Form.InputDefault
                        style={"contained"}
                        inputSettings={{
                            id: "city",
                            name: "city",
                            type: "text",
                            placeholder: "City",
                            defaultValue: data?.city,
                        }}
                    />
                    <Form.InputDefault
                        style={"contained"}
                        inputSettings={{
                            id: "street",
                            name: "street",
                            type: "text",
                            placeholder: "Street",
                            defaultValue: data?.street,
                        }}
                    />
                    <Form.InputDefault
                        style={"contained"}
                        inputSettings={{
                            id: "postalCode",
                            name: "postalCode",
                            type: "number",
                            placeholder: "Postal code",
                            maxLength: 6,
                            defaultValue: data?.postalCode,
                        }}
                    />
                </div>
                <ButtonCustom
                    styleSettings={{
                        color: "DARK",
                        fill: "SOLID",
                        roundness: "ROUNDED",
                        size: "MEDIUM",
                        type: "DEFAULT",
                    }}
                    typeProperty='submit'
                >
                    {!data ? "Add" : "Update"}
                </ButtonCustom>
            </Form>
        </PopupPreview>
    );
}
