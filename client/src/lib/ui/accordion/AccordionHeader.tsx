import { FC, ReactNode } from "react";

import classes from "./Accordion.module.scss";

interface AccordionHeaderProps {
    children: ReactNode;
    className?: string;
}

const AccordionHeader: FC<AccordionHeaderProps> = ({ children, className }) => {
    return (
        <div
            id='accordion-header'
            className={`${classes["accordion__header"]} ${
                className ? className : ""
            }`}
        >
            {children}
        </div>
    );
};

export default AccordionHeader;
