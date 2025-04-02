"use client";

import { FC, ReactNode, useEffect } from "react";
import ButtonCustom, {
    StyleSettingsObject,
} from "../custom-elements/button-custom/ButtonCustom";
import { useSelect } from "./SelectContext";

const SelectTrigger: FC<{
    label: string;
    styleSetting: StyleSettingsObject;
    defaultSelectKey: string | undefined;
}> = ({ defaultSelectKey, label, styleSetting }) => {
    const { defaultLabel, addDefaultLabel } = useSelect();

    useEffect(() => {
        console.log(defaultLabel);
    }, [defaultLabel]);

    return (
        <ButtonCustom styleSettings={styleSetting}>{defaultLabel}</ButtonCustom>
    );
};

export default SelectTrigger;
