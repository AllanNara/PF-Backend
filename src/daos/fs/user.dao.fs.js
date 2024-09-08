import { readFile, writeFile } from "./ManagerFileSystem.js";

const FILE_NAME = "users.json";

const readUsersFile = readFile(FILE_NAME);
const saveUsers = writeFile(FILE_NAME);

export async function readUsers() {
	const users = await readUsersFile();
	return users;
}

export async function readByEmail(email) {
	const users = await readUsersFile();
	return users.find((user) => user.email === email);
}

export async function readUserById(uid) {
	const users = await readUsersFile();
	return users.find((user) => user.id === uid);
}

export async function createUser(userData) {
	const users = await readUsersFile();
	const user = {
		...userData,
		id: users.length ? users[users.length - 1].id + 1 : 1
	};

	users.push(user);
	await saveUsers(users);
	return user.id;
}

// For next implementation (PUT, DELETE)

// export async function updateUser(uid, data) {
// const users = await readUsersFile();
// 	return users.some((user) => user.id === uid && Object.assign(user, data));
// }

// export async function deleteUser(uid) {
// const users = await readUsersFile();
// 	const index = users.findIndex((user) => user.id === uid);
// 	return index !== -1 ? Boolean(users.splice(index, 1)) : false;
// }
