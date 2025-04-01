import { FC } from 'react';
import { InputSettingsItem } from './InputType';
import { TextClassList } from '@/types/textClassList.enum';
import classes from './InputHidden.module.scss';

const InputHidden: FC<{
	error?: string[];
	inputSettings: Partial<InputSettingsItem>;
}> = (props) => {
	const { inputSettings, error } = props;

	return (
		<div className={classes['hidden']}>
			<input
				type="hidden"
				name={inputSettings.name}
				id={inputSettings.id}
				value={inputSettings.defaultValue}
			/>
			{error && error.length > 0 && (
				<div className={classes['hidden__error-contain']}>
					{error.map((val, i) => (
						<span
							key={i}
							className={`${TextClassList.REGULAR_12} ${classes['hidden__error']}`}
						>
							{val}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default InputHidden;
