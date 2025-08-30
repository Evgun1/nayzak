"use client";

import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation";
import classes from "./SliderPrice.module.scss";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ButtonCustom } from "@/ui/custom-elements/button-custom/ButtonCustom";
import { appMinMaxPriceGet } from "@/lib/api/products";
import { TextClassList } from "@/types/textClassList.enum";
import getIdCategoryOrSubcategory from "@/utils/getIdCategoryOrSubcategory";

type SliderPriceProps = {
	minPrice: number;
	maxPrice: number;
	className?: string;
};
export const SliderPrice: FC<SliderPriceProps> = (props) => {
	// const [minPrice, setMinPrice] = useState<number>(0);
	// const [maxPrice, setMaxPrice] = useState<number>(0);
	const [inputMinPrice, setInputMinPrice] = useState(props.minPrice);
	const [inputMaxPrice, setInputMaxPrice] = useState(props.maxPrice);
	const searchParam = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const param = useParams() as Record<string, any>;

	const slug: string[] = useMemo(() => {
		const slug = [];
		for (const key in param) {
			const { categoryId, subcategoryId } = getIdCategoryOrSubcategory({
				params: { [key]: param[key] },
			});

			if (categoryId) {
				slug.push(categoryId.toString());
			}

			if (subcategoryId) {
				slug.push(subcategoryId.toString());
			}
		}
		return slug;
	}, [param]);

	const sliderHandler = useCallback(
		async (searchParam: URLSearchParams) => {
			const prices = await appMinMaxPriceGet(searchParam, slug);

			if (!prices) return;

			const { maxPrice, minPrice } = prices;

			// setMinPrice(minPrice);
			// setMaxPrice(maxPrice);

			const inputMinPrice = searchParam.has("minPrice")
				? parseInt(searchParam.get("minPrice") as string)
				: props.minPrice;

			const inputMaxPrice = searchParam.has("maxPrice")
				? parseInt(searchParam.get("maxPrice") as string)
				: props.maxPrice;

			setInputMinPrice(inputMinPrice);
			setInputMaxPrice(inputMaxPrice);
		},
		[slug],
	);

	const btnClickHandel = () => {
		const urlSearchParams = new URLSearchParams(searchParam.toString());
		urlSearchParams.set(
			"minPrice",
			inputMinPrice?.toString() ?? props.minPrice?.toString(),
		);
		urlSearchParams.set(
			"maxPrice",
			inputMaxPrice?.toString() ?? props.maxPrice?.toString(),
		);

		router.push(`${pathname}?${urlSearchParams}`);

		sliderHandler(urlSearchParams);
	};

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
								inputMaxPrice - 1,
							);
							setInputMinPrice(value);
						}}
						name="price"
						min={props.minPrice}
						max={props.maxPrice}
						step={1}
						value={inputMinPrice}
						disabled={inputMinPrice >= inputMaxPrice}
					/>
					<input
						id="maxPrice"
						className={classes["slider-price__input"]}
						type="range"
						onChange={(event) => {
							const value = Math.max(
								+event.target.value,
								inputMinPrice + 1,
							);
							setInputMaxPrice(value);
						}}
						name="price"
						max={props.maxPrice}
						min={props.minPrice}
						step={1}
						value={inputMaxPrice}
						disabled={inputMaxPrice <= inputMinPrice}
					/>
				</div>
			</div>
			<div className={classes["slider-price__price"]}>
				<span>${inputMinPrice ? inputMinPrice : props.minPrice}</span>
				<span>-</span>
				<span>${inputMaxPrice ? inputMaxPrice : props.maxPrice}</span>
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
