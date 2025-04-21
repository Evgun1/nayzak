"use client";

import classes from "./Pagination.module.scss";
import React, {
    FC,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
} from "react";
import { useSearchParams } from "next/navigation";
import PaginationLink from "./PaginationLink";

type PaginationProps = {
    totalCount: number;
    limit: number;
};

const Pagination: FC<PaginationProps> = (props) => {
    const { limit, totalCount } = props;

    const searchParams = useSearchParams();

    const urlSearchParams = new URLSearchParams(searchParams.toString());

    const paginationLinkArr: ReactElement[] = [];

    const activePage = urlSearchParams.has("page")
        ? parseInt(urlSearchParams.get("page") as string)
        : 1;

    let dotsAdded = false;

    for (let index = 1; index <= Math.ceil(totalCount / limit); index++) {
        if (activePage + 4 > index && activePage - 1 <= index) {
            paginationLinkArr.push(
                <PaginationLink
                    urlSearchParams={urlSearchParams}
                    key={index}
                    index={index}
                    activePage={activePage}
                />
            );
        } else if (
            +activePage <= totalCount - 3 &&
            index >= +activePage + 1 &&
            index < Math.ceil(totalCount / limit) - 3
        ) {
            if (!dotsAdded) {
                paginationLinkArr.push(<div key='dots'>...</div>);
                dotsAdded = true;
            }
        } else if (index >= Math.ceil(totalCount / limit) - 3) {
            paginationLinkArr.push(
                <PaginationLink
                    urlSearchParams={urlSearchParams}
                    key={index}
                    index={index}
                    activePage={activePage}
                />
            );
        }
    }

    return <div className={classes["pagination"]}>{paginationLinkArr}</div>;
};

export default Pagination;
