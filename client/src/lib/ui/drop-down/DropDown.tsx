'use client';

import React, {
	FC,
	MouseEvent,
	ReactElement,
	ReactNode,
	RefObject,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';

import DropDownItem from './DropDownItem';

import classes from './DropDown.module.scss';
import { Size, Type } from '../custom-elements/button-custom/ButtonType';
import {
	ButtonCustom,
	StyleSettingsObject,
} from '../custom-elements/button-custom/ButtonCustom';

interface TypePropertyObject {
	click: MouseEvent;
	mouseenter: MouseEvent;
}

type DropDownProps = {
	btnCustomSettings: StyleSettingsObject;
	typeProperty: keyof TypePropertyObject;
	label: ReactNode;
	children: ReactNode;
	styles?: string;
};

const DropDownComponent: FC<DropDownProps> = ({
	label,
	btnCustomSettings,
	typeProperty,
	children,
	styles,
}) => {
	const [showElements, setShowElements] = useState<boolean>(false);
	const wrapperRef = useRef() as RefObject<HTMLDivElement>;
	const childrenRef = useRef() as RefObject<HTMLDivElement>;
	const generateId = useId();

	const btnClickHandler: EventListener = (event) => {
		const target = event.target as HTMLElement;
		const wrapperRefId = wrapperRef?.current?.id.replaceAll(':', '');

		if (!target) return;

		if (childrenRef.current) {
			const childrenRefId = childrenRef.current.id;
			const currentWrapper = target.closest(`#${childrenRefId}`);

			if (currentWrapper) return;
		}

		const closestBtn = target.closest(`#${wrapperRefId}`);

		if (event.type === 'mouseenter' && closestBtn) {
			setShowElements((prev) => !prev);
		}
		if (event.type === 'mouseleave') {
			setShowElements(false);
		}

		if (event.type === 'click') {
			if (closestBtn) {
				setShowElements((prev) => !prev);
			} else {
				setShowElements((prev) => (prev ? !prev : prev));
			}
		}
	};

	useEffect(() => {
		if (typeProperty === 'mouseenter') {
			document.querySelectorAll(`#${wrapperRef.current?.id}`).forEach((val) => {
				val?.addEventListener('mouseenter', btnClickHandler);
				val?.addEventListener('mouseleave', btnClickHandler);
			});
		} else {
			document.addEventListener(typeProperty, btnClickHandler);
		}

		return () => document.removeEventListener(typeProperty, btnClickHandler);
	}, [typeProperty]);

	return (
		<div
			ref={wrapperRef}
			id={generateId.replaceAll(':', '')}
			className={`${styles ?? ''} ${classes['drop-down']}`}
		>
			<ButtonCustom
				className={
					showElements
						? classes['drop-down--open']
						: classes['drop-down--close']
				}
				styleSettings={btnCustomSettings}
			>
				{label}
			</ButtonCustom>
			{showElements && (
				<div
					id="hidden-elements"
					ref={childrenRef}
					className={classes['drop-down--list']}
				>
					{children}
				</div>
			)}
		</div>
	);
};

const DropDown = Object.assign(DropDownComponent, {
	Item: DropDownItem,
});

export default DropDown;
