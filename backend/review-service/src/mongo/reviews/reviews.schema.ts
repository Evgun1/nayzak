import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ReviewsDocument = HydratedDocument<Review>;
export type ReviewType = Array<Review & { id: string }>;

@Schema()
export class Review {
	@Prop({ type: Number, required: true, min: 1, max: 5 })
	rating: number;
	@Prop({ type: String, required: false })
	text: string;
	@Prop({ type: Date, default: Date.now })
	createAt?: Date;
	@Prop({ type: Date, default: Date.now })
	updateAt?: Date;
	@Prop({ type: Number })
	customersId: number;
	@Prop({ type: Number })
	productsId: number;
}

const ReviewsSchema = SchemaFactory.createForClass(Review);
ReviewsSchema.virtual("id").get(function () {
	return this._id;
});

ReviewsSchema.set("toJSON", {
	virtuals: true,
	transform: (doc, ret) => {
		ret.id = ret._id;
		delete ret._id;
	},
});
export { ReviewsSchema };
