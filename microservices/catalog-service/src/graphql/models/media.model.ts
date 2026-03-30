import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MediaModel {
	@Field(() => String)
	src: string;
	@Field()
	alt: string;
	@Field(() => String)
	plaiceholder: string;

	constructor(param: MediaModel) {
		Object.assign(this, param);
	}
}
