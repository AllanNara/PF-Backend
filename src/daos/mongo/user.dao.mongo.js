import { userModel } from "./models/user.model.js";

export async function readUsers() {
	return await userModel.find({});
}

export async function readByEmail(email) {
	return await userModel.findOne({ email });
}

export async function readUserById(uid) {
	return await userModel.findById(uid);
}

export async function createUser(userData) {
	return (await userModel.create(userData)).id;
}

// For next implementation (PUT, DELETE)

// export async function updateUser(uid, data) {
//	return await userModel.findByIdAndUpdate(uid, data, { new: true });
// }

// export async function deleteUser(uid) {
//	return await userModel.findByIdAndDelete(uid);
// }
