"use client";

import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation";
import classes from "./SliderPrice.module.scss";

import { FC, useCallback, useEffect, useState } from "react";
import { appMinMaxPriceGet } from "@/lib/api/products";
import { TextClassList } from "@/types/textClassList.enum";

type SliderPriceProps = {
	minPrice?: number;
	maxPrice?: number;
	className?: string;
};
export const SliderPrice: FC<SliderPriceProps> = (props) => {
	const [minPriceState, setMinPriceState] = useState<number>(0);
	const [maxPriceState, setMaxPriceState] = useState<number>(0);
	const [inputMinPriceState, setInputMinPriceState] = useState(
		props.minPrice ? props.minPrice : minPriceState,
	);
	const [inputMaxPriceState, setInputMaxPriceState] = useState(
		props.maxPrice ? props.maxPrice : maxPriceState,
	);
	const searchParam = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const param = useParams() as { category: string; subcategory: string };

	const sliderHandler = useCallback(
		async (searchParam: URLSearchParams) => {
			const prices = await appMinMaxPriceGet(searchParam, [
				param.category,
				param.subcategory,
			]);

			if (!prices) return;

			const { maxPrice, minPrice } = prices;

			setMinPriceState(minPrice);
			setMaxPriceState(maxPrice);

			const inputMinPrice = searchParam.has("minPrice")
				? parseInt(searchParam.get("minPrice") as string)
				: minPrice;

			const inputMaxPrice = searchParam.has("maxPrice")
				? parseInt(searchParam.get("maxPrice") as string)
				: maxPrice;

			setInputMinPriceState(inputMinPrice);
			setInputMaxPriceState(inputMaxPrice);
		},
		[param],
	);

	// const btnClickHandel = () => {
	// 	const urlSearchParams = new URLSearchParams(searchParam.toString());
	// 	urlSearchParams.set(
	// 		"minPrice",
	// 		inputMinPrice.toString() ?? props.minPrice?.toString(),
	// 	);
	// 	urlSearchParams.set(
	// 		"maxPrice",
	// 		inputMaxPrice.toString() ?? props.maxPrice?.toString(),
	// 	);

	// 	router.push(`${pathname}?${urlSearchParams}`);

	// 	sliderHandler(urlSearchParams);
	// };

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(searchParam.toString());
		sliderHandler(urlSearchParams);
	}, [searchParam, sliderHandler]);

	return (
		<div
			className={`${classes["slider-price"]} ${
				props.className ? props.className : ""
			}`}
		>
			<div
				className={`${TextClassList.SEMIBOLD_14} ${classes["slider-price__title"]}`}
			>
				PRICE
			</div>
			<div className={classes["slider-price__range"]}>
				<div className={classes["slider-price__input-wrap"]}>
					<div className={classes["slider-price__line"]}></div>
					<input
						id="minPrice"
						className={classes["slider-price__input"]}
						type="range"
						onChange={(event) => {
							const value = Math.min(
								+event.target.value,
								inputMaxPriceState - 1,
							);
							setInputMinPriceState(value);
						}}
						name="price"
						min={props.minPrice}
						max={props.maxPrice}
						step={1}
						value={inputMinPriceState}
						disabled={inputMinPriceState >= inputMaxPriceState}
					/>
					<input
						id="maxPrice"
						className={classes["slider-price__input"]}
						type="range"
						onChange={(event) => {
							const value = Math.max(
								+event.target.value,
								inputMinPriceState + 1,
							);
							setInputMaxPriceState(value);
						}}
						name="price"
						max={props.maxPrice}
						min={props.minPrice}
						step={1}
						value={inputMaxPriceState}
						disabled={inputMaxPriceState <= inputMinPriceState}
					/>
				</div>
			</div>
			<div className={classes["slider-price__price"]}>
				<span>
					${inputMinPriceState ? inputMinPriceState : props.minPrice}
				</span>
				<span>-</span>
				<span>
					${inputMaxPriceState ? inputMaxPriceState : props.maxPrice}
				</span>
			</div>
			<div className={classes["slider-price__button-wrap"]}>
				{/* {inputMaxPrice < maxPrice ||
				inputMinPrice > minPrice ||
				searchParam.get("minPrice") ||
				searchParam.get("maxPrice") ? (
					// <button type="button" onClick={btnClickHandel}>
					//   Find
					// </button>
					<ButtonCustom
						className={classes["slider-price__button"]}
						// onClick={btnClickHandel}
						styleSettings={{
							fill: "SOLID",
							type: "DEFAULT",
							size: "X_SMALL",
							color: "DARK",
							roundness: "SHARP",
						}}
					>
						Show products
					</ButtonCustom>
				) : (
					<></>
				)} */}
			</div>
		</div>
	);
};
