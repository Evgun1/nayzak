"use client";

import React, {
    ChangeEvent,
    FC,
    ReactElement,
    Ref,
    RefObject,
    useEffect,
    useRef,
    useState,
} from "react";
import DisplayIcon from "../../../components/elements/icons/displayIcon";
import IconsIdList from "../../../components/elements/icons/IconsIdList";
import classes from "./InputDefault.module.scss";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import { InputType } from "./InputType";
import { TextClassList } from "@/types/textClassList.enum";

interface ButtonItem {
    icon?: IconsIdList;
    text?: string;
    onClick?: () => void;
    type: "reset" | "submit" | "button";
}

interface IconItem {
    left?: ButtonItem;
    right?: ButtonItem;
}

interface InputDefaultProps extends InputType {
    style: "line" | "contained";
    customClasses?: string;
    icon?: IconItem;
    label?: string;
}

const InputDefault: FC<InputDefaultProps> = ({
    style,
    icon,
    inputSettings,
    label,
    customClasses,
    error,
}) => {
    const inputContainerRef = useRef(null) as RefObject<HTMLDivElement>;
    const inputRef = useRef() as RefObject<HTMLInputElement>;

    const [displayMessage, setDisplayMessage] = useState<any>("");

    const handleFocus = () => {
        if (!inputContainerRef.current) return;
        inputContainerRef.current.classList.add(classes["input--focus"]);
    };

    const handleBlur = () => {
        if (!inputContainerRef.current) return;
        inputContainerRef.current.classList.remove(classes["input--focus"]);
    };

    useEffect(() => {
        if (inputSettings.defaultValue) {
            setDisplayMessage(inputSettings.defaultValue);
        }
    }, [inputSettings.defaultValue]);

    useEffect(() => {
        if (error !== undefined) {
            inputContainerRef.current?.classList.add(classes["input--error"]);
        } else {
            inputContainerRef.current?.classList.remove(
                classes["input--error"]
            );
        }
    }, [error]);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (
            inputSettings.maxLength &&
            displayMessage.length <= inputSettings.maxLength + 1
        ) {
            if (value.length < inputSettings.maxLength + 1) {
                setDisplayMessage(value);
            }
        } else {
            setDisplayMessage(value);
        }
    };

    const elements: ReactElement[] = [];

    elements.push(
        <input
            ref={inputRef}
            id={inputSettings?.id}
            name={inputSettings?.name}
            className={`${classes["input__item"]} ${
                inputSettings.disabled && classes["input__item--disabled"]
            }`}
            placeholder={inputSettings?.placeholder}
            type={inputSettings?.type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={inputSettings?.required}
            autoComplete={inputSettings.autoComplete}
            onChange={changeHandler}
            value={displayMessage}
        />
    );
    if (icon?.left && icon?.right) {
        elements.unshift(
            <button
                type={icon?.left?.type}
                className={`${classes["input__btn"]} ${
                    inputSettings.disabled && classes["input__btn--disabled"]
                }`}
                onClick={icon.left.onClick}
            >
                {icon.left.icon ? (
                    <DisplayIcon
                        className={classes["input__btn-icon"]}
                        iconName={icon.left.icon}
                    />
                ) : (
                    <span className={ButtonClassList.BUTTON_SMALL}>
                        {icon.left.text}
                    </span>
                )}
            </button>
        );
        elements.push(
            <button
                type={icon?.right?.type}
                className={`${classes["input__btn"]} ${
                    inputSettings.disabled && classes["input__btn--disabled"]
                }`}
                onClick={icon.right.onClick}
            >
                {icon.right.icon ? (
                    <DisplayIcon
                        className={classes["input__btn-icon"]}
                        iconName={icon.right.icon}
                    />
                ) : (
                    <span className={ButtonClassList.BUTTON_SMALL}>
                        {icon.right.text}
                    </span>
                )}
            </button>
        );
    } else if (icon?.left) {
        elements.unshift(
            <button
                type={icon?.left?.type}
                className={`${classes["input__btn"]} ${
                    inputSettings.disabled && classes["input__btn--disabled"]
                }`}
                onClick={icon.left.onClick}
            >
                {icon.left.icon ? (
                    <DisplayIcon
                        className={classes["input__btn-icon"]}
                        iconName={icon.left.icon}
                    />
                ) : (
                    <span className={ButtonClassList.BUTTON_SMALL}>
                        {icon.left.text}
                    </span>
                )}
            </button>
        );
    } else if (icon?.right) {
        elements.push(
            <button
                type={icon?.right?.type}
                className={`${classes["input__btn"]} ${
                    inputSettings.disabled && classes["input__btn--disabled"]
                }`}
                onClick={icon.right.onClick}
            >
                {icon.right.icon ? (
                    <DisplayIcon
                        className={classes["input__btn-icon"]}
                        iconName={icon.right.icon}
                    />
                ) : (
                    <span className={ButtonClassList.BUTTON_SMALL}>
                        {icon.right.text}
                    </span>
                )}
            </button>
        );
    }

    return (
        <div
            className={`${classes["input"]} ${
                customClasses ? customClasses : ""
            } ${inputSettings.disabled && classes["input--disabled"]}`}
        >
            {label && (
                <span className={TextClassList.SEMIBOLD_16}>{label}</span>
            )}
            <div
                ref={inputContainerRef}
                id='input-container'
                className={
                    style === "contained"
                        ? `${classes["input__contained"]} 
						${inputSettings.disabled && classes["input__contained--disabled"]}`
                        : `${classes["input__line"]} 
						${inputSettings.disabled && classes["input__line--disabled"]}
						`
                }
            >
                {elements}
            </div>

            {error && error.length > 0 && (
                <div className={classes["input__error-container"]}>
                    {error.map((val, i) => (
                        <span
                            key={i}
                            className={`${TextClassList.REGULAR_12} ${classes["input__error"]}`}
                        >
                            {val}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InputDefault;
