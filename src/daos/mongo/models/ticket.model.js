import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true
	},
	purchase_datetime: {
		type: Date,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	purchaser: {
		type: String,
		required: true
	}
});

ticketSchema.set("toObject", { virtuals: true });
ticketSchema.set("toJSON", { virtuals: true });

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
