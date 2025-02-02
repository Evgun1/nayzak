import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { TextClassList } from '@/types/textClassList.enum';

import classes from './Wishlist.module.scss';
import { useAppDispatch } from '@/lib/redux/redux';
import { removeWishlist } from '@/lib/redux/store/wishlist/action';

type WishlistItemProps = {
	id: number;
	title: string;
	mainPrice: number;
	description: string;
};

export default function WishlistItem({
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
		<div className={classes['wishlist--content']}>
			<div className={classes['wishlist--content-product']}>
				<img
					className={classes['wishlist--product-img']}
					src="https://placehold.co/652x889"
					alt=""
				/>
				<div className={classes['wishlist--product-info']}>
					<div className={TextClassList.SEMIBOLD_18}>{title}</div>
					<div
						className={`${classes['wishlist--info-text']} ${TextClassList.REGULAR_14}`}
					>
						{description}
					</div>
					<ButtonCustom
						styleSettings={{
							color: 'DARK',
							size: 'X_SMALL',
							type: 'TEXT',
							icon: { left: 'TRASH' },
						}}
						className={classes['wishlist--info-btn']}
						onClick={btnClickRemove}
					>
						Remove
					</ButtonCustom>
				</div>
			</div>
			<span className={TextClassList.REGULAR_18}>${mainPrice}</span>
		</div>
	);
}
