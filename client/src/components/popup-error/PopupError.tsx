import classes from './PopupError.module.scss';
import { useAppDispatch } from '@/lib/redux/redux';
import { popupActions } from '@/lib/redux/store/popup/popup';
import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { TextClassList } from '@/types/textClassList.enum';

export default function PopupError({ title }: { title: string }) {
	const dispatch = useAppDispatch();

	return (
		<div className={classes['error']}>
			<h4>Error</h4>
			<div className={TextClassList.REGULAR_18}>{title}</div>
			<ButtonCustom
				styleSettings={{
					fill: 'SOLID',
					color: 'DARK',
					roundness: 'ROUNDED',
					size: 'LARGE',
					type: 'DEFAULT',
				}}
				onClick={() => dispatch(popupActions.toggle(null))}
			>
				Close
			</ButtonCustom>
		</div>
	);
}
