import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
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
		required: true
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
		type: String
	}
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export const userModel = mongoose.model(userCollection, userSchema);
