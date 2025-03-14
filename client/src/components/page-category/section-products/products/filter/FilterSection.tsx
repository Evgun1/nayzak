"use client";

import { TextClassList } from "@/types/textClassList.enum";
import { useState } from "react";
import classes from "./FilterSection.module.scss";

// import {useSearchParams} from "next/navigation";
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
    // const searchParam = useSearchParams();

    const btnClickHandler = () => setShowBlock(!showBlock);

    return (
        <div className={classes.filter}>
            {/* <div className={classes['filter-item']}>
				<div
					className={`${TextClassList.SEMIBOLD_14}  ${classes['filter-item__title']}`}
					onClick={btnClickHandler}
				>
					CATEGORY
				</div>
				{showBlock && (
					<ul className={classes['filter-item__list']}>
						{objectArray &&
							objectArray.length > 0 &&
							objectArray.map((value, index) => (
								<li key={index}>
									<NavLink
										classesName={classes['filter-link']}
										href={{ queryParams: { category: value.title } }}
										// searchParams={searParams}
										styleSettings={{
											color: 'DARK',
											roundness: 'SHARP',
											type: 'TEXT',
											size: 'SMALL',
										}}
									>
										{value.title}
									</NavLink>
								</li>
							))}
					</ul>
				)}
			</div> */}
            <SliderPrice />
        </div>
    );
}
