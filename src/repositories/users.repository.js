import getDAO from "../daos/factory.js";

const UserDAO = getDAO("User");

export async function addUser(newUser) {
	const userToSave = {
		...newUser,
		role: newUser.role || "USER"
	};
	return await UserDAO.createUser(userToSave);
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
