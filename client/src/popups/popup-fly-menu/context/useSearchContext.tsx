import { appProductsGet } from "@/lib/api/products";
import { ProductBase } from "@/types/product/productBase";
import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
	setSearchParams: (query: URLSearchParams | undefined) => void;
	searchParams?: URLSearchParams;
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
	const [searchParams, setSearchParams] = useState<
		URLSearchParams | undefined
	>();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<SearchContext.Provider
			value={{
				searchParams,
				setSearchParams,
				isOpen,
				setIsOpen,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error("useSearchContext must be used within SearchProvider");
	}
	return context;
};
