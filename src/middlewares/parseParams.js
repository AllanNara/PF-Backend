import mongoose from "mongoose";

export const parseParams = (req, res, next, value, name) => {
	if (/^\d+$/.test(value)) {
		const parsedValue = parseInt(value, 10);
		req.params[name] = parsedValue;
		return next();
	} else if (mongoose.Types.ObjectId.isValid(value)) {
		return next();
	}
	res.status(400).send({ error: "Invalid ID format", param: name, value });
};
