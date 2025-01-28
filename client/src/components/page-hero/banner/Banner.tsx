import Image from 'next/image';
import classes from './Banner.module.scss';
import { TextClassList } from '@/types/textClassList.enum';
import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';

const Banner = () => {
	return (
		<div className={classes.banner}>
			<Image
				unoptimized
				width={0}
				height={0}
				layout="responsive"
				src="https://placehold.co/700x736"
				alt="banner"
			/>
			<div className={classes['banner--content']}>
				<span
					className={`${classes['banner--content-span']} ${TextClassList.SEMIBOLD_16}`}
				>
					New Arrivals
				</span>
				<h3 className={classes['banner--content-title']}>
					Your dream shop is a click away.
				</h3>
				<p
					className={`${classes['banner--content-paragraph']} ${TextClassList.REGULAR_18}`}
				>
					Keep your everyday style chic and on-trend with our selection 20+
					styles to choose from.
				</p>

				<ButtonCustom
					styleSettings={{
						fill: 'SOLID',
						size: 'SMALL',
						type: 'DEFAULT',
						roundness: 'SHARP',
						icon: { right: 'ARROW_RIGHT' },
						color: 'LIGHT',
					}}
				>
					See Collection
				</ButtonCustom>
			</div>
		</div>
	);
};

export default Banner;
