import Joi from "joi";
import { ProductDTO } from "./product.dto.js";

const schemaId = Joi.alternatives()
	.try(Joi.number().integer().positive(), Joi.string())
	.required();

export class ProductDatabaseDTO {
	constructor(id, product) {
		this.id = id;
		Object.assign(this, product);
	}

	static generate(data) {
		if (data._id) {
			data.id = data._id;
			delete data._id;
		}

		const { id, ...product } = data;
		const productDTO = ProductDTO.generate(product);

		const { error, value } = schemaId.validate(id);
		if (error) {
			throw new Error(`ProductDatabaseDTO Validation error: ${error.message}`);
		}
		return new ProductDatabaseDTO(value, productDTO);
	}
}
