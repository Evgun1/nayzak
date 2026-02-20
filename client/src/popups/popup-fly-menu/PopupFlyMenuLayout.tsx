"use client";

import { useAppDispatch } from "@/redux/redux";
import classes from "./PopupFlyMenuLayout.module.scss";
import React, {
	FunctionComponent,
	RefObject,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { popupActions } from "@/redux/store/popup/popup";
import { usePopupContext } from "@/components/popup/context/usePopupContext";
import { SearchProvider, useSearchContext } from "./context/useSearchContext";
import PopupFlyMenu from "./PopupFlyMenu";
import DisplayIcon from "@/components/icons/displayIcon";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import IconsIdList from "@/components/icons/IconsIdList";

interface PopupFlyMenuProps {}

const PopupFlyMenuLayout: FunctionComponent<PopupFlyMenuProps> = () => {
	// const popup = useAppSelector((selector) => selector.popup.popupContent);
	const dispatch = useAppDispatch();
	const { setToggle } = usePopupContext();
	const ref = useRef() as RefObject<HTMLDivElement>;

	const closeOverlay = useCallback(() => {
		const current = ref.current;
		if (!current) return;
		const classList = current.classList;

		if (!classList.contains(classes["popup-menu-layout--closing"])) {
			classList.toggle(classes["popup-menu-layout--closing"]);
			setTimeout(() => {
				dispatch(popupActions.toggle(null));
			}, 300);
		}
	}, [dispatch]);

	const eventListenerHandler = useCallback(
		(event: MouseEvent) => {
			const target = event.target as HTMLDListElement | null;
			if (!target) return;
			closeOverlay();
		},
		[closeOverlay],
	);

	useEffect(() => {
		setToggle("disable");
		const overlayElement = document.getElementById("overlay-inside");
		if (!overlayElement) return;
		overlayElement.addEventListener("click", eventListenerHandler);
		return () =>
			overlayElement.removeEventListener("click", eventListenerHandler);
	}, [eventListenerHandler, setToggle]);

	return (
		<SearchProvider>
			<div
				id="popup-menu-layout"
				ref={ref}
				className={`${classes["popup-menu-layout"]}`}
			>
				<div className={classes["popup-menu-layout__header"]}>
					<DisplayIcon
						className={classes["popup-menu-layout__header-icon"]}
						iconName={IconsIdList.LOGOTYPE}
					/>
					<ButtonCustom
						onClick={() => closeOverlay()}
						className={classes["popup-menu-layout__header-button"]}
						styleSettings={{
							size: "MEDIUM",
							color: "DARK",
							fill: "OUTLINE",
							icon: { left: "CLOSE" },
							type: "TEXT",
						}}
					/>
				</div>

				<PopupFlyMenu />
			</div>
		</SearchProvider>
	);
};

export default PopupFlyMenuLayout;
