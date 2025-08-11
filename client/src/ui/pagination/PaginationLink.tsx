import Link from "next/link";
import { FC } from "react";
import classes from "./PaginationLink.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
type PaginationItemProps = {
    index: number;
    activePage: number;
    urlSearchParams: URLSearchParams;
};

const PaginationLink: FC<PaginationItemProps> = (props) => {
    const { activePage, index, urlSearchParams } = props;
    urlSearchParams.set("page", index.toString());

    return (
        <Link
            className={`${TextClassList.SEMIBOLD_18} ${
                activePage !== index
                    ? classes["pagination-link"]
                    : `${classes["pagination-link"]} ${classes["pagination-link--action"]}`
            }`}
            href={`?${urlSearchParams}`}
            key={index}
        >
            {index}
        </Link>
    );
};

export default PaginationLink;
