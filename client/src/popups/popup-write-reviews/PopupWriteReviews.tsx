"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import PopupPreview from "../../components/popup/PopupPreview";
import classes from "./PopupWriteReview.module.scss";
import DisplayIcon from "../../components/icons/displayIcon";
import IconsIdList from "../../components/icons/IconsIdList";
import "@/app/styles/globals.scss";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { z, ZodObject } from "zod";
import { writeCustomerAction } from "@/redux/store/customer/action";
import { useParams, useRouter } from "next/navigation";
import { appOneProductGet } from "@/lib/api/products";
import { appReviewsPost } from "@/lib/api/reviews";
import { popupActions } from "@/redux/store/popup/popup";
import { revalidatePath } from "next/cache";
import { validation } from "@/lib/validator/validator";
import Form, { FormOnSubmitParams } from "@/ui/form/Form";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { appCookieGet } from "@/lib/api/cookie";

const schema: Array<ZodObject<any>> = [];

schema.push(z.object(validation.customer));
schema.push(z.object(validation.writeReview));

const PopupWriteReview = () => {
	const btnRatingArr: React.JSX.Element[] = [];
	const customerState = useAppSelector(
		(state) => state.customer.customerData,
	);
	const dispatch = useAppDispatch();
	const params = useParams();

	const route = useRouter();

	const [ratingMouseEvent, setRatingMouseEvent] = useState<number>(0);
	const [rating, setRating] = useState<number>(0);
	const [productId, setProductId] = useState<number>();
	const btnMouseEventHandler = (e: MouseEvent, i?: number) => {
		if (e.type === "click" && i) {
			setRating(i);
		}
		if (e.type === "mouseenter" && i) {
			setRatingMouseEvent(i);
		}
		if (e.type === "mouseleave") {
			setRatingMouseEvent(rating);
		}
	};

	const submitHandler: FormOnSubmitParams = async (value: {
		data: {
			rating: number;
			review: string;
			firstName: string;
			lastName: string;
		};
	}) => {
		const { firstName, lastName, rating, review } = value?.data;

		if (!customerState?.firstName || !customerState?.lastName) {
			dispatch(writeCustomerAction({ firstName, lastName, phone: 0 }));
		}

		try {
			const token = await appCookieGet("user-token");
			if (!token) return;
			await appReviewsPost(
				{
					rating: rating,
					text: review,
					customersId: parseInt(`${customerState?.id}`),
					productsId: productId as number,
				},
				token,
			);

			dispatch(popupActions.toggle(null));
			route.refresh();
			revalidatePath("/product/");
		} catch (error) {}
	};

	useEffect(() => {
		(async () => {
			if (params) {
				const product = await appOneProductGet({
					slug: params.slug.toString().replaceAll("_", " "),
				});
				setProductId(product.id);
			}
		})();
	}, [params]);

	for (let index = 1; index <= 5; index++) {
		btnRatingArr.push(
			(() => {
				const className =
					index <= ratingMouseEvent ? "star star_active" : "star";

				return (
					<button
						type="button"
						key={index}
						className={classes["form__btn"]}
						onClick={(e) => btnMouseEventHandler(e, index)}
						onMouseEnter={(e) => btnMouseEventHandler(e, index)}
						onMouseLeave={(e) => btnMouseEventHandler(e)}
					>
						<DisplayIcon
							name="icon_star"
							key={index}
							iconName={IconsIdList.STAR}
							className={`${classes["form__btn-ratings"]} ${className}`}
						/>
					</button>
				);
			})(),
		);
	}

	return (
		<PopupPreview title="Leave a review">
			<Form
				className={classes.form}
				schema={schema}
				oneMessage
				onSubmit={submitHandler}
			>
				<div>
					<div className={classes["form__rating-wrapper"]}>
						<span>You rating *</span>
						<div className={classes["form__btn-wrapper"]}>
							{btnRatingArr}
						</div>
					</div>
					<Form.InputHidden
						inputSettings={{
							name: "rating",
							defaultValue: rating,
						}}
					/>
				</div>
				<div className={classes["form__input-wrapper"]}>
					<Form.InputDefault
						style="line"
						inputSettings={{
							disabled: customerState?.firstName !== "" && true,
							placeholder: "First name",
							id: "firstName",
							name: "firstName",
							type: "text",
							defaultValue: customerState?.firstName,
						}}
					/>
					<Form.InputDefault
						style="line"
						inputSettings={{
							disabled: customerState?.lastName !== "" && true,
							placeholder: "Last name",
							id: "lastName",
							name: "lastName",
							type: "text",
							defaultValue: customerState?.lastName,
						}}
					/>
				</div>
				<Form.InputTextArea
					style="line"
					inputSettings={{
						placeholder: "Your review",
						id: "review",
						name: "review",
						type: "text",
					}}
				/>
				<div>
					<ButtonCustom
						typeProperty="submit"
						styleSettings={{
							type: "DEFAULT",
							fill: "SOLID",
							color: "DARK",
							size: "MEDIUM",
							roundness: "ROUNDED",
						}}
					>
						Submit review
					</ButtonCustom>
				</div>
			</Form>
		</PopupPreview>
	);
};

export default PopupWriteReview;
