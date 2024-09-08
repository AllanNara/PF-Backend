import Joi from "joi";

const schemaCart = Joi.object({
	id: Joi.alternatives().try(Joi.number().integer().positive(), Joi.string()),
	products: Joi.array()
}).unknown(true);

export class CartDTO {
	constructor(value) {
		this.id = value.id;
		this.products = value.products;
	}

	static generate(data) {
		const { error, value } = schemaCart.validate(data, {
			stripUnknown: true
		});
		if (error) {
			throw new Error(`CartDTO Validation error: ${error.message}`);
		}
		return new CartDTO(value);
	}
}
