'use server';

import classes from './Products.module.scss';
import Toolbar from './grid/Toolbar';
import { FilterProvider } from './filter/FilterCtx';
import Sidebar from './filter/Sidebar';
import ProductsGrid from './grid/ProductsGrid';

export default async function Products({
	params,
	searchParams,
}: {
	searchParams: URLSearchParams;
	params: string;
}) {
	return (
		<FilterProvider>
			<div className={`container ${classes.wrapper}`}>
				<Sidebar />
				<ProductsGrid params={params} searchParams={searchParams} />
			</div>
		</FilterProvider>
	);
}
