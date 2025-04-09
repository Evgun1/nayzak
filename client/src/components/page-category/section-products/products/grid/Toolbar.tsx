"use client";

import classes from "./Toolbar.module.scss";
import IconsIdList from "@/components/elements/icons/IconsIdList";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilterContext } from "../filter/FilterCtx";
import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";
import { Select, SelectItem } from "@/lib/ui/select/Select";
import ListTypeButton from "./ListTypeButton";

export enum TypeList {
    FIVE = "five_grid",
    FOUR = "four_grid",
    THREE = "three_grid",
    TWO = "two_grid",
    LIST = "list",
}

const SELECTOR = [
    { icon: IconsIdList.FIVE_COLUMNS, typeList: TypeList.FIVE },
    { icon: IconsIdList.FOUR_COLUMNS, typeList: TypeList.FOUR },
    { icon: IconsIdList.THREE_COLUMNS, typeList: TypeList.THREE },
    { icon: IconsIdList.TWO_COLUMNS, typeList: TypeList.TWO },
    { icon: IconsIdList.LIST_COLUMNS, typeList: TypeList.LIST },
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
    const [defaultKey, setDefaultKey] = useState<string | undefined>(undefined);
    const searchParams = useSearchParams();

    const getDefaultSelectKey = useCallback(() => {
        const [sortBySearch, sortSearch] = searchParams
            .toString()
            .split("&")
            .map((val) => val.split("="));

        let title;

        for (const element of sortData) {
            if (
                sortBySearch.includes(element.valueName.sortBy) &&
                sortSearch.includes(element.valueName.sort)
            ) {
                title = element.title;
            }
        }

        return title?.toLocaleLowerCase();
    }, [searchParams]);

    const btnClickFilter = () => setIsActive(!isActive);

    useEffect(() => {
        setDefaultKey(getDefaultSelectKey());
    }, [getDefaultSelectKey]);

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
                        defaultSelectKey={defaultKey}
                        styleSetting={{
                            type: "TEXT",
                            fill: "SOLID",
                            color: "DARK",
                            size: "SMALL",
                            icon: { right: "CHEVRON" },
                        }}
                    >
                        {sortData.map((value, index) => (
                            <SelectItem
                                textValue={value.title}
                                itemKey={value.title.toLowerCase()}
                                key={index}
                            >
                                <LinkCustom
                                    styleSettings={{
                                        color: "DARK",
                                        size: "X_SMALL",
                                        type: "TEXT",
                                        fill: "SOLID",
                                        roundness: "SHARP",
                                    }}
                                    href={{ queryParams: value.valueName }}
                                >
                                    {value.title}
                                </LinkCustom>
                            </SelectItem>
                        ))}
                    </Select>

                    <ul className={classes["toolbar__selector"]}>
                        {SELECTOR.map((value, index) => (
                            <li key={index}>
                                <ListTypeButton
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

// type ListBtnProps = {
//     icon: IconsIdList;
//     typeList: string;
// };
// const ListBtn: FC<ListBtnProps> = ({ typeList, icon }) => {
//     const [activeBtn, setActiveBtn] = useState<boolean>(false);
//     const searchParams = useSearchParams();

//     useEffect(() => {
//         if (
//             searchParams.has("list_type") &&
//             searchParams.get("list_type") !== null
//         ) {
//             setActiveBtn(searchParams.get("list_type") === typeList);
//         } else {
//             setActiveBtn("five_grid" === typeList);
//         }
//     }, [searchParams]);

//     return (
//         <Link
//             scroll={false}
//             href={`?list_type=${typeList}`}
//             className={`${classes["toolbar__selector-button"]} ${
//                 activeBtn ? classes["toolbar__selector-button--action"] : ""
//             }`}
//         >
//             <DisplayIcon
//                 className={classes["toolbar__selector-icon"]}
//                 iconName={icon}
//             />
//         </Link>
//     );
// };

export default Toolbar;
