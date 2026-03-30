import { GrpcGetCartsAndAddress } from "../dto/GrpcGetCartsAndAddress.dto";

interface CartItem {
	productsId: number;
	amount: number;
}

interface AddressItem {
	city: string;
	street: string;
	postal_code: number;
}

export type GetCartsAndAddress = GrpcGetCartsAndAddress | undefined;
