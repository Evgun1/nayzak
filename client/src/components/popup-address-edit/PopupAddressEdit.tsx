'use client';

import { z, ZodEffects, ZodObject } from 'zod';
import Form from '../elements/form-component/FormComponent';
import classes from './PopupAddressEdit.module.scss';
import PopupPreview from '../elements/popup/PopupPreview';
import { AddressData } from '@/lib/redux/store/address/address';
import { CustomerItem } from '@/lib/redux/store/customer/customer';
import { useAppSelector } from '@/lib/redux/redux';
import { validation } from '@/utils/validator/validator';
import { ButtonClassList } from '@/types/buttonClassList.enum';
import React, { FC } from 'react';

const schemaAddAddress: Array<ZodObject<any> | ZodEffects<any>> = [];
schemaAddAddress.push(z.object(validation.addresses));

type SubmitHandlerProps = AddressData & CustomerItem;

type PopupAddressEditProps = {
	setStateAddressId: React.Dispatch<React.SetStateAction<number>>;
	stateAddressId: number;
};

const PopupAddressEdit: FC<PopupAddressEditProps> = ({
	setStateAddressId,
	stateAddressId,
}) => {
	const currentAddresses = useAppSelector((state) => state.address.address);

	const submitHandler = (event: { data: { address: string } }) => {
		setStateAddressId(+event.data.address);
	};

	return (
		<PopupPreview title={'Edit address'}>
			<Form
				schema={[]}
				classe={classes['address-edit']}
				submitHandler={submitHandler}
			>
				{currentAddresses.map((data, i) => (
					<Form.Radio
						key={i}
						radioSettings={{
							id: data.id ?? 0,
							name: 'address',
							defaultChecked: stateAddressId,
						}}
						radioStyle={{ roundness: 'CIRCLE', size: 'SMALL' }}
					>
						<div className={classes['preview']}>
							{Object.entries(data).map(([key, val], i) => {
								if (!key.includes('customersId') && !key.includes('id')) {
									return (
										<div key={i} className={classes['preview__info']}>
											<span className={ButtonClassList.BUTTON_SMALL}>
												{key.charAt(0).toUpperCase() +
													key
														.replace(/([a-z])([A-Z])/g, '$1 $2')
														.slice(1)
														.toLocaleLowerCase()}
											</span>
											<span>{val}</span>
										</div>
									);
								}
							})}
						</div>
					</Form.Radio>
				))}
			</Form>
		</PopupPreview>
	);
};

export default PopupAddressEdit;
