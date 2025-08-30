"use server";

import React from "react";
import { PageProps } from "../../../.next/types/app/layout";
import Banner from "./banner/Banner";
import CategoryGrid from "./categories-grid/CategoryGrid";
import Trending from "./trending/Trending";
import ActionPacked from "./action-packed/ActionPacked";
import IconsBox from "./icon-box/IconsBox";
import ProductGrid from "./products-grid/ProductGrid";
import LatestArrivals from "./latest-arrivals/LatestArrivals";
import dynamic from "next/dynamic";
import LatestArrivalsSkeleton from "./latest-arrivals/skeleton/LatestArrivalsSkeleton";
import CategoryGridSkeleton from "./categories-grid/skeleton/CategoryGridSkeleton";
import ProductsGridSkeleton from "./products-grid/skeleton/ProductsGridSkeleton";

const BannerDynamic = dynamic(() => import("./banner/Banner"), {});

const LatestArrivalsDynamic = dynamic(
	() => import("./latest-arrivals/LatestArrivals"),
	{ ssr: true, loading: () => <LatestArrivalsSkeleton /> },
);
const CategoryGridDynamic = dynamic(
	() => import("./categories-grid/CategoryGrid"),
	{ ssr: true, loading: () => <CategoryGridSkeleton /> },
);
const TrendingDynamic = dynamic(() => import("./trending/Trending"), {
	ssr: true,
	loading: () => <div>Loading</div>,
});
const ActionPackedDynamic = dynamic(
	() => import("./action-packed/ActionPacked"),
	{ ssr: true, loading: () => <div>Loading</div> },
);
const IconsBoxDynamic = dynamic(() => import("./icon-box/IconsBox"), {
	ssr: true,
	loading: () => <div>Loading</div>,
});
const ProductGridDynamic = dynamic(
	() => import("./products-grid/ProductGrid"),
	{ ssr: true, loading: () => <ProductsGridSkeleton /> },
);

export default async function Home(props: PageProps) {
	return (
		<>
			<Banner />
			<LatestArrivalsDynamic />
			<CategoryGridDynamic />
			<ProductGridDynamic searchParams={props.searchParams} />
			<TrendingDynamic />
			<ActionPackedDynamic />
			<IconsBoxDynamic />
		</>
	);
}
