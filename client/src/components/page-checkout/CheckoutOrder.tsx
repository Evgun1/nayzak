'use client';
import { useAppSelector } from '@/lib/redux/redux';
import classes from './CheckoutOrder.module.scss';
import useFetchProductsById from '@/hooks/useFetchProductByID';
import { appMediaOneGet } from '@/utils/http/media';
import { TextClassList } from '@/types/textClassList.enum';
import ButtonCustom from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { RefObject, useEffect, useId, useRef, useState } from 'react';
import { ButtonClassList } from '@/types/buttonClassList.enum';
import { log } from 'console';

const CheckoutOrder = () => {
	const cart = useAppSelector((state) => state.cart.productsArray);
	const products = useFetchProductsById(cart);
	const orderRef = useRef() as RefObject<HTMLDivElement>;
	const [totalPrice, setTotalPrice] = useState<number>();
	const generateId = Symbol('order-header');

	useEffect(() => {
		const prices = products.map((data) => (data.amount ?? 1) * data.mainPrice);

		if (prices.length > 0) {
			const currentTotalPrice = prices.reduce(
				(previous, current) => previous + current
			);
			setTotalPrice(currentTotalPrice);
		}
	}, [products]);

	const eventListenerHandler = (event: Event) => {
		const target = event.target as HTMLElement;
		if (!target) return;
		const wrapper = target.closest(`#${generateId.description}`);
		if (!wrapper) return;

		if (event.type === 'mouseenter') {
			wrapper.classList.add(classes['order__products-wrapper--scrollbar']);
		}
		if (event.type === 'mouseleave') {
			wrapper.classList.remove(classes['order__products-wrapper--scrollbar']);
		}
	};

	useEffect(() => {
		if (products.length >= 3) {
			document.querySelectorAll(`#${generateId.description}`).forEach((val) => {
				val?.addEventListener('mouseenter', eventListenerHandler);
				val?.addEventListener('mouseleave', eventListenerHandler);
			});

			return () => {
				document.removeEventListener('mouseenter', eventListenerHandler);
				document.removeEventListener('mouseleave', eventListenerHandler);
			};
		}
	}, [products]);

	return (
		<div className={classes['order']}>
			<input
				type="hidden"
				name="cartId"
				value={cart.map((data) => data.id).join(',')}
			/>
			<div
				className={`${ButtonClassList.BUTTON_LARGE} ${classes['order__header']}`}
			>
				Order summary
			</div>
			<div
				ref={orderRef}
				className={classes['order__products-wrapper']}
				id={generateId.description}
			>
				{products &&
					products.length > 0 &&
					products.map(({ title, description, mainPrice, amount }, i) => (
						<div key={i} className={classes['order__products']}>
							<div className={classes['order__img']}>
								<img
									className={classes['order__img-img']}
									src="https://placehold.co/652x889"
									alt=""
								/>
							</div>
							<div className={classes['order__info']}>
								<div className={classes['order__content']}>
									<div className={TextClassList.SEMIBOLD_14}>{title}</div>
									<div
										className={`${TextClassList.REGULAR_12} ${classes['order__content-desc']}`}
									>
										{description}
									</div>

									<div className={classes['order__amount']}>
										<ButtonCustom
											className={classes['order__amount-btn']}
											styleSettings={{
												type: 'TEXT',
												color: 'DARK',
												size: 'X_SMALL',
												icon: { left: 'MINUS' },
											}}
										/>
										<span className={TextClassList.SEMIBOLD_12}>{amount}</span>
										<ButtonCustom
											className={classes['order__amount-btn']}
											styleSettings={{
												type: 'TEXT',
												color: 'DARK',
												size: 'X_SMALL',
												icon: { left: 'ADD' },
											}}
										/>
									</div>
								</div>
								<div>
									<div className={TextClassList.SEMIBOLD_14}>${mainPrice}</div>
									<ButtonCustom
										styleSettings={{
											type: 'TEXT',
											color: 'DARK',
											size: 'X_SMALL',
											icon: { left: 'TRASH' },
										}}
									/>
								</div>
							</div>
						</div>
					))}
			</div>

			<div className={classes['order__fields']}>
				<div className={classes['order__fields-filed']}>
					<span className={TextClassList.SEMIBOLD_18}>Total</span>
					<span className={TextClassList.SEMIBOLD_18}>${totalPrice}</span>
				</div>
			</div>
		</div>
	);
};

export default CheckoutOrder;
