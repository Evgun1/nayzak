"use client";

import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import classes from "./productList.module.scss";

type LoaderProps = {
    children: ReactNode;
    totalCount: number;

    style?: any;
    btnClickHandler?: () => void;
};

const LoadMore: FC<LoaderProps> = ({
    totalCount,
    children,
    btnClickHandler,
    style,
}) => {
    if (!children) return;
    const [length, setLength] = useState<number>(0);

    const childrenArr = children as ReactElement[][];

    useEffect(() => {
        const length = childrenArr
            .map((child, i) => child.length)
            .reduce((a, b) => a + b, 0);

        setLength(length);
    }, [children]);

    return (
        <div>
            <ul className={`${style} ${classes.grid}`}>{children}</ul>
            {totalCount > length && (
                <ButtonCustom
                    onClick={btnClickHandler}
                    styleSettings={{
                        fill: "SOLID",
                        size: "MEDIUM",
                        type: "DEFAULT",
                        color: "DARK",
                        roundness: "SHARP",
                    }}
                >
                    Load More
                </ButtonCustom>
            )}
        </div>
    );
};

export default LoadMore;
