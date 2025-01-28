'use client';

import classes from './CheckoutForms.module.scss';
import {
	CheckoutFormAddress,
	CheckoutFormContactInformation,
} from './CheckoutFormPreview';

const CHECKOUT_FORM_PREVIEW_ARR = [
	{ preview: () => <CheckoutFormContactInformation /> },
	{ preview: () => <CheckoutFormAddress /> },
];

const CheckoutForms = () => {
	return (
		<div className={classes.forms}>
			{CHECKOUT_FORM_PREVIEW_ARR &&
				CHECKOUT_FORM_PREVIEW_ARR.map((data, i) => <data.preview key={i} />)}
		</div>
	);
};

export default CheckoutForms;
