import { FC, MouseEvent, ReactNode } from 'react';
import classes from './SelectOption.module.scss';
import LinkCustom, {
	HrefObject,
} from '../custom-elements/link-custom/LinkCustom';
import { useSearchParams } from 'next/navigation';

type SelectOptionProps = {
	href: HrefObject;
	children: ReactNode;
	acton?: boolean;

	id?: string;
	onClick?: (event: string | undefined) => void;
};

const OptionLink: FC<SelectOptionProps> = (props) => {
	const { children, id, onClick, href, acton = true } = props;
	const searchParams = useSearchParams();
	return (
		<div
			onClick={onClick ? () => onClick(id) : () => {}}
			className={`${classes['option']} ${!acton ? classes['disable'] : ''}`}
		>
			<LinkCustom
				searchParams={searchParams}
				href={href}
				styleSettings={{
					size: 'SMALL',
					type: 'TEXT',
					color: 'DARK',
					roundness: 'SHARP',
				}}
			>
				{children}
			</LinkCustom>
		</div>
	);
};

export default OptionLink;
