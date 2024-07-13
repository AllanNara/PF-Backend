import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "E-Commercy API",
			version: "beta 1.0.0",
			description:
				"Generic ecommerce API design for Backend course on Coderhouse, create by Allan Reynoso, Github /AllanNara",
			contact: {
				email: "allannara@outlook.com",
				name: "Contact me",
				url: "https://www.linkedin.com/in/allannara"
			},
			license: {
				name: "MIT License",
				url: "https://github.com/AllanNara/PF-Backend/blob/main/LICENSE.txt"
			}
		},
		servers: [
			{ url: "localhost:8080/api", description: "Local development API" }
		],
		tags: [
			{ name: "carts", description: "CRUD operations of the user carts" },
			{ name: "products", description: "CRUD operations of products" }
		]
	},
	apis: [path.join("..", "..", "docs/**/*.yaml")]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
