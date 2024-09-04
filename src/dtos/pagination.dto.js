import Joi from "joi";

const schemaPagination = Joi.object({
	payload: Joi.array().required(),
	totalPages: Joi.number().positive().required(),
	page: Joi.number().positive().required(),
	hasPrevPage: Joi.boolean().required(),
	hasNextPage: Joi.boolean().required(),
	prevPage: Joi.number().allow(null).required(),
	nextPage: Joi.number().allow(null).required(),
	prevLink: Joi.string().allow(null).required(),
	nextLink: Joi.string().allow(null).required()
}).unknown(true);

export class PaginationDTO {
	constructor(value) {
		this.payload = value.payload;
		this.totalPages = value.totalPages;
		this.page = value.page;
		this.hasPrevPage = value.hasPrevPage;
		this.hasNextPage = value.hasNextPage;
		this.prevPage = value.prevPage;
		this.nextPage = value.nextPage;
		this.prevLink = value.prevLink;
		this.nextLink = value.nextLink;
	}

	static generate(data) {
		const { error, value } = schemaPagination.validate(data, {
			stripUnknown: true
		});
		if (error) {
			throw new Error(`PaginationDTO Validation error: ${error.message}`);
		}
		return new PaginationDTO(value);
	}
}
