import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ReviewStats {
	@Prop({ type: Number, required: true, unique: true, index: true })
	productId: number;
	@Prop({ type: Number, required: true, min: 0, max: 5 })
	avgRating: number;
	@Prop({ type: Number, required: true, min: 0 })
	ratingCount: number;
}

const ReviewStatsSchema = SchemaFactory.createForClass(ReviewStats);
ReviewStatsSchema.virtual("id").get(function () {
	return this._id;
});
ReviewStatsSchema.set("toJSON", {
	virtuals: true,
	transform: (doc, ret) => {
		ret.id = ret._id;
		delete ret._id;
	},
});

export { ReviewStatsSchema };
