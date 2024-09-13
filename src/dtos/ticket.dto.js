import Joi from "joi";

const schemaTicket = Joi.object({
	id: Joi.alternatives().try(Joi.number().integer().positive(), Joi.string()),
	code: Joi.string().required(),
	purchase_datetime: Joi.date().required(),
	amount: Joi.number().positive().required(),
	purchaser: Joi.string().required()
}).unknown(true);

export class TicketDTO {
	constructor(value) {
		this.id = value.id;
		this.code = value.code;
		this.purchase_datetime = value.purchase_datetime;
		this.amount = value.amount;
		this.purchaser = value.purchaser;
	}

	static generate(data) {
		const { error, value } = schemaTicket.validate(data, {
			stripUnknown: true
		});
		if (error) {
			throw new Error(`TicketDTO Validation error: ${error.message}`);
		}
		return new TicketDTO(value);
	}
}
