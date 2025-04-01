"use client";

import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import classes from "./LoadMore.module.scss";

type LoaderProps = {
    children: ReactNode;
    totalCount: number;
    className?: any;
    btnClickHandler?: () => void;
};

const LoadMore: FC<LoaderProps> = ({
    totalCount,
    children,
    btnClickHandler,
    className,
}) => {
    const [length, setLength] = useState<number>(0);

    const childrenArr = children as ReactElement[][];

    useEffect(() => {
        const length = childrenArr
            .map((child, i) => {
                if (child) {
                    return child.length;
                }

                return 0;
            })
            .reduce((a, b) => {
                return a + b;
            }, 0);

        setLength(length);
    }, [childrenArr]);

    if (!children) return;

    return (
        <div>
            <ul className={`${className} ${classes["load-more"]}`}>
                {children}
            </ul>
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
