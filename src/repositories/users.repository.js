import getDAO from "../daos/factory.js";

const UserDAO = getDAO("User");

export async function addUser(newUser) {
	return await UserDAO.createUser(newUser);
}

export async function searchUserByEmail(email) {
	return await UserDAO.readByEmail(email);
}

export async function getUserById(id) {
	return await UserDAO.readUserById(id);
}

export async function getAllUsers() {
	return await UserDAO.readUsers();
}
