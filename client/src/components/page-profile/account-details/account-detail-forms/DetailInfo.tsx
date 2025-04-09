"use client";

import Form from "@/lib/ui/form/Form";
import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import { validation } from "@/utils/validator/validator";
import { RefObject, useRef } from "react";
import { z, ZodObject } from "zod";

import classes from "./DetailInfo.module.scss";
import { writeCustomerAction } from "@/lib/redux/store/customer/action";

const schemaDetailInformation: Array<ZodObject<any>> = [];

schemaDetailInformation.push(
    z.object({ ...validation.customer, email: validation.auth.register.email })
);

const DetailInfo = () => {
    const dispatch = useAppDispatch();
    const customerSelector = useAppSelector(
        (state) => state.customer.customerData
    );

    const emailSelector = useAppSelector(
        (state) => state.auth.credentials?.email
    );

    const dataInformationHandler = (event: { data: any }) => {
        const formData = new FormData();
        for (const key in event.data) {
            if (!Object.keys(event.data).includes(key)) continue;

            formData.set(key, event.data[key].toString().trim());
        }

        dispatch(writeCustomerAction(formData));
    };

    return (
        <Form
            schema={schemaDetailInformation}
            submitHandler={dataInformationHandler}
            className={classes["account-details-customer"]}
        >
            <div className={classes["account-details-customer__input-wrap"]}>
                <Form.InputDefault
                    label='First name *'
                    inputSettings={{
                        placeholder: "Fist name",
                        id: "firstName",
                        name: "firstName",
                        type: "text",
                        defaultValue: customerSelector?.firstName,
                    }}
                    style='contained'
                />
                <Form.InputDefault
                    label='Last name *'
                    inputSettings={{
                        placeholder: "Last name",
                        id: "lastName",
                        name: "lastName",
                        type: "text",
                        defaultValue: customerSelector?.lastName,
                    }}
                    style='contained'
                />
                <Form.InputDefault
                    label='Phone *'
                    inputSettings={{
                        placeholder: "Phone",
                        id: "phone",
                        name: "phone",
                        type: "number",
                        maxLength: 20,
                        defaultValue:
                            customerSelector?.phone !== 0
                                ? customerSelector?.phone
                                : "",
                    }}
                    style='contained'
                />
                <Form.InputDefault
                    label='Email *'
                    inputSettings={{
                        placeholder: "Email",
                        id: "email",
                        name: "email",
                        type: "email",
                        autoComplete: "email",

                        defaultValue: emailSelector,
                    }}
                    style='contained'
                />
            </div>
            <ButtonCustom
                typeProperty='submit'
                styleSettings={{
                    fill: "SOLID",
                    color: "DARK",
                    roundness: "ROUNDED",
                    type: "DEFAULT",
                    size: "SMALL",
                }}
            >
                Send
            </ButtonCustom>
        </Form>
    );
};

export default DetailInfo;
