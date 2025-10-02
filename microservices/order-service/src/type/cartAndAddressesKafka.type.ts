interface ICartKafkaResult {
	productsId: number;
	amount: number;
}
interface IAddressesKafkaResult {
	city: string;
	street: string;
	postalCode: number;
}
export type CartAndAddressesKafkaResult = {
	cart: ICartKafkaResult[];
	addresses: IAddressesKafkaResult;
};

interface ICartKafkaInput {
	cartId: number[];
	customersId: number;
}
interface IAddressesKafkaInput {
	addressesId: number;
	customersId: number;
}
export type CartAndAddressesKafkaInput = ICartKafkaInput & IAddressesKafkaInput;
