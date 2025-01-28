'use client';

import { TextClassList } from '@/types/textClassList.enum';
import classes from './CartPreview.module.scss';
import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/redux/redux';
import { changeAmount, removeCart } from '@/lib/redux/store/cart/action';
import Image from 'next/image';

type CartItemProps = {
	title: string;
	description: string;
	amount?: number;
	mainPrice: number;
	productID: number;
};

export default function CartPreview({
	title,
	description,
	amount,
	mainPrice,
	productID,
}: CartItemProps) {
	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState(amount ?? 1);

	const btnPlusQuantity = () => {
		setQuantity(quantity + 1);
	};
	const btnMinusQuantity = () => {
		if (quantity !== 1) {
			setQuantity(quantity - 1);
		}
	};

	const btnRemoveProductCart = () => {
		dispatch(removeCart(productID));
	};

	useEffect(() => {
		dispatch(changeAmount({ amount: quantity, productID }));
	}, [dispatch, quantity, productID]);

	return (
		<div className={`${classes['preview']}`}>
			<div className={classes['preview__product']}>
				<Image
					unoptimized
					width={0}
					height={0}
					layout="responsive"
					className={classes['preview__product-img']}
					src="https://placehold.co/652x889"
					alt=""
				/>
				<div className={classes['preview__info']}>
					<span className={`${TextClassList.SEMIBOLD_14}`}>{title}</span>
					<span className={`${TextClassList.REGULAR_12}`}>{description}</span>
					<ButtonCustom
						styleSettings={{
							color: 'DARK',
							roundness: 'SHARP',
							type: 'TEXT',
							size: 'X_SMALL',
							icon: { left: 'TRASH' },
						}}
						onClick={btnRemoveProductCart}
					>
						Remove
					</ButtonCustom>
				</div>
			</div>
			<div className={classes['preview__amount']}>
				<ButtonCustom
					styleSettings={{
						color: 'DARK',
						roundness: 'SHARP',
						size: 'X_SMALL',
						type: 'TEXT',
						icon: { left: 'MINUS' },
					}}
					onClick={btnMinusQuantity}
					className={classes['preview__amount-btn']}
				/>
				<div className={TextClassList.SEMIBOLD_12}>{quantity}</div>
				<ButtonCustom
					styleSettings={{
						color: 'DARK',
						roundness: 'SHARP',
						size: 'X_SMALL',
						type: 'TEXT',
						icon: { left: 'ADD' },
					}}
					onClick={btnPlusQuantity}
					className={classes['preview__amount-btn']}
				/>
			</div>
			<span className={TextClassList.REGULAR_18}>${mainPrice}</span>
			<span className={TextClassList.SEMIBOLD_18}>
				${mainPrice * (amount as number)}
			</span>
		</div>
	);
}
