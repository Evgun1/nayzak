export class ReviewsCacheDTO {
	id: string;
	fullName: string;
	rating: number;
	text: string;
	customersId: number;
	createdAt: Date;

	constructor(param: ReviewsCacheDTO) {
		for (const key in param) {
			if (!Object.keys(this).includes(key)) continue;
			this[key] = param[key];
		}
	}
}
