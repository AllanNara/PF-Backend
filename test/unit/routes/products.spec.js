/* eslint-disable */
import * as chaiModule from "chai";
import chaiHttp from "chai-http/index.js";
import { httpServer } from "../../../src/app.js";
import ajv from "../../helpers/schema-validator.js";

const chai = chaiModule.use(chaiHttp);
const { expect, request } = chai;

describe("Product route", () => {
	describe("GET /api/products", () => {
		const apiEndpoint = "/api/products";
		let response;

		before(async () => {
			response = await request.execute(httpServer).get(apiEndpoint);
		});

		after(() => {
			httpServer.close();
		});

		it("should return status code 200", async () => {
			expect(response).to.have.status(200);
		});

		it("should have Content-Type header as JSON", async () => {
			expect(response).to.have.header("Content-Type", /json/);
		});

		it("should have a data structure matching the JSON Schema", () => {
			const validate = ajv.getSchema("http://myapi.com/schema/pagination.json");
			const valid = validate(response.body);
			if (!valid) console.error(validate.errors);
			expect(valid).to.be.true;
		});

		it("should return the number of products specified by the limit query", async () => {
			const limit = 3;
			const responseWithLimit = await request
				.execute(httpServer)
				.get(`/api/products?limit=${limit}`);

			expect(response.body.payload).to.have.lengthOf(10);
			expect(responseWithLimit.body.payload).to.have.lengthOf(limit);
		});

		it("should handle invalid values passed by query params", async () => {
			const invalidQueries = [
				`${apiEndpoint}?page=unknown`,
				`${apiEndpoint}?limit=undefined`,
				`${apiEndpoint}?sort=3141`,
				`${apiEndpoint}?query={{U}}`
			];

			for (const query of invalidQueries) {
				const res = await request.execute(httpServer).get(query);
				expect(res, `Error expected for query: ${query}`).to.have.status(400);
				expect(res.body).to.have.property("status").to.equal("error");
			}
		});
	});
});
