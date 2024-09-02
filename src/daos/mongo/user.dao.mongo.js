import logger from "../../../lib/winston.js";
import { userModel } from "./models/user.model.js";

export async function createUser(userData) {
	try {
		const user = await userModel.create(userData);
		return user;
	} catch (error) {
		const warning = error?.errors?.email?.message || error?.message || error;
		logger.verbose(warning);
		return null;
	}
}

export async function getUserById(uid) {
	try {
		const user = await userModel.findById(uid);
		return user;
	} catch (error) {
		if (error?.message.includes("Cast to ObjectId failed")) {
			logger.verbose("User with ID'%s' not found", uid);
			return null;
		}
		throw error;
	}
}

export async function getUserByEmail(email) {
	const user = await userModel.findOne({ email });
	if (!user) {
		logger.verbose("User '%s' not found", email);
		return null;
	}
	return user;
}
