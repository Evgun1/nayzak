'use client';

import { z, ZodEffects, ZodObject } from 'zod';
import Form from '../elements/form-component/FormComponent';
import classes from './PopupAddress.module.scss';
import PopupPreview from '../elements/popup/PopupPreview';
import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/redux';
import { uploadAddress } from '@/lib/redux/store/address/action';
import { AddressData } from '@/lib/redux/store/address/address';
import { CustomerItem } from '@/lib/redux/store/customer/customer';
import { AddressItem } from '@/types/addresses.types';
import { schemaName, validation } from '@/utils/validator/validator';

const schemaAddAddress: Array<ZodObject<any> | ZodEffects<any>> = [];
schemaAddAddress.push(z.object(validation.addresses));

// const schemaAddAddress = z.object({
// 	city: z.string().refine((val) => val.length >= 5, {
// 		message: 'City less than five words',
// 	}),

// 	street: z.string().refine((val) => val.length >= 5, {
// 		message: 'Street less than five words',
// 	}),

// 	postalCode: z.coerce
// 		.string()
// 		.refine(
// 			(val) => {
// 				const num = Number(val);
// 				return !isNaN(num) && num > 0;
// 			},
// 			{
// 				message: 'The value must be a positive number',
// 			}
// 		)
// 		.refine((val) => val.length >= 6, {
// 			message: 'Postal Code less than six words',
// 		}),
// });

type SubmitHandlerProps = AddressData & CustomerItem;

export default function PopupAddress({ data }: { data?: AddressData }) {
	const dispatch = useAppDispatch();
	const customer = useAppSelector((state) => state.customer.customerData);

	if (!customer?.firstName && customer?.lastName)
		schemaAddAddress.push(z.object(validation.customer));

	const submitHandler = (event: { data: SubmitHandlerProps }) => {
		dispatch(uploadAddress(data ?? event.data));
	};

	return (
		<PopupPreview title={!data ? 'Add address' : 'Edit address'}>
			<Form
				submitHandler={submitHandler}
				classe={classes['popup--address-form']}
				schema={schemaAddAddress}
			>
				<div className={classes['address--form-inputs']}>
					{!customer?.firstName && !customer?.lastName && (
						<>
							<Form.InputDefault
								style={'contained'}
								inputSettings={{
									id: 'firstName',
									name: 'firstName',
									type: 'text',
									placeholder: 'First name',
								}}
							/>
							<Form.InputDefault
								style={'contained'}
								inputSettings={{
									id: 'lastName',
									name: 'lastName',
									type: 'text',
									placeholder: 'Last name',
								}}
							/>
						</>
					)}
					<Form.InputDefault
						style={'contained'}
						inputSettings={{
							id: 'city',
							name: 'city',
							type: 'text',
							placeholder: 'City',
							defaultValue: data?.city,
						}}
					/>
					<Form.InputDefault
						style={'contained'}
						inputSettings={{
							id: 'street',
							name: 'street',
							type: 'text',
							placeholder: 'Street',
							defaultValue: data?.street,
						}}
					/>
					<Form.InputDefault
						style={'contained'}
						inputSettings={{
							id: 'postalCode',
							name: 'postalCode',
							type: 'number',
							placeholder: 'Postal code',
							maxLength: 6,
							defaultValue: data?.postalCode,
						}}
					/>
				</div>
				<ButtonCustom
					styleSettings={{
						color: 'DARK',
						fill: 'SOLID',
						roundness: 'ROUNDED',
						size: 'MEDIUM',
						type: 'DEFAULT',
					}}
					typeProperty="submit"
				>
					{!data ? 'Add' : 'Update'}
				</ButtonCustom>
			</Form>
		</PopupPreview>
	);
}
