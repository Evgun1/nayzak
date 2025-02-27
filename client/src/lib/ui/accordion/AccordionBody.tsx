import React, { FC, ReactNode, Ref, useRef } from "react";
import classes from "./Accordion.module.scss";

interface AccordionBodyProps {
    children: ReactNode;
}

const AccordionBody: FC<AccordionBodyProps> = ({ children }) => {
    return (
        <div id='accordion-body' className={classes["accordion__body"]}>
            {children}
        </div>
    );
};

export default AccordionBody;
