"use client";

import classes from "./PopupAuth.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { loginAction, registrationAction } from "@/lib/redux/store/auth/action";
import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import Form from "../elements/form-component/FormComponent";
import { validation } from "@/utils/validator/validator";
import IconsIdList from "../elements/icons/IconsIdList";
import { popupActions } from "@/lib/redux/store/popup/popup";
import { z, ZodEffects, ZodObject } from "zod";
import { CredentialsDTO } from "@/lib/redux/store/auth/credentials.type";

const PopupAuth = () => {
    const errorMessage = useAppSelector((state) => state.auth.errorMessage);
    const dispatch = useAppDispatch();
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const submitHandler = (event: { data: CredentialsDTO }) => {
        if (isRegister) {
            dispatch(
                registrationAction({
                    email: event.data.email,
                    password: event.data.password,
                })
            );
        } else {
            dispatch(
                loginAction({
                    email: event.data.email,
                    password: event.data.password,
                })
            );
        }
    };

    const resSchema: Array<ZodObject<any> | ZodEffects<ZodObject<any>>> = [];

    isRegister
        ? resSchema.push(z.object(validation.auth.register))
        : resSchema.push(z.object(validation.auth.login));

    return (
        <div className={classes.auth}>
            <div className={classes["auth__header-wrap"]}>
                <div className={classes["auth__header"]}>
                    <h4>{isRegister ? "Sing up" : "Sing in"}</h4>
                    <ButtonCustom
                        styleSettings={{
                            color: "DARK",
                            fill: "SOLID",
                            type: "SQUARE",
                            roundness: "SHARP",
                            size: "MEDIUM",
                            icon: { left: "CLOSE" },
                        }}
                        onClick={() => dispatch(popupActions.toggle(null))}
                    />
                </div>
                <div>
                    Already have an account?
                    <ButtonCustom
                        styleSettings={{
                            color: "DARK",
                            size: "X_SMALL",
                            type: "TEXT",
                        }}
                        onClick={() => setIsRegister((prev) => !prev)}
                    >
                        {isRegister ? "Sing in" : "Sing up"}
                    </ButtonCustom>
                </div>
            </div>
            <Form
                schema={resSchema}
                oneMessage
                submitHandler={submitHandler}
                customError={errorMessage}
            >
                <Form.InputDefault
                    style='line'
                    inputSettings={{
                        id: "email",
                        name: "email",
                        type: "text",
                        placeholder: "Email",
                        // required: true,
                        autoComplete: "email",
                    }}
                />
                <Form.InputDefault
                    style='line'
                    inputSettings={{
                        id: "password",
                        name: "password",
                        type: showPassword ? "text" : "password",
                        placeholder: "Password",
                        // required: true,
                        autoComplete: "current-password",
                    }}
                    buttonSettings={{
                        right: {
                            type: "button",
                            icon: IconsIdList.VIEWS,
                            onClick: () => setShowPassword((prev) => !prev),
                        },
                    }}
                />
                <ButtonCustom
                    typeProperty='submit'
                    styleSettings={{
                        color: "DARK",
                        fill: "SOLID",
                        roundness: "ROUNDED",
                        size: "LARGE",
                        type: "DEFAULT",
                    }}
                >
                    {isRegister ? "Sing up" : "Sing in"}
                </ButtonCustom>
            </Form>
        </div>
    );
};

export default PopupAuth;
