import Header from '@/components/header/Header';
import { PageProps } from '../../../.next/types/app/layout';
import Products from '@/components/page-category/section-products/products/Products';

export default async function page(props: PageProps) {
	return (
		<>
			<section>
				<Header />
			</section>
			<section>
				<Products />
			</section>
		</>
	);
}
