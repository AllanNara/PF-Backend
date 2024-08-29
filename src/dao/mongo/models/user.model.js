import { createHash, isValidPassword } from "../../../utils/bcrypt.js";
import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema(
	{
		first_name: {
			type: String,
			required: true
		},
		last_name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			validate: [
				{
					validator: emailFormatValidator,
					message: ({ value }) => `Invalid format email: ${value}`
				},
				{
					validator: (v) => duplicateValidator(userCollection, { email: v }),
					message: ({ value }) => `Reject: Email ${value} already in use`
				}
			]
		},
		age: {
			type: Number
		},
		password: {
			type: String
		},
		cart: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "carts"
		},
		role: {
			type: String,
			enum: {
				values: ["USER", "PREMIUM", "ADMIN"],
				message: "{VALUE} is not supported"
			},
			default: "USER"
		}
	},
	{
		toJSON: {
			versionKey: false,
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				delete ret.password;
			}
		}
	}
);

userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		try {
			this.password = await createHash(this.password);
		} catch (error) {
			return next(error);
		}
	}
	next();
});

userSchema.methods.validatePassword = function (password) {
	return isValidPassword(password, this);
};

export const userModel = mongoose.model(userCollection, userSchema);

async function duplicateValidator(collection, field) {
	const duplicated = await mongoose.models[collection].findOne(field);
	return !duplicated;
}

function emailFormatValidator(value) {
	const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return emailRegex.test(value);
}
