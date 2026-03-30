"use client";
import { appCategoriesGet } from "@/lib/api/categories";
import { appProductsGet } from "@/lib/api/products";
import { appSubcategoriesGet } from "@/lib/api/subcategories";
import { ICategory } from "@/types/category/category.interface";
import Navbar from "@/ui/navbar/Navbar";
import {
	FunctionComponent,
	use,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

interface HeaderNavProps {}

export interface NavigationItem {
	label: string;
	url: string;
	active?: boolean;
	children?: NavigationItem[];
}

interface BuildNavDataItem {
	id: number;
	title: string;
}
type BuildNavParam = {
	data: BuildNavDataItem;
	url: string;
	active?: boolean;
};

const HeaderNav: FunctionComponent<HeaderNavProps> = () => {
	const [navigationState, setNavigationState] = useState<NavigationItem[]>(
		[],
	);

	useEffect(() => {
		async function fetchHandler() {
			const response = await fetch("/api/navigation/", {
				cache: "no-cache",
			});
			const navigation = (await response.json()) as NavigationItem[];
			setNavigationState(navigation);
		}
		fetchHandler();
	}, []);

	return (
		<nav>
			<Navbar>
				{navigationState.map((outsideItem, i) => (
					<Navbar.Content key={i}>
						<Navbar.Trigger
							href={{
								endpoint: `/category/${outsideItem.url}`,
							}}
						>
							{outsideItem.label}
						</Navbar.Trigger>

						<Navbar.Body>
							{outsideItem.children &&
								outsideItem.children.length > 0 &&
								outsideItem.children.map((insideItem, i) => (
									<Navbar.Item
										key={i}
										href={{
											endpoint: `/category/${outsideItem.url}/${insideItem.url}`,
										}}
									>
										{insideItem.label}
									</Navbar.Item>
								))}
						</Navbar.Body>
					</Navbar.Content>
				))}
			</Navbar>
		</nav>
	);
};

export default HeaderNav;
