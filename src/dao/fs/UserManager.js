import { createHash, isValidPassword } from "../../utils/bcrypt.js";
import { readFile, writeFile } from "./ManagerFileSystem.js";
import logger from "../../../lib/winston.js";

const FILE_NAME = "users.json";

const readUsersFile = readFile(FILE_NAME);
const saveUsers = writeFile(FILE_NAME);

export async function createUser(userData) {
	if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData)) {
		logger.verbose("Invalid format email: '%s'", userData.email);
		return null;
	}

	const users = await readUsersFile();
	if (users.find((user) => user.email === userData.email)) {
		logger.verbose("Reject: Email '%s' already in use", userData.email);
		return null;
	}

	const user = {
		...userData,
		id: users.length ? users[users.length - 1].id + 1 : 1,
		password: await createHash(userData.password)
	};

	users.push(user);
	await saveUsers(users);
	return user.id;
}

export async function getUserById(uid) {
	const users = await readUsersFile();
	const user = users.find((user) => user.uid === uid);
	if (!user) {
		logger.verbose("User with ID '%s' not found", uid);
		return null;
	}
	return user;
}

export async function getUserByEmail(email) {
	const users = await readUsersFile();
	const user = users.find((user) => user.email === email);
	if (!user) {
		logger.verbose("User '%s' not found", email);
		return null;
	}
	user.validatePassword = async (password) =>
		await isValidPassword(password, user);
	return user;
}
