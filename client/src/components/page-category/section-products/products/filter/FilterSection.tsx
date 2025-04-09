"use client";

import { TextClassList } from "@/types/textClassList.enum";
import { useState } from "react";
import classes from "./FilterSection.module.scss";

import NavLink from "@/lib/ui/nav-link/NavLink";
import SliderPrice from "@/lib/ui/slider-price/SliderPrice";

interface objectArrayInterface {
    id: number;
    title: string;
}

type FilterSectionProps = {
    objectArray?: objectArrayInterface[];
    searParams: URLSearchParams;
};

export default function FilterSection({
    objectArray,
    searParams,
}: FilterSectionProps) {
    const [showBlock, setShowBlock] = useState<boolean>(true);

    const btnClickHandler = () => setShowBlock(!showBlock);

    return (
        <div className={classes.filter}>
            <SliderPrice />
        </div>
    );
}
