import bcrypt from "bcrypt";
import logger from "../../lib/winston.js";

export const createHash = async (password) => {
	try {
		return await bcrypt.hash(password, 10);
	} catch (error) {
		logger.error("Error to create hash", { error: error.message || error });
	}
};

export const isValidPassword = async (password, user) => {
	try {
		const isValid = await bcrypt.compare(password, user.password);

		if (!isValid) {
			logger.verbose("Incorrect credentials", { incorrect_password: password });
			return null;
		}

		return isValid;
	} catch (error) {
		logger.error("Error to compare hash", { error: error.message || error });
	}
};
