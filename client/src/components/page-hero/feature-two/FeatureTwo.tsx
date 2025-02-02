'use client';

import { TextClassList } from '@/types/textClassList.enum';
import Link from 'next/link';

import classes from './style.module.scss';
import { ButtonClassList } from '@/types/buttonClassList.enum';
import IconsIdList from '@/components/elements/icons/IconsIdList';
import DisplayIcon from '@/components/elements/icons/displayIcon';

export default function FeatureTwo() {
	return (
		<div className={`container ${classes.wrapper}`}>
			<div className={classes.wrapper__info}>
				<div className={classes[`wrapper__info-content`]}>
					<div className={classes['wrapper__info-content-text']}>
						<h4 style={{ color: 'white' }}>Action Packed</h4>
						<div
							style={{ color: 'white' }}
							className={`${TextClassList.REGULAR_18}`}
						>
							Phosfluor escently engage worldwide with web-enabled
							process-centric technology.
						</div>
					</div>
					<Link
						style={{ color: 'white' }}
						className={ButtonClassList.BUTTON_MEDIUM}
						href={''}
					>
						See collection{' '}
						<DisplayIcon
							className={classes.icon}
							iconName={IconsIdList.ARROW_RIGHT}
						/>
					</Link>
				</div>
			</div>
			<div className={classes.wrapper__video}></div>
		</div>
	);
}
