import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { UserDTO } from "../dtos/user.dto.js";
import getRepository from "../repositories/index.js";
import logger from "../../lib/winston.js";

const UserRepository = getRepository("User");

export async function register(userData) {
	if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)) {
		logger.verbose("Invalid format email: '%s'", userData.email);
		return null;
	}

	if (await UserRepository.searchUserByEmail(userData.email)) {
		logger.verbose("Reject: Email '%s' already in use", userData.email);
		return null;
	}

	const user = { ...userData, password: createHash(userData.password) };
	return await UserRepository.addUser(user);
}

export async function login(userData) {
	const user = await UserRepository.searchUserByEmail(userData.email);
	if (!user) {
		logger.verbose("User '%s' not found", userData.email);
		return null;
	}

	if (await isValidPassword(userData.password, user)) {
		logger.verbose("Invalid credentials");
		return null;
	}
	return UserDTO.generate(user);
}

export async function getUser(uid) {
	return UserDTO.generate(await UserRepository.getUserById(uid));
}

export async function checkEmailAvailable(email) {
	return !(await UserRepository.searchUserByEmail(email));
}

export async function bringAllUsers() {
	const allUsers = await UserRepository.getAllUsers();
	return allUsers.map((user) => UserDTO.generate(user));
}
