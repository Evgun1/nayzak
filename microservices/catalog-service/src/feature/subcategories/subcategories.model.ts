import { Field, Int, ObjectType } from "@nestjs/graphql";
import { MediaModel } from "src/graphql/models/media.model";

@ObjectType()
export class SubcategoriesModel {
	@Field((type) => Int)
	id: number;
	@Field()
	title: string;
	@Field(() => MediaModel, { nullable: true })
	Media?: MediaModel;
}
