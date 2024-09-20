import classes from "./PopupError.module.scss";
import { useAppDispatch } from "@/lib/redux/redux";
import { popupActions } from "@/lib/redux/store/popup/popup";
import { ButtonCustom } from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";
import { TextClassList } from "@/types/textClassList";

export default function PopupError({ title }: { title: string }) {
  const dispatch = useAppDispatch();

  return (
    <div className={classes["error"]}>
      <h4>Error</h4>
      <div className={TextClassList.REGULAR_18}>{title}</div>
      <ButtonCustom.SiteButton
        styleSettings={{
          color: { light: true },
          roundess: ButtonCustom.Roundness.rounded,
          size: ButtonCustom.Size.L,
          type: ButtonCustom.Type.default,
        }}
        onClick={() => dispatch(popupActions.toggle(null))}
      >
        Close
      </ButtonCustom.SiteButton>
    </div>
  );
}
