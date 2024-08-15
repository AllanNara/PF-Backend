import config from "../../config/index.js";
import jwt from "jsonwebtoken";
import logger from "../../lib/winston.js";

export const generateJwt = async (user) => {
	try {
		const payload = {};
		payload.uid = user.id;
		payload.email = user.email;

		return await signJwt({ data: payload }, config.JWT_SECRET, {
			expiresIn: "24h"
		});
	} catch (error) {
		logger.warn("Error to generate JWT", { info: error.message || error });
	}
};

export const decodeJwt = async (token) => {
	try {
		return await verifyJwt(token, config.JWT_SECRET);
	} catch (error) {
		logger.warn("Error to decode JWT", { info: error.message || error });
	}
};

function signJwt(payload, secret, options) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, secret, options, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
}

function verifyJwt(token, secret) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) reject(err);
			resolve(decoded);
		});
	});
}
