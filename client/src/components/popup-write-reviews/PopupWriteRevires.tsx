"use client";

import React, {
    FormEvent,
    MouseEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import Form from "../../lib/ui/form/Form";
import PopupPreview from "../elements/popup/PopupPreview";
import classes from "./PopupWriteReview.module.scss";
import DisplayIcon from "../elements/icons/displayIcon";
import IconsIdList from "../elements/icons/IconsIdList";
import "@/app/globals.scss";
import ButtonCustom from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { z, ZodObject } from "zod";
import { validation } from "@/utils/validator/validator";
import { writeCustomerAction } from "@/lib/redux/store/customer/action";
import { useParams, useRouter } from "next/navigation";
import { appOneProductGet } from "@/utils/http/products";
import { appReviewsPost } from "@/utils/http/reviews";
import { popupActions } from "@/lib/redux/store/popup/popup";
import { revalidatePath } from "next/cache";

const schema: Array<ZodObject<any>> = [];

schema.push(z.object(validation.customer));
schema.push(z.object(validation.writeReview));

const PopupWriteReview = () => {
    const btnRatingArr: React.JSX.Element[] = [];
    const customerState = useAppSelector(
        (state) => state.customer.customerData
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

    const submitHandler = async (value: {
        data: { rating: string; review: string };
    }) => {
        const data = value?.data;

        const customerFormData = new FormData();
        for (const key in data) {
            const typeKey = key as keyof typeof data;
            if (key === "firstName" || key === "lastName") {
                customerFormData.set(key, data[typeKey]);
            }
        }

        if (!customerState?.firstName || !customerState?.lastName) {
            if (Object.keys(Object.fromEntries(customerFormData)).length > 0)
                dispatch(writeCustomerAction(customerFormData));
        }

        try {
            const t = await appReviewsPost({
                rating: +data?.rating,
                text: data.review,
                customersId: parseInt(`${customerState?.id}`),
                productsId: productId as number,
            });

            dispatch(popupActions.toggle(null));
            route.refresh();
            revalidatePath("/product/");
        } catch (error) {}
    };

    useEffect(() => {
        (async () => {
            const product = await appOneProductGet(
                params.slug.toString().replaceAll("_", " ")
            );
            setProductId(product.id);
        })();
    }, [params]);

    for (let index = 1; index <= 5; index++) {
        btnRatingArr.push(
            (() => {
                const className =
                    index <= ratingMouseEvent ? "star star_active" : "star";

                return (
                    <button
                        type='button'
                        key={index}
                        className={classes["form__btn"]}
                        onClick={(e) => btnMouseEventHandler(e, index)}
                        onMouseEnter={(e) => btnMouseEventHandler(e, index)}
                        onMouseLeave={(e) => btnMouseEventHandler(e)}
                    >
                        <DisplayIcon
                            name='icon_star'
                            key={index}
                            iconName={IconsIdList.STAR}
                            className={`${classes["form__btn-ratings"]} ${className}`}
                        />
                    </button>
                );
            })()
        );
    }

    return (
        <PopupPreview title='Leave a review'>
            <Form
                className={classes.form}
                schema={schema}
                oneMessage
                submitHandler={submitHandler}
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
                        style='line'
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
                        style='line'
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
                    style='line'
                    inputSettings={{
                        placeholder: "Your review",
                        id: "review",
                        name: "review",
                        type: "text",
                    }}
                />
                <div>
                    <ButtonCustom
                        typeProperty='submit'
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
