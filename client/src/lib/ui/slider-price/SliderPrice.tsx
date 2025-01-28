'use client';

import {
	ReadonlyURLSearchParams,
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation';
// import { useFetchMinMaxPrice, useFetchAllProducts } from "../../../hooks/useFetchProducts";
import classes from './SliderPrice.module.scss';

import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { ButtonCustom } from '../custom-elements/button-custom/ButtonCustom';
import { appMinMaxPriceGet } from '@/utils/http/products';

type ScrollPriceProps = {
	urlSearchparams: URLSearchParams;
};

const SliderPrice = () => {
	const [minPrice, setMinPrice] = useState<number>(0);
	const [maxPrice, setMaxPrice] = useState<number>(0);
	const [inputMinPrice, setInputMinPrice] = useState(minPrice);
	const [inputMaxPrice, setInputMaxPrice] = useState(maxPrice);
	const searchParam = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const param = useParams();

	const slug = param.slug;

	const SliderHandler = async (searchParam: URLSearchParams) => {
		const prices = await appMinMaxPriceGet(searchParam, slug);
		if (!prices) return;

		const { maxPrice, minPrice } = prices;

		setMinPrice(minPrice);
		setMaxPrice(maxPrice);

		const inputMinPrice = searchParam.has('minPrice')
			? parseInt(searchParam.get('minPrice') as string)
			: minPrice;

		const inputMaxPrice = searchParam.has('maxPrice')
			? parseInt(searchParam.get('maxPrice') as string)
			: maxPrice;

		setInputMinPrice(inputMinPrice);
		setInputMaxPrice(inputMaxPrice);
	};

	const btnClickHandel = () => {
		const urlSearchParams = new URLSearchParams(searchParam.toString());
		urlSearchParams.set(
			'minPrice',
			inputMinPrice?.toString() ?? minPrice?.toString()
		);
		urlSearchParams.set(
			'maxPrice',
			inputMaxPrice?.toString() ?? maxPrice?.toString()
		);

		router.push(`${pathname}?${urlSearchParams}`);

		SliderHandler(urlSearchParams);
	};

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(searchParam.toString());
		SliderHandler(urlSearchParams);
	}, [searchParam]);

	return (
		<div>
			<div className={classes.range}>
				<div className={classes['range-slider']}>
					<span className={classes['range-selected']}></span>
				</div>
				<div className={classes['range-input']}>
					<input
						type="range"
						onChange={(event) => {
							const value = Math.min(+event.target.value, inputMaxPrice - 1);
							setInputMinPrice(value);
						}}
						min={minPrice}
						max={maxPrice}
						step={1}
						value={inputMinPrice}
						disabled={inputMinPrice >= inputMaxPrice}
					/>
					<input
						type="range"
						onChange={(event) => {
							const value = Math.max(+event.target.value, inputMinPrice + 1);
							setInputMaxPrice(value);
						}}
						max={maxPrice}
						min={minPrice}
						step={1}
						value={inputMaxPrice}
						disabled={inputMaxPrice <= inputMinPrice}
					/>
				</div>
			</div>
			<div className={classes.price}>
				<span>${inputMinPrice ? inputMinPrice : minPrice}</span>
				<span>-</span>
				<span>${inputMaxPrice ? inputMaxPrice : maxPrice}</span>
			</div>
			<div className={classes.btn}>
				{inputMaxPrice < maxPrice ||
				inputMinPrice > minPrice ||
				searchParam.get('minPrice') ||
				searchParam.get('maxPrice') ? (
					// <button type="button" onClick={btnClickHandel}>
					//   Find
					// </button>
					<ButtonCustom
						className={classes['btn--button-custom']}
						onClick={btnClickHandel}
						styleSettings={{
							fill: 'SOLID',
							type: 'DEFAULT',
							size: 'X_SMALL',
							color: 'DARK',
							roundness: 'SHARP',
						}}
					>
						Show products
					</ButtonCustom>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default SliderPrice;
