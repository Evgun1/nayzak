import { TextClassList } from '@/types/textClassList.enum';
import classes from './Feature.module.scss';
import LinkCustom from '@/lib/ui/custom-elements/link-custom/LinkCustom';

export default function Feature() {
	return (
		<div className={`container ${classes.wrapper} `}>
			<div className={classes.wrapper__block}>
				<div className={classes['wrapper__block-title']}>
					<span className={TextClassList.SEMIBOLD_16}>New Arrivals</span>
					<h3>Made from the finest materials</h3>
				</div>
				<p className={TextClassList.REGULAR_18}>
					Keep your everyday style chic and on-trend with our selection 20+
					styles to choose from.
				</p>

				<LinkCustom
					href={{ endpoint: '#' }}
					styleSettings={{
						roundness: 'SHARP',
						size: 'LARGE',
						type: 'TEXT',
						icon: { right: 'ARROW_RIGHT' },
						color: 'DARK',
					}}
				>
					See Collection
				</LinkCustom>
			</div>
		</div>
	);
}
