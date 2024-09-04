import Joi from "joi";

const schemaProduct = Joi.object({
	title: Joi.string().min(1).required(),
	description: Joi.string().min(1).required(),
	code: Joi.string().min(1).required(),
	price: Joi.number().greater(0).required(),
	stock: Joi.number().greater(0).required(),
	category: Joi.string().min(1).required(),
	status: Joi.boolean().default(true),
	thumbnails: Joi.array().items(Joi.string())
}).unknown(true);

export class ProductDTO {
	constructor(value) {
		this.title = value.title;
		this.description = value.description;
		this.code = value.code;
		this.price = value.price;
		this.stock = value.stock;
		this.category = value.category;
		this.status = value.status;
		this.thumbnails = value.thumbnails;
	}

	static generate(data) {
		const { error, value } = schemaProduct.validate(data, {
			stripUnknown: true
		});
		if (error) throw new Error(`ProductDTO Validation error: ${error.message}`);
		return new ProductDTO(value);
	}
}
