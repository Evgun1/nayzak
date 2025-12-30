import classes from "./PopupFilterHeader.module.scss";
import { usePopupLocalContext } from "@/components/popup-local/tool/usePopupLocalContext";
import { TextClassList } from "@/types/textClassList.enum";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { FunctionComponent } from "react";

interface PopupFilterHeaderProps {}

const PopupFilterHeader: FunctionComponent<PopupFilterHeaderProps> = () => {
	const { setPopup: setTogglePopup } = usePopupLocalContext();

	return (
		<div className={classes["filter-header"]}>
			<span className={TextClassList.SEMIBOLD_22}>Filter</span>
			<ButtonCustom
				styleSettings={{
					state: ["HOVER"],
					color: "DARK",
					type: "TEXT",
					icon: { left: "CLOSE" },
					size: "LARGE",
				}}
				onClick={() => {
					setTogglePopup(null);
				}}
			/>
		</div>
	);
};

export default PopupFilterHeader;
