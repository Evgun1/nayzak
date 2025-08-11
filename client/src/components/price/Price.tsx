import { TextClassList } from "../../types/textClassList.enum";
import classes from "./Price.module.scss";

type PriceProps = {
	price: number;
	discount: number;
	style?: string;
	classOldPrice?: TextClassList;
	classBasePrice?: TextClassList;
};

export default function Price({
	discount,
	price,
	style,
	classBasePrice,
	classOldPrice,
}: PriceProps) {
	const discountPrice = Math.floor(price - price * (discount / 100));

	return (
		<div className={`${style} ${classes.price}`}>
			{discount > 0 && (
				<div
					className={` ${
						classBasePrice
							? classBasePrice
							: TextClassList.SEMIBOLD_26
					} ${classes["price-base--price"]}`}
				>
					${discountPrice}
				</div>
			)}
			<div
				className={
					discount > 0
						? `${
								classOldPrice
									? classOldPrice
									: TextClassList.REGULAR_16
						  } ${classes["price-old--price"]}`
						: `${
								classBasePrice
									? classBasePrice
									: TextClassList.SEMIBOLD_26
						  } ${classes["price-base--price"]}`
				}
			>
				${price}
			</div>
		</div>
	);
}
