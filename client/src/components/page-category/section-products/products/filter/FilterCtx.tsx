'use client';
import { ProductItem } from '@/types/product.types';
import { useParams, usePathname } from 'next/navigation';
import { createContext, FC, ReactNode, useState } from 'react';

type FilterContextValue = {
	isActive: boolean;
	setIsActive: (newValue: boolean) => void;
	productsArray: ProductItem[];
	setProductsArray: (newValue: ProductItem[]) => void;
	count: number;
	setCount: (newCount: number) => void;
	totalCount: number;
	setLimit: (newLimit: number) => void;
};

export const FilterContext = createContext<FilterContextValue>({
	isActive: true,
	setIsActive: (newValue) => {},
	productsArray: [],
	setProductsArray: (newValue) => {},
	count: 0,
	setCount: (newCount) => {},
	totalCount: 0,
	setLimit: (newLimit) => {},
});

export const FilterProvider: FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [limit, setLimit] = useState<number>(0);
	const [isActive, setIsActive] = useState<boolean>(true);
	const [productsArray, setProductsArray] = useState<ProductItem[]>([]);
	const [count, setCount] = useState<number>(0);
	const [totalCount, setTotalCount] = useState<number>(0);
	const pathName = usePathname();
	const params = useParams<{ slug: string[] }>();

	// const searchParams = useSearchParams();
	// const urlSearchParams = new URLSearchParams(searchParams.toString());

	// useEffect(() => {
	//   const UpdateProducts = async () => {
	//     const getListType = searchParams.get("list_type");

	//     const listTypeLimits = new Map([
	//       ["default", "15"],
	//       [null, "15"],
	//       ["five_grid", "15"],
	//       ["four_grid", "12"],
	//       ["three_grid", "9"],
	//       ["two_grid", "8"],
	//       ["list", "8"],
	//     ]);

	//     if (pathName === "/") {
	//       urlSearchParams.set("limit", "8");
	//     } else {
	//       urlSearchParams.set("limit", listTypeLimits.get(getListType) as string);
	//     }
	//     const slugs = params.slug ?? null;

	//     useFetchProductsAll({ urlSearchParams, params: slugs }).then(
	//       ({ productCounts, products }) => {
	//         setCount(products.length);
	//         setPoductsArray(products);
	//         setTotalCount(productCounts);
	//       }
	//     );
	//   };
	//   UpdateProducts();
	// }, [searchParams]);

	return (
		<FilterContext.Provider
			value={{
				isActive,
				setIsActive,
				productsArray,
				setProductsArray: setProductsArray,
				count,
				setCount,
				totalCount,
				setLimit,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};
