"use client";
import { ProductItem } from "@/types/product.types";
import { useParams, usePathname } from "next/navigation";
import { createContext, FC, ReactNode, useState } from "react";

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
    const [isActive, setIsActive] = useState<boolean>(false);
    const [productsArray, setProductsArray] = useState<ProductItem[]>([]);
    const [count, setCount] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);
    const pathName = usePathname();
    const params = useParams<{ slug: string[] }>();

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
