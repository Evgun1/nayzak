"use client";

import classes from "./PopupAuth.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { loginAction, registrationAction } from "@/redux/store/auth/action";
import IconsIdList from "../../components/icons/IconsIdList";
import { popupActions } from "@/redux/store/popup/popup";
import { z, ZodEffects, ZodObject } from "zod";
import { SignIn, SignUp } from "@/redux/store/auth/auth.type";
import { validation } from "@/lib/validator/validator";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import Form from "@/ui/form/Form";
import { TextClassList } from "@/types/textClassList.enum";

const PopupAuth = () => {
	const errorMessage = useAppSelector((state) => state.auth.errorMessage);

	const dispatch = useAppDispatch();
	const [isRegister, setIsRegister] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const submitHandler = (event: { data: SignUp & SignIn }) => {
		if (isRegister) {
			dispatch(
				registrationAction({
					firstName: event.data.firstName,
					lastName: event.data.lastName,
					email: event.data.email,
					password: event.data.password,
				}),
			);
		} else {
			dispatch(
				loginAction({
					email: event.data.email,
					password: event.data.password,
				}),
			);
		}
	};

	const resSchema: Array<ZodObject<any> | ZodEffects<ZodObject<any>>> = [];

	isRegister
		? resSchema.push(z.object(validation.auth.register))
		: resSchema.push(z.object(validation.auth.login));

	return (
		<div className={classes.auth}>
			<div className={classes["auth__header"]}>
				<div className={classes["auth__title"]}>
					<h4>{isRegister ? "Sing up" : "Sing in"}</h4>
					<ButtonCustom
						className={classes["auth__title-button"]}
						styleSettings={{
							color: "DARK",
							fill: "SOLID",
							type: "TEXT",
							roundness: "SHARP",
							size: "MEDIUM",
							icon: { left: "CLOSE" },
						}}
						onClick={() => dispatch(popupActions.toggle(null))}
					/>
				</div>
				<div className={classes["auth__info"]}>
					<div className={TextClassList.REGULAR_16}>
						{isRegister ? (
							<>Already have an account?</>
						) : (
							<>Don’t have an accout yet?</>
						)}
					</div>
					<ButtonCustom
						className={TextClassList.REGULAR_16}
						styleSettings={{
							color: "DARK",
							size: "SMALL",
							type: "TEXT",
						}}
						onClick={() => setIsRegister((prev) => !prev)}
					>
						{isRegister ? "Sing in" : "Sing up"}
					</ButtonCustom>
				</div>
			</div>
			<Form
				schema={resSchema}
				oneMessage
				onSubmit={submitHandler}
				customError={errorMessage}
			>
				{isRegister && (
					<>
						<Form.InputDefault
							style="line"
							inputSettings={{
								id: "firstName",
								name: "firstName",
								type: "text",
								placeholder: "First name",
								autoComplete: "firstName",
							}}
						/>
						<Form.InputDefault
							style="line"
							inputSettings={{
								id: "lastName",
								name: "lastName",
								type: "text",
								placeholder: "Last name",
								autoComplete: "lastName",
							}}
						/>
					</>
				)}

				<Form.InputDefault
					style="line"
					inputSettings={{
						id: "email",
						name: "email",
						type: "text",
						placeholder: "Email",
						// required: true,
						autoComplete: "email",
					}}
				/>
				<Form.InputDefault
					style="line"
					inputSettings={{
						id: "password",
						name: "password",
						type: showPassword ? "text" : "password",
						placeholder: "Password",
						// required: true,
						autoComplete: "current-password",
					}}
					icon={{
						right: {
							type: "button",
							icon: IconsIdList.VIEWS,
							onClick: () => setShowPassword((prev) => !prev),
						},
					}}
				/>
				<ButtonCustom
					typeProperty="submit"
					styleSettings={{
						color: "DARK",
						fill: "SOLID",
						roundness: "ROUNDED",
						size: "LARGE",
						type: "DEFAULT",
					}}
				>
					{isRegister ? "Sing up" : "Sing in"}
				</ButtonCustom>
			</Form>
		</div>
	);
};

export default PopupAuth;
