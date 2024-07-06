import {
	clearFile,
	seedProductsFile,
	seedProductsMongo
} from "./products-seeder.js";

async function main() {
	const db = process.argv[2];

	if (db === "mongo") await seedProductsMongo();
	else if (db === "fs") {
		if (process.argv[3] === "--clear") {
			await clearFile();
		} else await seedProductsFile();
	} else {
		console.warn("Warning: Must have at least 1 arg");
		process.exit(1);
	}
}

main();
