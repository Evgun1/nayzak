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
	customerId: number;
}
interface IAddressesKafkaInput {
	addressesId: number;
	customerId: number;
}
export type CartAndAddressesKafkaInput = ICartKafkaInput & IAddressesKafkaInput;
