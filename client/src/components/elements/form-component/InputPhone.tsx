"use client";

import { RefObject, useRef } from "react";
import classes from "./InputPhone.module.scss";
import DropDown from "@/lib/ui/drop-down/DropDown";

type InputDefaultProps = {
    style: "line" | "contained";
};

export default function InputPhone({ style = "contained" }: InputDefaultProps) {
    const inputContainerRef = useRef(null) as RefObject<HTMLDivElement>;

    const handleFocus = () => {
        if (!inputContainerRef.current) return;
        inputContainerRef.current.classList.add(classes["input--focus"]);
    };

    const handleBlur = () => {
        if (!inputContainerRef.current) return;
        inputContainerRef.current.classList.remove(classes["input--focus"]);
    };

    return (
        <div
            ref={inputContainerRef}
            id='input-container'
            className={
                style === "contained"
                    ? classes["input--container-contained"]
                    : classes["input--container-line"]
            }
        >
            <DropDown
                btnCustomSettings={{
                    color: "DARK",
                    type: "TEXT",
                    size: "X_SMALL",
                }}
                styles={classes["input--container-btn"]}
            >
                <DropDown.Trigger typeProperty='click'>
                    <div>country</div>
                </DropDown.Trigger>
                <DropDown.Body>
                    <DropDown.Item elementType='button'>country</DropDown.Item>
                </DropDown.Body>
            </DropDown>
            <span className={classes["input--container-separator"]}></span>
            <input
                id='input-default'
                className={classes["input--container-input"]}
                placeholder='input'
                type='text'
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
}
