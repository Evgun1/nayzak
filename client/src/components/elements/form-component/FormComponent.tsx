'use client';

import React, { FormEvent, ReactElement, ReactNode, useState } from 'react';
import InputTextArea from './InputTextArea';
import { boolean, date, ZodEffects, ZodObject, ZodRawShape } from 'zod';

import InputDefault from './InputDefault';

import classes from './FormComponent.module.scss';
import { InputType } from './InputType';
import appObjectValidation from '../../../utils/validator/appObjectValidation';
import appEffectsValidation from '../../../utils/validator/appEffectsValidation';
import Radio from './Radio';

type FormComponentProps<T extends ZodRawShape> = {
	children: ReactNode;
	oneMessage?: boolean;
	schema?: Array<ZodObject<T> | ZodEffects<ZodObject<T>>>;
	submitHandler?: (
		data: { data: any },
		event: FormEvent<HTMLFormElement>
	) => void;
	classe?: string;
};

const FormComponent = <T extends ZodRawShape>({
	children,
	schema,
	oneMessage = false,
	submitHandler,
	classe,
}: FormComponentProps<T>) => {
	const [errorMessages, setErrorMessages] = useState<Record<string, string[]>>(
		{}
	);
	const [radioValue, setRadioValue] = useState<string>();

	const schemaHandler = ({ formData }: { formData: FormData }) => {
		const objectForm = Object.fromEntries(formData.entries());
		let hasErrors = false;

		if (schema)
			schema.forEach((schema) => {
				if (schema instanceof ZodObject) {
					const error = appObjectValidation({
						objectSchema: schema,
						object: objectForm,
					});

					if (Object.keys(error).length > 0) {
						setErrorMessages(error);
						hasErrors = true;
						return;
					}
					setErrorMessages({});
				}

				if (schema instanceof ZodEffects) {
					const error = appEffectsValidation({
						effectsSchema: schema,
						object: objectForm,
					});

					if (Object.keys(error).length > 0) {
						setErrorMessages(error);
						hasErrors = true;
						return;
					}

					setErrorMessages({});
				}
			});

		return hasErrors;
	};

	const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		// const objectForm = Object.fromEntries(formData.entries());
		// let hasErrors = false;

		// if (schema)
		// 	schema.forEach((schema) => {
		// 		if (schema instanceof ZodObject) {
		// 			const error = appObjectValidation({
		// 				objectSchema: schema,
		// 				object: objectForm,
		// 			});

		// 			if (Object.keys(error).length > 0) {
		// 				setErrorMessages(error);
		// 				hasErrors = true;
		// 				return;
		// 			}
		// 			setErrorMessages({});
		// 		}

		// 		if (schema instanceof ZodEffects) {
		// 			const error = appEffectsValidation({
		// 				effectsSchema: schema,
		// 				object: objectForm,
		// 			});

		// 			if (Object.keys(error).length > 0) {
		// 				setErrorMessages(error);
		// 				hasErrors = true;
		// 				return;
		// 			}

		// 			setErrorMessages({});
		// 		}
		// 	});

		const hasErrors = schemaHandler({ formData });

		if (!hasErrors && submitHandler) {
			const elements = event.currentTarget.elements;

			const inputTarget = event.target as HTMLInputElement;

			const object = new Object() as { [key: string]: any };
			Array.from(elements).map((data) => {
				const inputElement = data as HTMLInputElement;

				const inputName = inputElement.name;
				const inputValue = inputElement.value;

				if (inputValue) {
					object[inputName] = inputValue;
				}
				delete object[''];
			});

			submitHandler({ data: object }, event);
		}
	};

	const onChangeHandler = (event: FormEvent<HTMLFormElement>) => {
		const target = event.target as HTMLInputElement;

		if (target.type === 'radio') {
			Array.from(event.currentTarget).map((data) => {
				const input = data as HTMLInputElement;

				if (input !== target) {
					input.value = '';
					input.checked = false;
				} else {
					input.value = target.id;
					input.checked = true;
					setRadioValue(target.value);
				}
			});

			onSubmitHandler(event);
		}

		if (Object.keys(errorMessages).length > 0) {
			const formData = new FormData(event.currentTarget);

			schemaHandler({ formData });
		}
	};

	const formRecursion = (children: ReactNode) => {
		return React.Children.map(children, (child): ReactNode => {
			if (React.isValidElement(child)) {
				if (
					child.type === InputDefault ||
					child.type === InputTextArea ||
					child.type === Radio
				) {
					const inputChild = child as ReactElement<InputType>;

					const name = inputChild.props.inputSettings?.name;

					let error: string[] | undefined;

					if (oneMessage) {
						error = errorMessages[name]
							? [errorMessages[name]?.[0]]
							: undefined;
					}
					if (!oneMessage) {
						error = errorMessages[name] ? errorMessages[name] : undefined;
					}

					if (inputChild.type === Radio) {
						const inputRadioChild = child as ReactElement<{ value: string }>;
						return React.cloneElement(inputRadioChild, { value: radioValue });
					}

					return React.cloneElement(inputChild, { error });
				} else {
					const childWithChildren = child as ReactElement<{
						children: ReactNode;
					}>;

					return React.cloneElement(childWithChildren, {
						children: formRecursion(childWithChildren.props.children),
					});
				}
			}

			return child;
		});
	};

	return (
		<form
			className={`${classes['form']} ${classe ? classe : ''}`}
			onChange={onChangeHandler}
			onSubmit={onSubmitHandler}
		>
			{formRecursion(children)}
		</form>
	);
};

const Form = Object.assign(FormComponent, {
	InputDefault: InputDefault,
	InputTextArea: InputTextArea,
	Radio: Radio,
	// InputPhone: InputPhone,
});

export default Form;
