import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	code: {
		type: String,
		required: true
		// :: Crear validacion para code repedido
	},
	price: {
		type: Number,
		required: true
	},
	stock: {
		type: Number,
		required: true
	},
	status: {
		type: Boolean,
		default: true
	},
	thumbnails: {
		type: Array,
		default: []
	}
});

export const productModel = mongoose.model(productCollection, productSchema);
