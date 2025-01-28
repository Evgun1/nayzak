'use client';

import { FC, ReactNode } from 'react';
import classes from './PopupPreview.module.scss';
import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { useAppDispatch } from '@/lib/redux/redux';
import { popupActions } from '@/lib/redux/store/popup/popup';

type PopupPreviewProps = {
	children: ReactNode;
	title: string;
};

const PopupPreview: FC<PopupPreviewProps> = ({ children, title }) => {
	const dispatch = useAppDispatch();

	return (
		<div className={classes['popup--preview']}>
			<div className={classes['popup--preview-header']}>
				<h4>{title}</h4>
				<ButtonCustom
					styleSettings={{
						color: 'DARK',
						type: 'SQUARE',
						fill: 'SOLID',
						roundness: 'SHARP',
						size: 'MEDIUM',
						icon: { left: 'CLOSE' },
					}}
					onClick={() => dispatch(popupActions.toggle(null))}
				/>
			</div>
			{children}
		</div>
	);
};

export default PopupPreview;
