import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CategoriesModel } from "../categories/categories.model";
import { SubcategoriesModel } from "../subcategories/subcategories.model";
import { MediaModel } from "src/graphql/models/media.model";

@ObjectType()
export class Rating {
	@Field((type) => Int)
	avg: number;
	@Field((type) => Int)
	count: number;
}

@ObjectType()
export class ProductsModel {
	@Field((type) => Int)
	id: number;
	@Field()
	title: string;
	@Field((type) => Int)
	price: number;
	@Field({ nullable: true })
	description?: string;
	@Field()
	status: string;
	@Field((type) => Int, { defaultValue: 0 })
	discount?: number;
	@Field()
	createdAt: Date;
	@Field((type) => Rating, { nullable: true })
	rating?: Rating;
	@Field(() => [MediaModel], { nullable: true })
	Media?: MediaModel[] | undefined;
	@Field((type) => CategoriesModel)
	Categories: CategoriesModel;
	@Field((type) => SubcategoriesModel)
	Subcategories: SubcategoriesModel;

	constructor(param: ProductsModel) {
		Object.assign(this, param);
	}
}

@ObjectType()
export class MinMaxPriceModel {
	@Field((type) => Int)
	minPrice: number;
	@Field((type) => Int)
	maxPrice: number;

	constructor(param: ProductsModel) {
		Object.assign(this, param);
	}
}
