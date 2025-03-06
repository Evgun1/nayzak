"use client";

import DisplayIcon from "@/components/elements/icons/displayIcon";
import classes from "./Toolbar.module.scss";
import IconsIdList from "@/components/elements/icons/IconsIdList";
import Link from "next/link";
import { FC, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilterContext } from "../filter/FilterCtx";
import DropDown from "@/lib/ui/drop-down/DropDown";
import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";
import Select from "@/lib/ui/select/Select";

enum TypeList {
    FIVE = "five_grid",
    FOUR = "four_grid",
    THREE = "three_grid",
    TWO = "two_grid",
    LIST = "list",
}

const SELECTOR = [
    { icon: IconsIdList.FIVE_COLUMS, typeList: TypeList.FIVE },
    { icon: IconsIdList.FOUR_COLUMS, typeList: TypeList.FOUR },
    { icon: IconsIdList.THREE_COLUMS, typeList: TypeList.THREE },
    { icon: IconsIdList.TWO_COLUMS, typeList: TypeList.TWO },
    { icon: IconsIdList.LIST_COLUMS, typeList: TypeList.LIST },
];

const sortData = [
    {
        title: "Price: Ascending",
        valueName: {
            sortBy: "price",
            sort: "asc",
        },
    },
    {
        title: "Price: Descending",
        valueName: {
            sortBy: "price",
            sort: "desc",
        },
    },
    {
        title: "By Rating",
        valueName: {
            sortBy: "rating",
            sort: "desc",
        },
    },
];

type ToolbarProps = {
    totalCount?: number;
};

const Toolbar: FC<ToolbarProps> = ({ totalCount }) => {
    const { isActive, setIsActive } = useContext(FilterContext);

    const btnClickFilter = () => setIsActive(!isActive);

    return (
        <div className={classes["toolbar"]}>
            <div className={classes["toolbar__wrap"]}>
                <span>{totalCount} products</span>
                <div className={classes["toolbar__filter"]}>
                    <ButtonCustom
                        onClick={btnClickFilter}
                        styleSettings={{
                            size: "SMALL",
                            type: "TEXT",
                            color: "DARK",
                        }}
                    >
                        Filter
                    </ButtonCustom>

                    <Select
                        label='Sort By'
                        trackByQuery
                        styleSetting={{
                            type: "TEXT",
                            fill: "SOLID",
                            color: "DARK",
                            size: "SMALL",
                            icon: { right: "CHEVRON" },
                        }}
                    >
                        {sortData.map((value, index) => (
                            <Select.OptionLink
                                key={index}
                                href={{ queryParams: value.valueName }}
                            >
                                {value.title}
                            </Select.OptionLink>
                        ))}
                    </Select>

                    <ul className={classes["toolbar__selector"]}>
                        {SELECTOR.map((value, index) => (
                            <li key={index}>
                                <ListBtn
                                    icon={value.icon}
                                    typeList={value.typeList}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* <div className={classes.wrapper__filter_button}>
                <div></div>
            </div> */}
        </div>
    );
};

type ListBtnProps = {
    icon: IconsIdList;
    typeList: string;
};
const ListBtn: FC<ListBtnProps> = ({ typeList, icon }) => {
    const [activeBtn, setActiveBtn] = useState<boolean>(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (
            searchParams.has("list_type") &&
            searchParams.get("list_type") !== null
        ) {
            setActiveBtn(searchParams.get("list_type") === typeList);
        } else {
            setActiveBtn(TypeList.FIVE === typeList);
        }
    }, [searchParams]);

    return (
        <Link
            scroll={false}
            href={`?list_type=${typeList}`}
            className={`${classes["toolbar__selector-button"]} ${
                activeBtn ? classes["toolbar__selector-button--action"] : ""
            }`}
        >
            <DisplayIcon
                className={classes["toolbar__selector-icon"]}
                iconName={icon}
            />
        </Link>
    );
};

export default Toolbar;
