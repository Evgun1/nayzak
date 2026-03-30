import { Observable } from "rxjs";

export interface IMedia {
	id: number;
	src: Buffer;
	alt: string;
	plaiceholder: Buffer;
}

export type GetCustomersMediaAllRequest = {
	customerIds: number[];
};
export type GetCustomersMediaAllResponse = {
	customers: GetCustomersMediaOneResponse[];
};
export type GetCustomersMediaOneRequest = {
	customerId: number;
};
export type GetCustomersMediaOneResponse =
	| {
			customerId: number;
			media: IMedia;
	  }
	| undefined;

export type GetProductsMediaAllRequest = {
	productIds: number[];
};
export type GetProductsMediaAllResponse = {
	products: GetProductsMediaOneResponse[];
};
export type GetProductsMediaOneRequest = {
	productId: number;
};
export type GetProductsMediaOneResponse =
	| {
			productId: number;
			media: IMedia[];
	  }
	| undefined;

export type GetSubcategoriesMediaAllRequest = {
	subcategoryIds: number[];
};
export type GetSubcategoriesMediaAllResponse = {
	subcategories: GetSubcategoriesMediaOneResponse[];
};
export type GetSubcategoriesMediaOneRequest = {
	subcategoryId: number;
};
export type GetSubcategoriesMediaOneResponse =
	| {
			subcategoryId: number;
			media: IMedia;
	  }
	| undefined;

export type GetCategoriesMediaAllRequest = {
	categoryIds: number[];
};
export type GetCategoriesMediaAllResponse = {
	categories: GetCategoriesMediaOneResponse[];
};
export type GetCategoriesMediaOneRequest = {
	categoryId: number;
};
export type GetCategoriesMediaOneResponse =
	| {
			categoryId: number;
			media: IMedia;
	  }
	| undefined;

export type MediaGrpc = {
	getCategoriesMediaAll: (
		data: GetCategoriesMediaAllRequest,
	) => Observable<GetCategoriesMediaAllResponse>;
	getCategoriesMediaOne: (
		data: GetCategoriesMediaOneRequest,
	) => Observable<GetCategoriesMediaOneResponse>;

	getSubcategoriesMediaAll: (
		data: GetSubcategoriesMediaAllRequest,
	) => Observable<GetSubcategoriesMediaAllResponse>;
	getSubcategoriesMediaOne: (
		data: GetSubcategoriesMediaOneRequest,
	) => Observable<GetSubcategoriesMediaOneResponse>;

	getProductsMediaAll: (
		data: GetProductsMediaAllRequest,
	) => Observable<GetProductsMediaAllResponse>;
	getProductsMediaOne: (
		data: GetProductsMediaOneRequest,
	) => Observable<GetProductsMediaOneResponse>;

	getCustomersMediaAll: (
		data: GetCustomersMediaAllRequest,
	) => Observable<GetCustomersMediaAllResponse>;
	getCustomersMediaOne: (
		data: GetCustomersMediaOneRequest,
	) => Observable<GetCustomersMediaOneResponse>;
};
