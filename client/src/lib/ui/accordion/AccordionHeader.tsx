import { FC, ReactNode } from "react";

import classes from "./Accordion.module.scss";

interface AccordionHeaderProps {
    children: ReactNode;
}

const AccordionHeader: FC<AccordionHeaderProps> = ({ children }) => {
    return (
        <div id='accordion-header' className={classes["accordion__header"]}>
            {children}
        </div>
    );
};

export default AccordionHeader;
