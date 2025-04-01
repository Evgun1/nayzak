import React, { FC, ReactNode, Ref, useRef } from "react";
import classes from "./Accordion.module.scss";

interface AccordionBodyProps {
    children: ReactNode;
    className?: string;
}

const AccordionBody: FC<AccordionBodyProps> = ({ children, className }) => {
    return (
        <div id='accordion-body' className={`${classes["accordion__body"]}`}>
            <div className={className ? className : ""}>{children}</div>
        </div>
    );
};

export default AccordionBody;
