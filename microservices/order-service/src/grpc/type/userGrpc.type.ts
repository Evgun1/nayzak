import { Observable } from "rxjs";

export interface GetCartAndAddressesRequest {
	addressId: number;
	cartIds: number[];
}

type CartItem = {
	productId: number;
	amount: number;
}[];

interface AddressItem {
	city: string;
	street: string;
	postalCode: number;
}

export interface GetCartAndAddressesResponse {
	carts: CartItem;
	address: AddressItem;
}

export type UserGrpc = {
	getCartsAndAddress: (
		param: GetCartAndAddressesRequest,
	) => Observable<GetCartAndAddressesResponse>;
};
