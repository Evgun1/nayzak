"use client";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import classes from "./PopupListLink.module.scss";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { FunctionComponent, RefObject, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { popupActions } from "@/redux/store/popup/popup";

interface PopupDataListProps {
	// dataArray: Array<{ title: string; id: number }>;
	// searchParams: URLSearchParams;
	// queryParamsKey: string;
}

const PopupListLink: FunctionComponent<PopupDataListProps> = (props) => {
	const dispatch = useAppDispatch();
	const listLink = useAppSelector((state) => state.popup.listLink);
	const searchParams = useSearchParams();
	const ref = useRef() as RefObject<HTMLDivElement>;

	const closePopup = () => {
		dispatch(popupActions.toggle(null));
	};

	useEffect(() => {
		const current = ref.current;
		if (!current) return;
		// current.style.top = `${window.scrollY}px`;
	}, []);

	return (
		<div
			className={classes["popup"]}
			ref={ref}
		>
			<div className={classes["popup__header"]}>
				<DisplayIcon
					iconName={IconsIdList.LOGOTYPE}
					className={classes["popup__header-icon"]}
				/>
				<ButtonCustom
					onClick={closePopup}
					className={classes["popup__header-btn"]}
					styleSettings={{
						size: "MEDIUM",
						color: "DARK",
						icon: { left: "CLOSE" },
						type: "TEXT",
					}}
				/>
			</div>
			<div className={classes["popup__list"]}>
				{listLink.map((data, i) => (
					<LinkCustom
						key={i}
						onClick={() => dispatch(popupActions.toggle(null))}
						searchParams={searchParams}
						styleSettings={{
							color: "DARK",
							size: "MEDIUM",
							type: "UNDERLINE",
							roundness: "SHARP",
							fill: "SOLID",
						}}
						href={{
							deleteQueryParams: data.href?.deleteQueryParams
								? data.href.deleteQueryParams
								: undefined,
							// deleteQueryParams:
							// 	queryParamsKey !== deleteQuery
							// 		? deleteQuery
							// 		: undefined,

							queryParams: data.href?.queryParams
								? data.href.queryParams
								: undefined,
							// queryParams: {
							// 	[queryParamsKey]: `${data.title.toLowerCase()}-${
							// 		queryParamsKey[0]
							// 	}${data.id}`,
							// },
						}}
					>
						{data.title}
					</LinkCustom>
				))}
			</div>
		</div>
	);
};

export default PopupListLink;
