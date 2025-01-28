import { FC, MouseEvent, ReactNode } from 'react';
import classes from './SelectOption.module.scss';

type SelectOptionProps = {
	children: ReactNode;
	value: string;
	id?: string;
	onClick?: (event: string | undefined) => void;
};

const SelectOption: FC<SelectOptionProps> = (props) => {
	const { children, id, onClick } = props;

	return (
		<div
			onClick={onClick ? () => onClick(id) : () => {}}
			key={id}
			className={classes['option']}
		>
			{children}
		</div>
	);
};

export default SelectOption;
