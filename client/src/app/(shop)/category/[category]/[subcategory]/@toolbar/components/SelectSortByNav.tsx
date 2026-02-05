"use client";

import { useCallback } from "react";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { Select, SelectItem } from "@/ui/select/Select";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { SortDataType } from "./SelectSortBy";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { ListLinkType, popupActions } from "@/redux/store/popup/popup";
import PopupListLink from "@/popups/popup-data-list/PopupListLink";

interface SelectSortByNavProps {
	label: string;
	data: SortDataType;
	searchParams: URLSearchParams;
}

const SelectSortByNav: React.FC<SelectSortByNavProps> = (props) => {
	const { data, label, searchParams } = props;

	const responsive = useAppSelector((state) => state.responsive);
	const dispatch = useAppDispatch();

	const btnClickHandler = useCallback(() => {
		const dataArray: ListLinkType = [];

		for (const element of data) {
			dataArray.push({
				title: element.title,
				href: {
					queryParams: {
						sortBy: element.valueName.sortBy,
						sort: element.valueName.sort,
					},
				},
			});
		}

		dispatch(popupActions.setListLink(dataArray));
		dispatch(popupActions.toggle(<PopupListLink />));
	}, [dispatch, data]);

	if (responsive.isDesktop || responsive.isTablet) {
		return (
			<Select
				label={label}
				styleSetting={{
					type: "TEXT",
					fill: "SOLID",
					color: "DARK",
					size: "SMALL",
					icon: { right: "CHEVRON" },
				}}
			>
				{data.map((value, index) => (
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
							searchParams={searchParams}
							href={{ queryParams: value.valueName }}
						>
							{value.title}
						</LinkCustom>
					</SelectItem>
				))}
			</Select>
		);
	}

	return (
		<ButtonCustom
			styleSettings={{
				type: "TEXT",
				fill: "SOLID",
				color: "DARK",
				size: "SMALL",
				icon: { right: "ARROW_RIGHT" },
			}}
			onClick={() => btnClickHandler()}
		>
			{label}
		</ButtonCustom>
	);
};

export default SelectSortByNav;
