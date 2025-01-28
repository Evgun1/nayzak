'use client';

import { ChangeEvent, FC, RefObject, useEffect, useRef, useState } from 'react';
import DisplayIcon from '../icons/displayIcon';
import IconsIdList from '../icons/IconsIdList';
import classes from './InputDefault.module.scss';
import { ButtonClassList } from '@/types/buttonClassList.enum';
import { InputType } from './InputType';
import { TextClassList } from '@/types/textClassList.enum';

interface ButtonItem {
	icon?: IconsIdList;
	text?: string;
	onClick?: () => void;
	type: 'reset' | 'submit' | 'button';
}

interface ButtonObject {
	left?: ButtonItem;
	right?: ButtonItem;
}

interface InputDefaultProps extends InputType {
	style: 'line' | 'contained';
	customClasses?: string;
	buttonSettings?: ButtonObject;
	label?: string;
}

const InputDefault: FC<InputDefaultProps> = ({
	style,
	buttonSettings,
	inputSettings,
	label,
	customClasses,
	error,
}) => {
	const inputContainerRef = useRef(null) as RefObject<HTMLDivElement>;
	const inputRef = useRef() as RefObject<HTMLInputElement>;

	const [displayMessage, setDisplayMessage] = useState<any>('');

	const handleFocus = () => {
		if (!inputContainerRef.current) return;
		inputContainerRef.current.classList.add(classes['input--focus']);
	};

	const handleBlur = () => {
		if (!inputContainerRef.current) return;
		inputContainerRef.current.classList.remove(classes['input--focus']);
	};

	useEffect(() => {
		if (inputSettings.defaultValue) {
			setDisplayMessage(inputSettings.defaultValue);
		}
	}, [inputSettings.defaultValue]);

	useEffect(() => {
		if (error !== undefined) {
			inputContainerRef.current?.classList.add(classes['input--error']);
		} else {
			inputContainerRef.current?.classList.remove(classes['input--error']);
		}
	}, [error]);

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (
			inputSettings.maxLength &&
			displayMessage.length <= inputSettings.maxLength + 1
		) {
			if (value.length < inputSettings.maxLength + 1) {
				setDisplayMessage(value);
			}
		} else {
			setDisplayMessage(value);
		}
	};

	useEffect(() => {
		const timeOut = setTimeout(() => {
			if (displayMessage) {
			}
		}, 500);
		return () => clearTimeout(timeOut);
	}, [displayMessage]);

	return (
		<div
			className={`${classes['input--container']} ${
				customClasses ? customClasses : ''
			}`}
		>
			{label ? (
				<span className={TextClassList.SEMIBOLD_16}>{label}</span>
			) : (
				<></>
			)}
			<div
				ref={inputContainerRef}
				id="input-container"
				className={
					style === 'contained'
						? classes['input--container-contained']
						: classes['input--container-line']
				}
			>
				{buttonSettings?.left ? (
					<button
						type={buttonSettings?.left?.type}
						className={classes['input--container-btn']}
						onClick={buttonSettings.left.onClick}
					>
						{buttonSettings.left.icon ? (
							<DisplayIcon
								className={classes['input--btn-icon']}
								iconName={buttonSettings.left.icon}
							/>
						) : (
							<span className={ButtonClassList.BUTTON_SMALL}>
								{buttonSettings.left.text}
							</span>
						)}
					</button>
				) : (
					<></>
				)}
				<input
					ref={inputRef}
					id={inputSettings?.id}
					name={inputSettings?.name}
					className={classes['input--container-input']}
					placeholder={inputSettings?.placeholder}
					type={inputSettings?.type}
					onFocus={handleFocus}
					onBlur={handleBlur}
					required={inputSettings?.required}
					autoComplete={inputSettings.autoComplete}
					onChange={changeHandler}
					value={displayMessage}
				/>
				{buttonSettings?.right ? (
					<button
						type={buttonSettings?.right?.type}
						className={classes['input--container-btn']}
						onClick={buttonSettings.right.onClick}
					>
						{buttonSettings.right.icon ? (
							<DisplayIcon
								className={classes['input--btn-icon']}
								iconName={buttonSettings.right.icon}
							/>
						) : (
							<span className={ButtonClassList.BUTTON_SMALL}>
								{buttonSettings.right.text}
							</span>
						)}
					</button>
				) : (
					<></>
				)}
			</div>

			{error && error.length ? (
				<div className={classes['input--container-error']}>
					{error.map((val, i) => (
						<span key={i} className={TextClassList.REGULAR_12}>
							{val}
						</span>
					))}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default InputDefault;
