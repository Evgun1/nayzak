import Banner from './banner/Banner';
import CategoryGrid from './categories/CategoryGrid';
import FeatureTwo from './feature-two/FeatureTwo';
import Feature from './feature/Feature';
import IconsBox from './iconsBox/IconsBox';
import ProductGrid from './products-grid/ProductGrid';
import Reviews from './reviews/Reviews';
import classes from './Hero.module.scss';
import ProductsSwiper from './products-swiper/ProductsSwiper';
import ProductsLoaderT from './products-grid/products-loader/ProductsLoaderT';

const Hero = ({ searchParams }: { searchParams: string }) => {
	const SECTIONS = [
		{
			content: (
				<section>
					<Banner />
				</section>
			),
		},
		{
			content: (
				<section className={classes.section}>
					<ProductsSwiper />
				</section>
			),
		},
		{
			content: (
				<section className={classes.section}>
					<CategoryGrid />
				</section>
			),
		},
		{
			content: (
				<section className={classes.section}>
					<ProductGrid searchParams={searchParams} />
				</section>
			),
		},
		{
			content: (
				<section className={classes.section}>
					<Feature />
				</section>
			),
		},
		{
			content: (
				<section className={classes.section}>
					<Reviews />
				</section>
			),
		},
		{
			content: (
				<section className={classes.section}>
					<FeatureTwo />
				</section>
			),
		},
		{
			content: (
				<section className={classes.section}>
					<IconsBox />
				</section>
			),
		},
	];

	return SECTIONS.map((data) => {
		return data.content;
	});
};

export default Hero;
