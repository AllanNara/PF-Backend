import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "products"
			},
			quantity: {
				type: Number,
				default: 1
			},
			_id: false
		}
	]
});

cartSchema.set("toObject", { virtuals: true });
cartSchema.set("toJSON", { virtuals: true });

export const cartModel = mongoose.model(cartCollection, cartSchema);
