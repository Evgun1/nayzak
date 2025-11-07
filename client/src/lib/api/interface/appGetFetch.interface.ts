export interface TagsItem {
	addresses: "addresses";
	brands: "brands";
	cart: "cart";
	credentials: "credentials";
	customers: "customers";
	media: "media";
	orders: "orders";
	products: "products";
	reviews: "reviews";
	subcategories: "subcategories";
	wishlists: "wishlists";
	categories: "categories";
}

export interface CacheItem {
	request?: RequestCache;
	tag?: keyof TagsItem;
	revalidate?: number | false;
}

export interface AppFetchGet {
	pathname: string;
	searchParams?: URLSearchParams | string;
	authorization?: string;
	cache?: CacheItem;
}
