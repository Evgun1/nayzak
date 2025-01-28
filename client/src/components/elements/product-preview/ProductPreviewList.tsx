import Link from 'next/link';
import Price from '../price/Price';
import Rating from '../rating/Rating';
import classes from './ProductPreviewList.module.scss';
import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { ButtonClassList } from '@/types/buttonClassList.enum';
import { ProductPreviewTypes } from './ProductPreview.types';
import { useAppDispatch, useAppSelector } from '@/lib/redux/redux';
import { updateCart } from '@/lib/redux/store/cart/action';
import { popupActions } from '@/lib/redux/store/popup/popup';
import PopupError from '@/components/popup-error/PopupError';
import { TextClassList } from '@/types/textClassList.enum';

const ProductPreviewList = (props: ProductPreviewTypes) => {
	const {
		href,
		reviewsArray,
		src,
		rating,
		stylePrice,
		product: { title, mainPrice, price, discount, description, id },
	} = props;

	const user = useAppSelector((state) => state.auth.credentials);
	const dispatch = useAppDispatch();

	const btnClickAddToCart = () => {
		dispatch(updateCart({ productID: id, amount: 1 }));
	};

	const btnClickErrorHandler = () => {
		dispatch(
			popupActions.toggle(<PopupError title="You need to log in to the site" />)
		);
	};

	return (
		<div className={classes['preview']}>
			<Link href={href}>
				<div className={classes['preview__img-wrapper']}>
					<img className={classes['preview__img']} src={src} alt={title} />
				</div>
			</Link>
			<div className={classes['preview__info-wrapper']}>
				<div
					className={`${ButtonClassList.BUTTON_SMALL} ${classes['preview__title']}`}
				>
					{title}
				</div>
				<Price
					style={`${classes['preview__price']} ${stylePrice}`}
					mainPrice={mainPrice}
					price={price}
					discount={discount}
					classBasePrice={TextClassList.SEMIBOLD_14}
					classOldPrice={TextClassList.REGULAR_14}
				/>
				{rating && (
					<Rating
						rating={reviewsArray.map(({ rating }) => rating)}
						customClasses={classes['preview__rating']}
					/>
				)}
				<div
					className={`${TextClassList.REGULAR_16} ${classes['preview__description']}`}
				>
					{description}
				</div>
				<div className={classes['preview__btn-wrapper']}>
					<ButtonCustom
						onClick={user ? btnClickAddToCart : btnClickErrorHandler}
						styleSettings={{
							color: 'DARK',
							roundness: 'ROUNDED',
							fill: 'SOLID',
							size: 'X_SMALL',
							type: 'DEFAULT',
						}}
					>
						Add to Cart
					</ButtonCustom>
				</div>
			</div>
		</div>
	);
};

export default ProductPreviewList;
