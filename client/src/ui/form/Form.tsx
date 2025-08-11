"use client";

import React, {
	FormEvent,
	ReactElement,
	ReactNode,
	useCallback,
	useState,
} from "react";
import InputTextArea from "./inputs/InputTextArea";
import { ZodEffects, ZodObject, ZodRawShape } from "zod";

import InputDefault from "./inputs/InputDefault";

import classes from "./Form.module.scss";
import { InputType } from "./inputs/InputType";
import Radio from "./inputs/Radio";
import InputHidden from "./inputs/InputHidden";
import appSchemaHandler from "@/lib/validator/appSchemaHandler";
import Checkbox from "./inputs/Checkbox";
import { it } from "node:test";

export type FormOnSubmitParams = (
	data: { data: any },
	event: FormEvent<HTMLFormElement>,
) => void;

export type FormOnChangeParams = (event: FormEvent<HTMLFormElement>) => void;

type FormProps<T extends ZodRawShape> = {
	children: ReactNode;
	oneMessage?: boolean;
	schema?: Array<ZodObject<T> | ZodEffects<ZodObject<T>>>;
	onSubmit?: FormOnSubmitParams;
	onChange?: FormOnChangeParams;
	customError?: string | null;
	className?: string;
};

const Form = <T extends ZodRawShape>({
	children,
	schema = [],
	oneMessage = false,
	onSubmit,
	onChange,
	customError,
	className,
}: FormProps<T>) => {
	const [errorMessages, setErrorMessages] = useState<
		Record<string, string[]>
	>({});
	const [radioValue, setRadioValue] = useState<string>();
	const [checkbox, setCheckbox] = useState<number[]>([]);

	const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const { error, hasErrors } = appSchemaHandler({
			formData,
			schema: schema ?? [],
		});

		setErrorMessages(error);

		if (!hasErrors && onSubmit) {
			const inputElements = event.currentTarget.querySelectorAll("input");
			const object = new Object() as { [key: string]: any };
			Array.from(inputElements).map((data) => {
				const input = data as HTMLInputElement;

				const inputName = input.name;
				const inputValue = input.value;

				if (inputValue) {
					object[inputName] = inputValue;
				}

				delete object[""];
			});

			onSubmit({ data: object }, event);
		}
	};

	const onChangeHandler = (event: FormEvent<HTMLFormElement>) => {
		const target = event.target as HTMLInputElement;

		switch (target.type) {
			case "radio":
				Array.from(event.currentTarget).map((data) => {
					const input = data as HTMLInputElement;
					if (input !== target) {
						input.value = "";
						input.checked = false;
					} else {
						input.value = target.id;
						input.checked = true;
						setRadioValue(target.value);
					}
				});

				onSubmitHandler(event);
				break;

			default:
				break;
		}
		if (onChange) onChange(event);
		if (Object.keys(errorMessages).length > 0) {
			const formData = new FormData(event.currentTarget);
			const { error } = appSchemaHandler({
				formData,
				schema: schema ?? [],
			});
			setErrorMessages(error);
		}
	};

	const formRecursion = (children: ReactNode) => {
		return React.Children.map(children, (child): ReactNode => {
			if (!React.isValidElement(child)) return child;

			if (typeof child.type === "function") {
				switch (child.type) {
					case InputDefault:
					case InputTextArea:
					case InputHidden:
						const inputChild = child as ReactElement<InputType>;

						const name = inputChild.props.inputSettings?.name;
						let error: string[] | undefined;

						if (oneMessage) {
							error = errorMessages[name]
								? [errorMessages[name]?.[0]]
								: undefined;
						} else {
							error = errorMessages[name]
								? errorMessages[name]
								: undefined;
						}

						if (customError) {
							error = [customError];
						}

						return React.cloneElement(inputChild, { error });
					case Radio:
					case Checkbox:
						const inputRadioChild = child as ReactElement<{
							value: string;
							onClick: () => void;
						}>;

						return React.cloneElement(inputRadioChild, {
							value: radioValue,
						});
					default:
						const childTypeFunction = child.type as Function;
						const clonedElement = childTypeFunction(
							child.props,
						) as ReactElement<{
							children: ReactNode;
						}>;

						return React.cloneElement(clonedElement, {
							children: formRecursion(
								clonedElement.props.children,
							),
						});
				}
			} else {
				const childWithChildren = child as ReactElement<{
					children: ReactNode;
				}>;

				return React.cloneElement(childWithChildren, {
					children: formRecursion(childWithChildren.props.children),
				});
			}
		});
	};

	return (
		<form
			className={`${classes["form"]} ${className ? className : ""}`}
			onChange={onChangeHandler}
			onSubmit={onSubmitHandler}
		>
			{formRecursion(children)}
		</form>
	);
};

export default Object.assign(Form, {
	InputDefault: InputDefault,
	InputTextArea: InputTextArea,
	InputHidden: InputHidden,
	Radio: Radio,
	Checkbox: Checkbox,
	// InputPhone: InputPhone,
});
