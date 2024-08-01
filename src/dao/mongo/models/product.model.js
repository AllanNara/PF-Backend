import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema(
	{
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
			required: true,
			validate: {
				validator: async function (value) {
					const result = await mongoose.models.products.countDocuments({
						code: value
					});
					return !result;
				},
				message: ({ value }) => `Code '${value}' already in use`
			}
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

export const productModel = mongoose.model(productCollection, productSchema);
