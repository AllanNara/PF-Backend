import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

mongoosePaginate.paginate.options = {
	customLabels: {
		docs: "payload",
		limit: false,
		totalDocs: false,
		pagingCounter: false
	},
	lean: true,
	leanWithId: true
};

productSchema.plugin(mongoosePaginate);
productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

export const productModel = mongoose.model(productCollection, productSchema);
