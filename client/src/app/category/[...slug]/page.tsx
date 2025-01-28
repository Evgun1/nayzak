import HeaderProducts from '@/components/page-category/section-products/header-productsct/HeaderProducts';
import Products from '@/components/page-category/section-products/products/Products';
import HeaderSubcategory from '@/components/page-category/section-subcategory/header-subcategory/HeaderSubcategory';
import PopupLoading from '@/components/popup-loading/PopupLoading';
import dynamic from 'next/dynamic';

interface paramsData {
	slug: string[];
}

type pageProps = {
	params: paramsData;
};

const DynamicSubCategories = dynamic(
	() =>
		import(
			'@/components/page-category/section-subcategory/subcategories/Subcategories'
		),
	{ loading: () => <PopupLoading />, ssr: true }
);

const DynamicProducts = dynamic(
	() => import(`@/components/page-category/section-products/products/Products`),
	{ loading: () => <PopupLoading />, ssr: true }
);

export default async function page(props: pageProps) {
	if (props.params.slug.length === 1) {
		return (
			<section>
				<HeaderSubcategory
					title={
						props.params.slug[0][0].toUpperCase() +
						props.params.slug[0].slice(1)
					}
				/>
				<DynamicSubCategories slug={props.params.slug[0]} />
			</section>
		);
	}
	return (
		<section>
			<HeaderProducts slug={props.params.slug} />

			<DynamicProducts />
		</section>
	);
}
