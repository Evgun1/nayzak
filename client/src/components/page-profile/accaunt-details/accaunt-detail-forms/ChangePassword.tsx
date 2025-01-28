'use client';

import Form from '@/components/elements/form-component/FormComponent';
import { useAppDispatch } from '@/lib/redux/redux';
import { changePasswordAction } from '@/lib/redux/store/auth/action';
import { TextClassList } from '@/types/textClassList.enum';
import { schemePassword, validation } from '@/utils/validator/validator';
import { FormEvent } from 'react';
import { z, ZodEffects, ZodObject } from 'zod';

import classes from './ChangePassword.module.scss';
import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { CredentialsPasswordDTO } from '@/lib/redux/store/auth/credentials.type';

const schemaConfirmPassword: Array<ZodObject<any> | ZodEffects<any>> = [];
schemaConfirmPassword.push(
	z
		.object(validation.changePassword)
		.refine((val) => val.newPassword === val.confirmPassword, {
			message: 'The password does not match',
			path: ['confirmPassword'],
		})
);

const ChangePassword = () => {
	const dispatch = useAppDispatch();

	const changePasswordHandler = (event: { data: CredentialsPasswordDTO }) => {
		if (event.data.newPassword && event.data.oldPassword)
			dispatch(
				changePasswordAction({
					newPassword: event.data.newPassword,
					oldPassword: event.data.oldPassword,
				})
			);
	};

	return (
		<Form schema={schemaConfirmPassword} submitHandler={changePasswordHandler}>
			<div className={`${TextClassList.SEMIBOLD_18} ${classes['']}`}>
				Password change
			</div>
			<div className={classes['changePassword--inputs']}>
				<Form.InputDefault
					label="Old password"
					inputSettings={{
						placeholder: 'Old password',
						id: 'oldPassword',
						name: 'password',
						type: 'password',
						autoComplete: 'current-password',
						required: true,
					}}
					style="contained"
				/>
				<Form.InputDefault
					label="New password"
					inputSettings={{
						placeholder: 'New password',
						id: 'newPassword',
						name: 'newPassword',
						type: 'password',
						autoComplete: 'current-password',
						required: true,
					}}
					style="contained"
				/>
				<Form.InputDefault
					label="Repeat new password"
					inputSettings={{
						placeholder: 'Repeat new password',
						id: 'repearPassword',
						name: 'confirmPassword',
						type: 'password',
						autoComplete: 'current-password',
						required: true,
					}}
					style="contained"
				/>
			</div>
			<ButtonCustom
				typeProperty="submit"
				styleSettings={{
					fill: 'SOLID',
					color: 'DARK',
					roundness: 'ROUNDED',
					type: 'DEFAULT',
					size: 'SMALL',
				}}
			>
				Send
			</ButtonCustom>
		</Form>
	);
};

export default ChangePassword;
