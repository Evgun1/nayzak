"use client";
import classes from "../../style.module.scss";
import { appAttributeBySubcategoryGet } from "@/lib/api/attribute";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
	ChangeEvent,
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useDebugValue,
	useDeferredValue,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { FilterAttributesState } from "../../@filter/components/FilterList";
import filterAttributesHandler from "../filterAttributesHandler";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { PopupLocalProvider } from "@/components/popup-local/tool/usePopupLocalContext";

type TFilterChips = {
	name: string;
	value: Array<{ type: string; id: number }>;
};

type SidebarContextItem = {
	showFilter: boolean;
	setShowFilter: Dispatch<SetStateAction<boolean>>;
	attributeCount: number;
	setFilterChips: (param: TFilterChips) => void;
	filterChips: TFilterChips[];
	fetchAttributes: (
		searchParams: URLSearchParams,
	) => Promise<
		| { attribute: FilterAttributesState; countActiveAttributes: number }
		| undefined
	>;
	onChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FilterContext = createContext<SidebarContextItem | null | undefined>(
	null,
);

export const FilterProvider: FC<{
	children: ReactNode;
	filter?: ReactNode;
	searchParams: Record<string, string>;
}> = ({ children, filter }) => {
	const dispatch = useAppDispatch();
	const searchParam = useSearchParams();
	const responsive = useAppSelector((state) => state.responsive);
	const params = useParams() as { category: string; subcategory: string };
	const route = useRouter();
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const [showFilter, setShowFilter] = useState<boolean>(false);
	const [attributeCount, setAttributeCount] = useState<number>(NaN);
	const [filterChipsState, setFilterChipsState] = useState<TFilterChips[]>(
		[],
	);
	const [query, setQuery] = useState(searchParam.toString());

	const urlSearchParamsMemo = useMemo(() => {
		const urlSearchParams = new URLSearchParams(searchParam.toString());
		return urlSearchParams;
	}, [searchParam]);

	const appAttributeBySubcategoryHandler = useCallback(
		async (searchParams?: URLSearchParams) => {
			const attributes = await appAttributeBySubcategoryGet({
				param: { slug: params.subcategory },
				searchParams,
			});
			return attributes;
		},
		[params.subcategory],
	);

	const fetchAttributesHandler = useCallback(
		async (searchParams: URLSearchParams) => {
			const attributes = await appAttributeBySubcategoryHandler(
				searchParams,
			);
			if (!attributes) return;

			const filterAttributes = filterAttributesHandler(
				attributes.attribute,
				searchParam,
			);

			setAttributeCount(attributes.countActiveAttributes);

			return {
				attribute: filterAttributes,
				countActiveAttributes: attributes.countActiveAttributes,
			};
		},
		[appAttributeBySubcategoryHandler, searchParam],
	);

	const setFilterChips = (param: TFilterChips) => {
		setFilterChipsState((prev) => {
			const { name, value: newValues } = param;

			const index = prev.findIndex((item) => item.name === name);

			if (index !== -1) {
				const updated = [...prev];
				const existingValues = updated[index].value;

				const syncedValues = existingValues
					.filter((ev) => newValues.some((nv) => nv.id === ev.id))
					.concat(
						newValues.filter(
							(nv) =>
								!existingValues.some((ev) => ev.id === nv.id),
						),
					);

				updated[index] = {
					...updated[index],
					value: syncedValues,
				};

				return updated;
			} else {
				return [...prev, { name, value: newValues }];
			}
		});
	};

	const onChangeCheckbox = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (responsive.isDesktop || responsive.isTablet) return;

			const name = event.target.name;
			const id = event.target.id;
			const checked = event.target.checked;

			if (!checked) {
				const ids = urlSearchParamsMemo.get(name)?.split(",");
				if (!ids) return;
				ids.splice(ids.indexOf(id), 1);

				if (ids.length <= 0) {
					urlSearchParamsMemo.delete(name);
				} else {
					urlSearchParamsMemo.set(name, ids.join(","));
				}
			} else {
				if (urlSearchParamsMemo.has(name)) {
					const ids = urlSearchParamsMemo.get(name)?.split(",");
					if (!ids) return;
					ids.push(id);
					urlSearchParamsMemo.set(name, ids.join(","));
				} else {
					urlSearchParamsMemo.append(name, id);
				}
			}
			setQuery(urlSearchParamsMemo.toString());
		},

		[urlSearchParamsMemo, responsive],
	);
    
	useEffect(() => {
		if (!responsive.isMobile) return;
		if (showFilter) {
			// dispatch(popupActions.toggle(<PopupFilter />));
			setShowFilter((prev) => !prev);
		}
	}, [showFilter, responsive, dispatch]);

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			route.push(`?${query}`);
		}, 500);
	}, [query]);
	
	return (
		<FilterContext.Provider
			value={{
				onChangeCheckbox,
				filterChips: filterChipsState,
				setFilterChips,
				showFilter,
				setShowFilter,
				// fetchAttributesCount: fetchAttributesCountHandler,
				attributeCount,
				fetchAttributes: fetchAttributesHandler,
			}}
		>
			<PopupLocalProvider>
				<div className={classes["products"]}>
					{responsive.isDesktop && showFilter && filter}
					{children}
				</div>
			</PopupLocalProvider>
		</FilterContext.Provider>
	);
};

export const useFilterContext = () => {
	const context = useContext(FilterContext);
	if (!context) {
		throw new Error("useFilter must be used within a FilterProvider");
	}
	return context;
};
