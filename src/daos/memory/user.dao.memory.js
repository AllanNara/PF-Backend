const users = [];
let currentId = 0;

export function readUsers() {
	return users;
}

export function readByEmail(email) {
	return users.find((user) => user.email === email);
}

export function readUserById(uid) {
	return users.find((user) => user.id === uid);
}

export function createUser(userData) {
	const user = {
		...userData,
		id: ++currentId
	};

	users.push(user);
	return user.id;
}

// For next implementation (PUT, DELETE)

// export function updateUser(uid, data) {
// 	return users.some((user) => user.id === uid && Object.assign(user, data));
// }

// export function deleteUser(uid) {
// 	const index = users.findIndex((user) => user.id === uid);
// 	return index !== -1 ? Boolean(users.splice(index, 1)) : false;
// }
