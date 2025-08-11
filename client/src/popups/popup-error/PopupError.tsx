import classes from "./PopupError.module.scss";
import { useAppDispatch } from "@/redux/redux";
import { popupActions } from "@/redux/store/popup/popup";
import { TextClassList } from "@/types/textClassList.enum";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";

export default function PopupError({ title }: { title: string }) {
	const dispatch = useAppDispatch();

	return (
		<div className={classes["error"]}>
			<h4>Error</h4>
			<div className={TextClassList.REGULAR_18}>{title}</div>
			<ButtonCustom
				styleSettings={{
					fill: "SOLID",
					color: "DARK",
					roundness: "ROUNDED",
					size: "LARGE",
					type: "DEFAULT",
				}}
				onClick={() => dispatch(popupActions.toggle(null))}
			>
				Close
			</ButtonCustom>
		</div>
	);
}
