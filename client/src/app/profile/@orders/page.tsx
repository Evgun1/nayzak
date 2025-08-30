"use client";

import { TextClassList } from "@/types/textClassList.enum";
import classes from "./Orders.module.scss";
import { useAppSelector } from "@/redux/redux";
import { capitalizeAndSeparateWords } from "@/utils/capitalizeAndSeparateWords";
import Tooltip from "@/ui/tooltip/Tooltip";

const Page = () => {
	const orders = useAppSelector((selector) => selector.orders.ordersData);

	return (
		<div className={classes["orders"]}>
			{orders.length > 0 &&
				orders.map((order, i) => {
					const date = new Date(order.createdAt).toLocaleString(
						"en-us",
						{
							month: "short",
							day: "numeric",
							year: "numeric",
						},
					);

					return (
						<div
							className={classes["orders__item-wrap"]}
							key={i}
						>
							<div
								className={`${TextClassList.SEMIBOLD_18} ${classes["orders__item"]}`}
							>
								#{order.id}
							</div>
							<div
								className={`${TextClassList.REGULAR_18} ${classes["orders__item"]}`}
							>
								{date}
							</div>
							<div
								className={`${TextClassList.REGULAR_18} ${classes["orders__item"]}`}
							>
								{capitalizeAndSeparateWords(order.status)}
							</div>
							<div
								className={`${TextClassList.REGULAR_18} ${classes["orders__item"]}`}
							>
								${order.price}
							</div>
						</div>
					);
				})}
		</div>
	);
};
export default Page;
