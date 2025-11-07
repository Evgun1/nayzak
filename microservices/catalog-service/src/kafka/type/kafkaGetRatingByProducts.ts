export interface IKafkaGetRatingByProductsInput {
	ids: number[];
}

export interface IKafkaGetRatingByProductsResult {
	productId: number;
	avg: number;
	count: number;
}

export type KafkaGetRatingByProducts = {
	input: IKafkaGetRatingByProductsInput;
	result: IKafkaGetRatingByProductsResult[];
};
