"use client";
import { useAppSelector } from "@/redux/redux";
import classes from "./CheckoutOrder.module.scss";
import useFetchProductsById, {
	ProductsById,
} from "@/hooks/useFetchProductByID";
import { TextClassList } from "@/types/textClassList.enum";
import {
	FunctionComponent,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import dynamic from "next/dynamic";

interface PageProps {}
export type ProductsState = ProductsById & {
	Media: { src: string; name: string; blurUrl: string }[];
};

const CheckoutOrderProductDynamic = dynamic(
	() => import("./order-product/CheckoutOrderProduct"),
	{ ssr: false, loading: () => <>Loading</> },
);

const Page: FunctionComponent<PageProps> = () => {
	const cart = useAppSelector((state) => state.cart.productsArray);
	const productsFetch = useFetchProductsById(cart, true);
	const orderRef = useRef() as RefObject<HTMLDivElement>;

	const generateId = Symbol("order-header");

	const eventListenerHandler = useCallback(
		(event: Event) => {
			const target = event.target as HTMLElement;
			if (!target) return;
			const wrapper = target.closest(`#${generateId.description}`);
			if (!wrapper) return;

			if (productsFetch.length > 3) {
				if (event.type === "mouseenter") {
					wrapper.classList.add(
						classes["order__products-wrapper--scrollbar"],
					);
				}
				if (event.type === "mouseleave") {
					wrapper.classList.remove(
						classes["order__products-wrapper--scrollbar"],
					);
				}
			}
		},
		[generateId.description, productsFetch],
	);

	useEffect(() => {
		if (productsFetch.length >= 3) {
			document
				.querySelectorAll(`#${generateId.description}`)
				.forEach((val) => {
					val?.addEventListener("mouseenter", eventListenerHandler);
					val?.addEventListener("mouseleave", eventListenerHandler);
				});

			return () => {
				document.removeEventListener(
					"mouseenter",
					eventListenerHandler,
				);
				document.removeEventListener(
					"mouseleave",
					eventListenerHandler,
				);
			};
		}
	}, [productsFetch, eventListenerHandler, generateId.description]);

	const total = useMemo(() => {
		const prices = productsFetch.map(
			(data) =>
				(data.amount || 1) *
				(data.price - data.price * (data.discount / 100)),
		);
		if (prices.length <= 0) return 0;
		const currentTotalPrice = Math.round(
			prices.reduce((previous, current) => previous + current),
		);
		return currentTotalPrice;
	}, [productsFetch]);

	return (
		<div className={classes["order"]}>
			<div
				className={`${ButtonClassList.BUTTON_LARGE} ${classes["order__header"]}`}
			>
				Order summary
			</div>
			<div
				ref={orderRef}
				className={classes["order__products-wrapper"]}
				id={generateId.description}
			>
				{productsFetch &&
					productsFetch.length > 0 &&
					productsFetch.map((product, i) => (
						<CheckoutOrderProductDynamic
							product={{
								...product,
								amount: product.amount || 0,
							}}
							key={i}
						/>
					))}
			</div>

			<div className={classes["order__fields"]}>
				<div className={classes["order__fields-filed"]}>
					<span className={TextClassList.SEMIBOLD_18}>Total</span>
					<span className={TextClassList.SEMIBOLD_18}>${total}</span>
				</div>
			</div>
		</div>
	);
};

export default Page;
