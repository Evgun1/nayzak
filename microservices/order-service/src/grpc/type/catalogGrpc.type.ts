import { Observable } from "rxjs";

export interface GetProductsRequest {
	productIds: number[];
}
export interface GetProductsResponse {
	productId: number;
	price: number;
	discount: number;
}

export type CatalogService = {
	getProducts: (data: GetProductsRequest) => Observable<GetProductsResponse[]>;
};
