import { Field, Int, ObjectType } from "@nestjs/graphql";
import { SubcategoriesModel } from "../subcategories/subcategories.model";
import { MediaModel } from "src/graphql/models/media.model";

@ObjectType()
export class CategoriesModel {
	@Field(() => Int)
	id: number;
	@Field()
	title: string;
	@Field(() => [SubcategoriesModel], { nullable: true })
	Subcategories?: SubcategoriesModel[];
	@Field(() => MediaModel, { nullable: true })
	Media?: MediaModel;

	constructor(param: CategoriesModel) {
		Object.assign(this, param);
	}
}
