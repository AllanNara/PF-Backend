import { _dirname } from "../../../dirname.js";
import fs from "fs/promises";
import { resolve } from "path";

const PATH_BASE = resolve(_dirname, "src", "dao", "fs", "data");

export function readFile(filename) {
	const path = resolve(PATH_BASE, filename);
	return async function () {
		try {
			const data = await fs.readFile(path, "utf-8");
			const json = JSON.parse(data);
			return json;
		} catch (error) {
			console.warn(error);
			return [];
		}
	};
}

export function writeFile(filename) {
	const path = resolve(PATH_BASE, filename);
	return async function (doc) {
		try {
			const json = JSON.stringify(doc, null, 2);
			await fs.writeFile(path, json, "utf-8");
		} catch (error) {
			console.error(error);
		}
	};
}
