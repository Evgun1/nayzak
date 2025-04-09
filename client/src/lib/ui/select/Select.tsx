"use client";

import React, {
    FC,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
} from "react";
import ButtonCustom, {
    StyleSettingsObject,
} from "../custom-elements/button-custom/ButtonCustom";
import classes from "./Select.module.scss";
import { SelectProvider } from "./SelectContext";

import SelectItem from "./SelectItem";
import SelectBody from "./SelectBody";
import SelectTrigger from "./SelectTrigger";

type SelectComponentProps = {
    styleSetting: StyleSettingsObject;
    children: ReactNode;
    label: string;
    defaultSelectKey?: string;
};

const Select: FC<SelectComponentProps> = (props) => {
    const generateId = useId().replaceAll(":", "");
    const selectId = `select-${generateId}`;
    const { styleSetting, children, label, defaultSelectKey } = props;
    const eventListenerHandler = useCallback(
        (event: Event) => {
            const target = event.target as HTMLElement | undefined;
            const currentTarget = event.currentTarget as
                | HTMLElement
                | undefined;
            if (!target || !currentTarget) return;

            const mainElement = target.closest(`#${selectId}`);
            const mainCurrentElement = currentTarget.querySelector(
                `#${selectId}`
            );

            if (mainElement === mainCurrentElement) {
                const bodyElement =
                    mainCurrentElement?.querySelector("#select-body");
                const bodyClassList = bodyElement?.classList;
                if (!bodyClassList) return;

                bodyClassList.toggle(classes["select__body--visible"]);
            } else {
                const bodyClassList =
                    mainCurrentElement?.querySelector(
                        "#select-body"
                    )?.classList;
                if (!bodyClassList) return;

                if (bodyClassList.contains(classes["select__body--visible"])) {
                    bodyClassList.remove(classes["select__body--visible"]);
                }
            }
        },
        [selectId]
    );

    useLayoutEffect(() => {
        document.addEventListener("click", eventListenerHandler);
        return () =>
            document.removeEventListener("click", eventListenerHandler);
    }, [eventListenerHandler]);

    return (
        <SelectProvider label={label} defaultSelectKey={defaultSelectKey}>
            <div id={selectId} className={classes["select"]}>
                <SelectTrigger
                    defaultSelectKey={defaultSelectKey}
                    styleSetting={styleSetting}
                    label={label}
                />
                <SelectBody>{children}</SelectBody>
            </div>
        </SelectProvider>
    );
};

// const Select = Object.assign(SelectComponent, {
//     Item: SelectItem,
// });

export { Select, SelectItem };
