"use client";
import PopupListLink from "@/popups/popup-data-list/PopupListLink";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import {
	ListLinkItem,
	ListLinkType,
	popupActions,
} from "@/redux/store/popup/popup";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { Select, SelectItem } from "@/ui/select/Select";
import { FunctionComponent, useCallback, useMemo } from "react";

interface HeaderNavProps {
	label: string;
	dataArray: Array<{ title: string; id: number }>;
	searchParams: URLSearchParams;
	href: { queryName: string; deleteQuery?: string };
}

export type DispatchSetData = {
	dataArray: Array<{ title: string; id: number }>;
	queryParamsKey: string;
	deleteQuery: string;
};

const HeaderNavButton: FunctionComponent<HeaderNavProps> = (props) => {
	const { dataArray, href, label, searchParams } = props;
	const responsive = useAppSelector((state) => state.responsive);
	const dispatch = useAppDispatch();
	const labelMemo = useMemo(() => label, [label]);

	const btnClickHandler = useCallback(() => {
		const listLinkData: ListLinkType = dataArray.map((data) => {
			return {
				title: data.title,
				href: {
					queryParams: {
						[href.queryName]: `${data.title.toLowerCase()}-${href.queryName.charAt(
							0,
						)}${data.id}`,
					},
					deleteQueryParams: href.deleteQuery,
				},
			};
		});

		dispatch(popupActions.setListLink(listLinkData));
		dispatch(popupActions.toggle(<PopupListLink />));
	}, [dispatch, dataArray, href]);

	if (responsive.isDesktop || responsive.isTablet) {
		return (
			<Select
				label={labelMemo}
				styleSetting={{
					color: "DARK",
					fill: "SOLID",
					size:
						responsive.isDesktop || responsive.isTablet
							? "X_LARGE"
							: "SMALL",
					type: "UNDERLINE",
					icon: { right: "CHEVRON" },
					roundness: "SHARP",
				}}
			>
				{dataArray &&
					dataArray.length > 0 &&
					dataArray.map((data, i) => (
						<SelectItem
							textValue={data.title}
							itemKey={`${data.title.toLowerCase()}-s${data.id}`}
							key={i}
						>
							<LinkCustom
								searchParams={searchParams}
								styleSettings={{
									color: "DARK",
									size: "X_SMALL",
									type: "TEXT",
									roundness: "SHARP",
								}}
								href={{
									deleteQueryParams: props.href.deleteQuery,
									queryParams: {
										[href.queryName]: `${data.title.toLowerCase()}-${
											href.queryName[0]
										}${data.id}`,
									},
								}}
							>
								{data.title}
							</LinkCustom>
						</SelectItem>
					))}
			</Select>
		);
	}

	return (
		<ButtonCustom
			styleSettings={{
				color: "DARK",
				fill: "SOLID",
				size:
					responsive.isDesktop || responsive.isTablet
						? "X_LARGE"
						: "SMALL",
				type: "UNDERLINE",
				icon: { right: "ARROW_RIGHT" },
				roundness: "SHARP",
			}}
			onClick={btnClickHandler}
		>
			{label}
		</ButtonCustom>
	);
};

export default HeaderNavButton;
