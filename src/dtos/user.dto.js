import Joi from "joi";

const schemaUser = Joi.object({
	id: Joi.alternatives().try(Joi.number().integer().positive(), Joi.string()),
	first_name: Joi.string().min(1).required(),
	last_name: Joi.string(),
	email: Joi.string().email().required(),
	age: Joi.number().positive().allow(null),
	cart: Joi.alternatives()
		.try(Joi.number().integer().positive(), Joi.string(), Joi.object())
		.when("id", {
			is: Joi.exist(),
			then: Joi.required()
		}),
	role: Joi.string().when("id", {
		is: Joi.exist(),
		then: Joi.required()
	})
}).unknown(true);

export class UserDTO {
	constructor(value) {
		this.id = value.id;
		this.first_name = value.first_name;
		this.last_name = value.last_name;
		this.email = value.email;
		this.age = value.age;
		this.cart = value.cart;
		this.role = value.role;
	}

	static generate(data) {
		const { error, value } = schemaUser.validate(data, { stripUnknown: true });
		if (error) {
			throw new Error(`UserDTO Validation error: ${error.message}`);
		}
		return new UserDTO(value);
	}
}
