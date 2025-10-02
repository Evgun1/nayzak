interface ICustomerKafkaResult {
	id: number;
	firstName: string;
	lastName: string;
}
export type CustomerKafkaResult = ICustomerKafkaResult[];

interface ICustomerKafkaInput {
	customersId: number[];
}
export type CustomerKafkaInput = ICustomerKafkaInput;
