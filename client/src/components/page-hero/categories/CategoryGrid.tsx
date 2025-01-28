import classes from './Categories.module.scss';
import Link from 'next/link';
import { appCategoriesGet } from '@/utils/http/categories';
import LinkCustom from '@/lib/ui/custom-elements/link-custom/LinkCustom';

const CategoryGrid = async () => {
	const categoriesData = await appCategoriesGet();

	// const t = new URL(window.history)

	return (
		<ul className={`container ${classes['categories--grid']}`}>
			{categoriesData &&
				categoriesData.length > 0 &&
				categoriesData.map((category, i) => (
					<li key={i}>
						<div className={classes['categories--grid-content']}>
							<img
								className={classes['grid--content-img']}
								src="https://placehold.co/400"
								alt=""
							/>

							<LinkCustom
								className={classes['grid--content-link']}
								href={{ endpoint: `/category/${category.title.toLowerCase()}` }}
								styleSettings={{
									color: 'DARK',
									roundness: 'SHARP',
									size: 'MEDIUM',
									type: 'DEFAULT',
								}}
							>
								{category.title}
							</LinkCustom>
							{/* <Link
								className={` ${classes['grid--content-link']} h7`}
								href={`/category/${category.title.toLowerCase()}`}
							>
								{category.title}
							</Link> */}
						</div>
					</li>
				))}
		</ul>
	);
};

export default CategoryGrid;
