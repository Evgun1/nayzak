import classes from "./ChangePassword.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import Form, { FormOnChangeParams } from "@/ui/form/Form";

import { z, ZodEffects, ZodObject } from "zod";
import { validation } from "@/lib/validator/validator";
import { changePasswordAction } from "@/redux/store/auth/action";
import { useAppDispatch } from "@/redux/redux";
import { CredentialsPasswordParam } from "@/redux/store/auth/auth.type";

const schemaConfirmPassword: Array<ZodObject<any> | ZodEffects<any>> = [];
schemaConfirmPassword.push(
	z
		.object(validation.changePassword)
		.refine((val) => val.newPassword === val.confirmPassword, {
			message: "The password does not match",
			path: ["confirmPassword"],
		}),
);

const ChangePassword = () => {
	const dispatch = useAppDispatch();

	const onSubmitHandler = (event: { data: CredentialsPasswordParam }) => {
		if (event.data.newPassword && event.data.oldPassword)
			dispatch(
				changePasswordAction({
					confirmPassword: event.data.confirmPassword,
					newPassword: event.data.newPassword,
					oldPassword: event.data.oldPassword,
				}),
			);
	};

	return (
		<div className={classes["change-password"]}>
			<Form
				onSubmit={onSubmitHandler}
				schema={schemaConfirmPassword}
				className={classes["change-password__form"]}
			>
				<div
					className={`${TextClassList.SEMIBOLD_18} ${classes["change-password__header"]}`}
				>
					Password change
				</div>
				<Form.InputDefault
					className={classes["change-password__input"]}
					label="Old password"
					inputSettings={{
						placeholder: "Old password",
						id: "oldPassword",
						name: "password",
						type: "password",
						autoComplete: "current-password",
						required: false,
					}}
					style="contained"
				/>
				<Form.InputDefault
					className={classes["change-password__input"]}
					label="New password"
					inputSettings={{
						placeholder: "New password",
						id: "newPassword",
						name: "newPassword",
						type: "password",
						autoComplete: "current-password",
						required: false,
					}}
					style="contained"
				/>
				<Form.InputDefault
					className={classes["change-password__input"]}
					label="Repeat new password"
					inputSettings={{
						placeholder: "Repeat new password",
						id: "repeatPassword",
						name: "confirmPassword",
						type: "password",
						autoComplete: "current-password",
						required: false,
					}}
					style="contained"
				/>
				<ButtonCustom
					className={classes["change-password__button"]}
					typeProperty="submit"
					styleSettings={{
						fill: "SOLID",
						color: "DARK",
						roundness: "ROUNDED",
						type: "DEFAULT",
						size: "SMALL",
					}}
				>
					Send
				</ButtonCustom>
			</Form>
		</div>
	);
};
export default ChangePassword;
