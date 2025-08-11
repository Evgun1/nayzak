interface IProductsKafkaResult {
	id: number;
	price: number;
	discount: number;
}
export type ProductsKafkaResult = IProductsKafkaResult[];

interface IProductsKafkaInput {
	productsId: any[];
}
export type ProductsKafkaInput = IProductsKafkaInput;
