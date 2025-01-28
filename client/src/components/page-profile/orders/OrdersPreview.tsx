'use client';

import { OrdersItem } from '@/types/orders.types';
import { TextClassList } from '@/types/textClassList.enum';
import classes from './OrdersPreview.module.scss';
import { useAppSelector } from '@/lib/redux/redux';
import useFetchProductsById from '@/hooks/useFetchProductByID';
import { RefObject, useEffect, useId, useRef, useState } from 'react';
import ButtonCustom from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import LinkCustom from '@/lib/ui/custom-elements/link-custom/LinkCustom';
import { ProductItem } from '@/types/product.types';
import { appOneProductGet } from '@/utils/http/products';

export const OrdersPreview = (props: { order: Partial<OrdersItem> }) => {
	const { order } = props;
	const [showProduct, setShowProduct] = useState<boolean>(false);
	const [product, setProduct] = useState<ProductItem>();

	const dateObject = new Date(`${order.createdAt}`);
	const randomId = useId().replaceAll(':', '');
	const divRef = useRef() as RefObject<HTMLDivElement>;
	const tRef = useRef() as RefObject<HTMLDivElement>;

	const date = dateObject.toLocaleString('en-us', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

	const orderStatus =
		(order.status?.charAt(0).toLocaleUpperCase() as string) +
		(order.status?.slice(1) as string);

	const eventListenerHandler = (event: MouseEvent) => {
		const target = event.target as HTMLElement | undefined;
		const refTarget = divRef.current;
		if (!target || !refTarget) return;

		if (target.closest(`#${randomId}`)) {
			if (!refTarget.contains(target)) return;

			const mainContent = refTarget.parentElement;

			mainContent?.childNodes.forEach((children) => {
				const childrenElement = children as HTMLElement;

				switch (childrenElement.classList.contains(classes['open'])) {
					case false:
						childrenElement.classList.add(classes['open']);
						refTarget.style.paddingBottom = '20px';
						break;

					default:
						refTarget.style.paddingBottom = '0';
						childrenElement.classList.remove(classes['open']);
						break;
				}

				setShowProduct((prev) => !prev);
			});

			return;
		}
	};

	useEffect(() => {
		(async () => {
			if (!order.productsId) return;
			const productFetch = await appOneProductGet(order.productsId);
			setProduct(productFetch);
		})();
	}, [order]);

	useEffect(() => {
		document.addEventListener('click', eventListenerHandler);
		return () => document.removeEventListener('click', eventListenerHandler);
	}, []);

	return (
		<div className={classes['preview']} id={randomId}>
			<div className={classes['preview__info']} ref={divRef}>
				<span className={`${TextClassList.SEMIBOLD_18} `}>#{order.id}</span>
				<div className={`${TextClassList.REGULAR_18} `}>{date}</div>
				<div className={`${TextClassList.REGULAR_18} `}>{orderStatus}</div>
				<div className={`${TextClassList.REGULAR_18} `}>${order.price}</div>
				<ButtonCustom
					styleSettings={{
						color: 'DARK',
						type: 'TEXT',
						size: 'MEDIUM',
						icon: { left: 'CARET_DOWN' },
					}}
					className={classes['preview__btn']}
				/>
			</div>
			<div className={classes['preview__product-wrapper']}>
				{product && (
					<div ref={tRef} className={`${classes['preview__product']}`}>
						<div className={classes['preview__img']}>
							<img
								className={classes['preview__img-img']}
								src="https://placehold.co/400"
								alt=""
							/>
						</div>
						<LinkCustom
							styleSettings={{
								type: 'TEXT',
								color: 'DARK',
								roundness: 'PILL',
								size: 'SMALL',
							}}
							href={{
								endpoint: `product/${product.title.replaceAll(' ', '_')}`,
							}}
							className={classes['preview__product-title']}
						>
							{product?.title}
						</LinkCustom>
						<div>Amount {order.amount}</div>
						<div>${product.mainPrice}</div>
					</div>
				)}
			</div>
		</div>
	);
};
