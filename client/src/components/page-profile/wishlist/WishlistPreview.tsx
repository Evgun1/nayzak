import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import { TextClassList } from "@/types/textClassList.enum";

import classes from "./WishlistPreview.module.scss";
import { useAppDispatch } from "@/lib/redux/redux";
import { removeWishlist } from "@/lib/redux/store/wishlist/action";

type WishlistItemProps = {
    id: number;
    title: string;
    mainPrice: number;
    description: string;
};

export default function WishlistPreview({
    id,
    title,
    mainPrice,
    description,
}: WishlistItemProps) {
    const dispatch = useAppDispatch();

    const btnClickRemove = () => {
        dispatch(removeWishlist(id));
    };

    return (
        <div className={classes["wishlist-preview"]}>
            <div className={classes["wishlist-preview__info-wrap"]}>
                <div className={classes["wishlist-preview__image-wrap"]}>
                    <img
                        className={classes["wishlist-preview__image"]}
                        src='https://placehold.co/652x889'
                        alt=''
                    />
                </div>
                <div className={classes["wishlist-preview__info"]}>
                    <div className={TextClassList.SEMIBOLD_18}>{title}</div>
                    <div
                        className={`${classes["wishlist-preview__info-item"]} ${TextClassList.REGULAR_14}`}
                    >
                        {description}
                    </div>
                    <ButtonCustom
                        styleSettings={{
                            color: "DARK",
                            size: "X_SMALL",
                            type: "TEXT",
                            icon: { left: "TRASH" },
                        }}
                        className={classes["wishlist-preview__info-button"]}
                        onClick={btnClickRemove}
                    >
                        Remove
                    </ButtonCustom>
                </div>
            </div>
            <span
                className={`${TextClassList.REGULAR_18} ${classes["wishlist-preview__price"]}`}
            >
                ${mainPrice}
            </span>
        </div>
    );
}
