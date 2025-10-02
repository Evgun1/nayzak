interface ICartKafkaResult {
	productsId: number;
	amount: number;
}
export type CartKafkaResult = ICartKafkaResult[];

interface ICartKafkaInput {
	cartId: number[];
	customerId: number;
}
export type CartKafkaInput = ICartKafkaInput;
