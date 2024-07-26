import Ajv from "ajv";
import fs from "fs";
import path from "path";

const schemas = [
	{
		file: "product/productBase.json",
		id: "http://myapi.com/schema/productBase.json"
	},
	{
		file: "product/createProduct.json",
		id: "http://myapi.com/schema/createProduct.json"
	},
	{
		file: "product/updateProduct.json",
		id: "http://myapi.com/schema/updateProduct.json"
	},
	{ file: "product/product.json", id: "http://myapi.com/schema/product.json" },
	{
		file: "api-responses/pagination.json",
		id: "http://myapi.com/schema/pagination.json"
	}
];

const loadJsonSchema = (schemaPath) => {
	try {
		const schemaData = fs.readFileSync(schemaPath, "utf-8");
		return JSON.parse(schemaData);
	} catch (error) {
		console.error(`Error loading schema from ${schemaPath}:`, error);
		throw error; // Propagate error to stop execution if critical
	}
};

const ajv = new Ajv({ allowUnionTypes: true });

schemas.forEach(({ file, id }) => {
	const schemaPath = path.join(import.meta.dirname, "schemas", file);
	const schema = loadJsonSchema(schemaPath);
	ajv.addSchema(schema, id);
});

export default ajv;
