"use client";
import { FC, ReactNode, useEffect } from "react";
import LinkCustom, {
    HrefObject,
} from "../custom-elements/link-custom/LinkCustom";
import ButtonCustom from "../custom-elements/button-custom/ButtonCustom";
import NavLink from "../nav-link/NavLink";
import classes from "./DropDown.module.scss";

interface TypePropertyObject {
    click: MouseEvent;
    mouseenter: MouseEvent;
}

type DropDownTriggerProps = {
    children: ReactNode;
    className?: string;
    typeProperty: keyof TypePropertyObject;
};

const DropDownTrigger: FC<DropDownTriggerProps> = (props) => {
    const { children, typeProperty, className, dropDownId } =
        props as DropDownTriggerProps & {
            dropDownId: string;
        };

    function eventListenerHandler(event: Event) {
        const target = event.target;
        const currentTarget = event.currentTarget;
        if (!target) return;
        if (!currentTarget) return;
        const targetHtmlLElement = target as HTMLElement;
        const currentTargetHtmlElement = currentTarget as HTMLElement;

        const dropDownBodyTargetEl = targetHtmlLElement.closest(
            `#${dropDownId}`
        );

        const dropDownBodyCurrentEl = currentTargetHtmlElement.querySelector(
            `#${dropDownId}`
        );

        const targetBody = targetHtmlLElement.querySelector("#drop-down__body");

        const bodyClassList = targetBody?.classList;

        if (event.type === "click") {
            if (dropDownBodyCurrentEl === dropDownBodyTargetEl) {
                const body =
                    dropDownBodyCurrentEl?.querySelector("#drop-down__body");
                body?.classList.toggle(classes["drop-down__body--visible"]);
            } else {
                const body =
                    dropDownBodyCurrentEl?.querySelector("#drop-down__body");

                if (
                    body?.classList.contains(
                        classes["drop-down__body--visible"]
                    )
                ) {
                    body?.classList.remove(classes["drop-down__body--visible"]);
                }
            }
        }
    }

    useEffect(() => {
        document.addEventListener("click", eventListenerHandler);

        return () => {
            document.removeEventListener("click", eventListenerHandler);
        };
    }, []);

    return (
        <ButtonCustom
            id='drop-down__trigger'
            styleSettings={{
                color: "DARK",
                roundness: "SHARP",
                size: "X_SMALL",
                type: "TEXT",
                icon: { right: "CHEVRON" },
            }}
        >
            {children}
        </ButtonCustom>
    );
};

export default DropDownTrigger;
