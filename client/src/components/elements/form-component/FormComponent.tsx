"use client";

import React, { FormEvent, ReactElement, ReactNode, useState } from "react";
import InputTextArea from "./InputTextArea";
import {
    boolean,
    date,
    isValid,
    ZodEffects,
    ZodObject,
    ZodRawShape,
} from "zod";

import InputDefault from "./InputDefault";

import classes from "./FormComponent.module.scss";
import { InputType } from "./InputType";
import appObjectValidation from "../../../utils/validator/appObjectValidation";
import appEffectsValidation from "../../../utils/validator/appEffectsValidation";
import Radio from "./Radio";
import { renderToStaticMarkup } from "react-dom/server";
import { log } from "console";
import internal from "stream";
import appSchemaHandler from "@/utils/validator/appSchemaHandler";
import InputHidden from "./InputHidden";

type FormComponentProps<T extends ZodRawShape> = {
    children: ReactNode;
    oneMessage?: boolean;
    schema?: Array<ZodObject<T> | ZodEffects<ZodObject<T>>>;
    submitHandler?: (
        data: { data: any },
        event: FormEvent<HTMLFormElement>
    ) => void;
    customError?: string | null;
    classe?: string;
};

const FormComponent = <T extends ZodRawShape>({
    children,
    schema = [],
    oneMessage = false,
    submitHandler,
    customError,
    classe,
}: FormComponentProps<T>) => {
    const [errorMessages, setErrorMessages] = useState<
        Record<string, string[]>
    >({});
    const [radioValue, setRadioValue] = useState<string>();

    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const { error, hasErrors } = appSchemaHandler({
            formData,
            schema: schema ?? [],
        });

        setErrorMessages(error);

        if (!hasErrors && submitHandler) {
            const elements = event.currentTarget.elements;

            const object = new Object() as { [key: string]: any };
            Array.from(elements).map((data) => {
                const inputElement = data as HTMLInputElement;

                const inputName = inputElement.name;
                const inputValue = inputElement.value;

                if (inputValue) {
                    object[inputName] = inputValue;
                }
                delete object[""];
            });

            submitHandler({ data: object }, event);
        }
    };

    const onChangeHandler = (event: FormEvent<HTMLFormElement>) => {
        const target = event.target as HTMLInputElement;

        if (target.type === "radio") {
            Array.from(event.currentTarget).map((data) => {
                const input = data as HTMLInputElement;
                if (input !== target) {
                    input.value = "";
                    input.checked = false;
                } else {
                    input.value = target.id;
                    input.checked = true;
                    setRadioValue(target.value);
                }
            });

            onSubmitHandler(event);
        }

        if (Object.keys(errorMessages).length > 0) {
            const formData = new FormData(event.currentTarget);
            const { error } = appSchemaHandler({
                formData,
                schema: schema ?? [],
            });
            setErrorMessages(error);
        }
    };

    const formRecursion = (children: ReactNode) => {
        return React.Children.map(children, (child): ReactNode => {
            if (!React.isValidElement(child)) return child;

            if (typeof child.type === "function") {
                switch (child.type) {
                    case InputDefault:
                    case InputTextArea:
                    case InputHidden:
                        const inputChild = child as ReactElement<InputType>;

                        const name = inputChild.props.inputSettings?.name;
                        let error: string[] | undefined;

                        if (oneMessage) {
                            error = errorMessages[name]
                                ? [errorMessages[name]?.[0]]
                                : undefined;
                        } else {
                            error = errorMessages[name]
                                ? errorMessages[name]
                                : undefined;
                        }

                        if (customError) {
                            error = [customError];
                        }

                        return React.cloneElement(inputChild, { error });

                    case Radio:
                        const inputRadioChild = child as ReactElement<{
                            value: string;
                            onClick: () => void;
                        }>;

                        return React.cloneElement(inputRadioChild, {
                            value: radioValue,
                        });
                    default:
                        const childTypeFunction = child.type as Function;
                        const clonedElement = childTypeFunction(
                            child.props
                        ) as ReactElement<{
                            children: ReactNode;
                        }>;

                        return React.cloneElement(clonedElement, {
                            children: formRecursion(
                                clonedElement.props.children
                            ),
                        });
                }
            } else {
                const childWithChildren = child as ReactElement<{
                    children: ReactNode;
                }>;

                return React.cloneElement(childWithChildren, {
                    children: formRecursion(childWithChildren.props.children),
                });
            }
        });
    };

    return (
        <form
            className={`${classes["form"]} ${classe ? classe : ""}`}
            onChange={onChangeHandler}
            onSubmit={onSubmitHandler}
        >
            {formRecursion(children)}
        </form>
    );
};

const Form = Object.assign(FormComponent, {
    InputDefault: InputDefault,
    InputTextArea: InputTextArea,
    InputHidden: InputHidden,
    Radio: Radio,
    // InputPhone: InputPhone,
});

export default Form;
