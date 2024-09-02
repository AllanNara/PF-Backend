import { createHash, isValidPassword } from "../../utils/bcrypt.js";
import logger from "../../../lib/winston.js";

const users = [];
let currentId = 0;

export async function createUser(userData) {
	if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData)) {
		logger.verbose("Invalid format email: '%s'", userData.email);
		return null;
	}

	if (users.find((user) => user.email === userData.email)) {
		logger.verbose("Reject: Email '%s' already in use", userData.email);
		return null;
	}

	const user = {
		...userData,
		id: ++currentId,
		password: await createHash(userData.password)
	};

	users.push(user);
	return user.id;
}

export function getUserById(uid) {
	const user = users.find((user) => user.uid === uid);
	if (!user) {
		logger.verbose("User with ID '%s' not found", uid);
		return null;
	}
	return user;
}

export async function getUserByEmail(email) {
	const user = users.find((user) => user.email === email);
	if (!user) {
		logger.verbose("User '%s' not found", email);
		return null;
	}
	user.validatePassword = async (password) =>
		await isValidPassword(password, user);
	return user;
}
