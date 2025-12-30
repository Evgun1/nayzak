"use client";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import { TextClassList } from "@/types/textClassList.enum";

import classes from "./Columns.module.scss";
import { FC } from "react";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import Accordion from "@/ui/accordion/Accordion";
import { Aclonica } from "next/font/google";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { useAppSelector } from "@/redux/redux";

const COLUMN_DATA = [
	{
		title: "Shop",
		item: [
			{ title: "My account" },
			{ title: "Login" },
			{ title: "Wishlist" },
			{ title: "Cart" },
		],
	},
	{
		title: "Information",
		item: [
			{ title: "Shipping Policy" },
			{ title: "Returns & Refunds" },
			{ title: "Cookies Policy" },
			{ title: "Frequently asked" },
		],
	},
	{
		title: "Company",
		item: [
			{ title: "About us" },
			{ title: "Privacy Policy" },
			{ title: "Terms & Conditions" },
			{ title: "Contact Us" },
		],
	},
];

const Columns: FC = () => {
	const responsive = useAppSelector((state) => state.responsive);

	return (
		<div className={classes["columns"]}>
			{COLUMN_DATA &&
				COLUMN_DATA.length &&
				COLUMN_DATA.map((data, index) => (
					<Accordion
						key={index}
						visibleBody={responsive.isDesktop}
					>
						{responsive.isDesktop ? (
							<div className={ButtonClassList.BUTTON_X_SMALL}>
								{data.title}
							</div>
						) : (
							<Accordion.Header
								className={`${classes[`columns__header`]} ${
									ButtonClassList.BUTTON_X_SMALL
								}  `}
							>
								<ButtonCustom
									className={classes[`columns__header-btn`]}
									styleSettings={{
										color: "DARK",
										icon: {
											right: "CHEVRON",
										},

										size: "X_SMALL",
										type: "TEXT",
										fill: "SOLID",
									}}
								>
									{data.title}
								</ButtonCustom>
							</Accordion.Header>
						)}

						<Accordion.Body className={classes[`columns__body`]}>
							{data.item &&
								data.item.length &&
								data.item.map((itemData, index) => (
									<LinkCustom
										key={index}
										href={{ endpoint: "#" }}
										styleSettings={{
											roundness: "SHARP",
											type: "TEXT",
											color: "DARK",
											size: "X_SMALL",
										}}
										className={`${
											classes[`columns__body-link`]
										} ${TextClassList.REGULAR_14}`}
									>
										{itemData.title}
									</LinkCustom>
								))}
						</Accordion.Body>
					</Accordion>
				))}
		</div>
	);
};

export default Columns;
