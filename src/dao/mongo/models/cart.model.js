import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema(
	{
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
	},
	{
		toJSON: {
			versionKey: false,
			transform: function (doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			}
		}
	}
);

cartSchema.pre("find", function (next) {
	this.populate("products.product");
	next();
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
