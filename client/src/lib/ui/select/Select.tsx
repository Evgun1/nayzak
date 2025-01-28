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
import ButtonCustom, {
	StyleSettingsObject,
} from '../custom-elements/button-custom/ButtonCustom';
import SelectOption from './SelectOption';
import classes from './Select.module.scss';
import { useSearchParams } from 'next/navigation';
import OptionLink from './OptionLink';
import { HrefObject } from '../custom-elements/link-custom/LinkCustom';
import { current } from '@reduxjs/toolkit';
import { join } from 'path';

type SelectComponentProps = {
	trackByQuery?: boolean;
	styleSetting: StyleSettingsObject;
	children: ReactNode;
	label: string | ReactNode;
};

const SelectComponent: FC<SelectComponentProps> = (props) => {
	const { styleSetting, children, label, trackByQuery = false } = props;
	const [currentChildren, setCurrentChildren] = useState<ReactNode>();
	const [optionalChildren, setOptionalChildren] = useState<ReactNode>();
	const [optionalLabel, setOptionalLabel] = useState<string | ReactNode>();
	const generateId = useId().replaceAll(':', '');
	const childrenRef = useRef() as RefObject<HTMLDivElement>;

	const searchParams = useSearchParams();

	const eventListenerHandler = (event: Event) => {
		const target = event.target as HTMLElement;
		const childrenCurrent = childrenRef.current;
		if (!target || !childrenCurrent) return;

		const childrenClassList = childrenCurrent.classList;
		const targetClassList = target.closest(`#${generateId}`)?.classList;

		if (!target.closest(`#${generateId}`)) {
			childrenClassList.remove(classes['select__options--visible']);
			return;
		}

		if (childrenClassList.contains(classes['select__options--visible'])) {
			childrenClassList.remove(classes['select__options--visible']);
		} else {
			childrenClassList.add(classes['select__options--visible']);
		}
		
	};

	const clickHandler = (event: string | undefined) => {
		if (!event) return;

		const currentChildrenArray = childrenRecursion(
			children
		) as Array<ReactNode>;
		const currentChildren = currentChildrenArray.splice(+event, 1);

		const labelByChildren = getLabelByChildrenRecursion(
			currentChildren
		)?.pop() as string;

		setOptionalLabel(labelByChildren);
		setOptionalChildren(currentChildrenArray);
	};

	const getLabelByChildrenRecursion = (children: ReactNode) => {
		return React.Children.map(children, (child): ReactNode => {
			if (!React.isValidElement(child)) return child;

			if (typeof child.props.children === 'string') {
				return child.props.children;
			} else return getLabelByChildrenRecursion(child.props.children);
		});
	};

	const childrenRecursion = (children: ReactNode, label?: string) => {
		return React.Children.map(children, (child, i): ReactNode => {
			if (!React.isValidElement(child)) return child;

			if (child.type !== OptionLink) {
				const childWithChildren = child as ReactElement<{
					children: ReactNode;
				}>;

				const reactElement = React.cloneElement(childWithChildren, {
					children: childrenRecursion(childWithChildren.props.children),
				});
				return reactElement;
			}

			if (child.type === OptionLink) {
				const childrenElement = child as ReactElement<{ href: HrefObject }>;
				const childrenQueryParams = childrenElement.props.href
					.queryParams as Record<string, string>;
				const queryParams = searchParams.toString().split('&');
				const currentQueryParam = {} as Record<string, string>;

				queryParams.forEach((data) => {
					const [key, value] = data.split('=');

					currentQueryParam[key] = value?.toLowerCase();
				});

				if (
					!Object.entries(childrenQueryParams).every(
						([key, value]) => currentQueryParam[key] === value.toLowerCase()
					)
				) {
					const childWithChildren = child as ReactElement<{
						href: HrefObject;
						id: string;
						onClick: (event: string | undefined) => void;
					}>;

					Object.keys(childWithChildren.props.href.queryParams as object).every(
						(acc) => {
							if (!Object.keys(currentQueryParam).includes(acc)) {
								setOptionalLabel(label);
							}
						}
					);

					return React.cloneElement(childWithChildren, {
						onClick: clickHandler,
					});
				}

				setOptionalLabel(child.props.children);
			} else {
				const childWithChildren = child as ReactElement<{
					id: string;
					onClick: (event: string | undefined) => void;
				}>;

				return React.cloneElement(childWithChildren, {
					id: child.key?.toString(),
					onClick: clickHandler,
				});
			}
		});
	};

	useEffect(() => {
		const childRecursion = childrenRecursion(
			children,
			label as string
		) as Array<ReactElement>;

		setCurrentChildren(childRecursion);
	}, [children]);

	useEffect(() => {
		document.addEventListener('click', eventListenerHandler);
		return () => document.removeEventListener('click', eventListenerHandler);
	}, []);

	return (
		<div id={generateId} className={classes['select']}>
			<ButtonCustom styleSettings={styleSetting}>
				{optionalLabel ?? label}
			</ButtonCustom>
			<div className={classes['select__options']} ref={childrenRef}>
				{optionalChildren ?? currentChildren}
			</div>
		</div>
	);
};

const Select = Object.assign(SelectComponent, {
	OptionLink: OptionLink,
	Option: SelectOption,
});

export default Select;
