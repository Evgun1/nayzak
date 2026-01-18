"use client";
import FilterList, {
	FilterAttributesItem,
} from "@/app/(shop)/category/[category]/[subcategory]/@filter/components/FilterList";
import classes from "./PopupFilter.module.scss";
import {
	FunctionComponent,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useParams, useSearchParams } from "next/navigation";
import { appMinMaxPriceGet } from "@/lib/api/products";
import filterAttributesHandler from "@/app/(shop)/category/[category]/[subcategory]/tools/filterAttributesHandler";
import { appAttributeBySubcategoryGet } from "@/lib/api/attribute";
import PopupFilterHeader from "./components/PopupFilterHeader";
import { usePopupLocalContext } from "@/components/popup-local/tool/usePopupLocalContext";
import dynamic from "next/dynamic";
import PopupFilterSkeleton from "./skeleton/PopupFilterSkeleton";

const PopupFilterDynamic = dynamic(() => import("./PopupFilter"), {
	ssr: false,
	loading: () => <PopupFilterSkeleton />,
});

interface PopupFilterLayoutProps {}

const PopupFilterLayout: FunctionComponent<PopupFilterLayoutProps> = () => {
	const { setToggle, setPopup } = usePopupLocalContext();

	// const [filterAttributes, setFilterAttributes] = useState<
	// 	Array<FilterAttributesItem>
	// >([]);
	// const [price, setPrice] = useState<{ minPrice: number; maxPrice: number }>({
	// 	maxPrice: 0,
	// 	minPrice: 0,
	// });
	const ref = useRef() as RefObject<HTMLDivElement>;
	// const searchParams = useSearchParams();
	// const params = useParams();

	// const searchParamsObjMemo = useMemo(() => {
	// 	const urlSearchParams = new URLSearchParams(searchParams.toString());
	// 	const obj = {} as Record<string, any>;
	// 	for (const [key, value] of urlSearchParams) {
	// 		obj[key] = value;
	// 	}
	// 	return obj;
	// }, [searchParams]);

	const closeOverlay = useCallback(() => {
		const current = ref.current;
		if (!current) return;
		const classList = current.classList;

		if (!classList.contains(classes["popup-filter--closing"])) {
			classList.toggle(classes["popup-filter--closing"]);
			setTimeout(() => {
				setPopup(null);
			}, 300);
		}
	}, [setPopup]);

	const eventListenerHandler = useCallback(
		(event: MouseEvent) => {
			const target = event.target as HTMLDListElement | null;
			if (!target) return;
			closeOverlay();
		},
		[closeOverlay],
	);

	// useEffect(() => {
	// 	const urlSearchParams = new URLSearchParams(searchParams.toString());

	// 	(async () => {
	// 		const { attribute } = await appAttributeBySubcategoryGet({
	// 			param: { slug: params.subcategory as string },
	// 			searchParams: urlSearchParams,
	// 		});

	// 		const filterAttributes = filterAttributesHandler(
	// 			attribute,
	// 			urlSearchParams,
	// 		);
	// 		const { minPrice, maxPrice } = await appMinMaxPriceGet(
	// 			urlSearchParams,
	// 			[params.category as string, params.subcategory as string],
	// 		);

	// 		setFilterAttributes(filterAttributes);
	// 		setPrice({ maxPrice, minPrice });
	// 	})();
	// }, [searchParams, params]);

	useEffect(() => {
		const current = ref.current;
		if (!current) return;

		document.addEventListener(
			"scroll",
			(event) => {
				current.style.top = `${window.scrollY}px`;
			},
			{ passive: true },
		);
	}, [ref]);

	useEffect(() => {
		setToggle("disable");
		const overlayElement = document.getElementById("overlay-inside");
		if (!overlayElement) return;
		overlayElement.addEventListener("click", eventListenerHandler);
		return () =>
			overlayElement.removeEventListener("click", eventListenerHandler);
	}, [eventListenerHandler, setToggle]);

	return (
		<div
			ref={ref}
			className={`${classes["popup-filter"]} `}
			id="popup-filter"
		>
			<PopupFilterDynamic />
			{/* <PopupFilterHeader />
			<FilterList
				attributes={filterAttributes}
				price={price}
				searchParams={searchParamsObjMemo}
			/> */}
		</div>
	);
};

export default PopupFilterLayout;
