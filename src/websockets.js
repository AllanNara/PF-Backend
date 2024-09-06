import { ProductDTO } from "./dtos/product.dto.js";
import getService from "./services/index.js";
import logger from "../lib/winston.js";

const ProductService = getService("Product");
export default (io) => {
	io.on("connection", async (socket) => {
		logger.info(`New client connected: ${socket.id}`);

		try {
			const products = await ProductService.bringProducts();
			socket.emit("products", { products });
		} catch (error) {
			logger.error("Error on socket", { info: error.message || error });
			socket.emit("error", { error: true, message: "Something went wrong" });
		}

		socket.on("new-product", async (data) => {
			try {
				const formatterData = ProductDTO.generate(data.product);
				const result = await ProductService.addProduct(formatterData);
				if (!result) {
					socket.emit("error", {
						error: true,
						message: "Missing fields or code already in use"
					});
				}
				const products = await ProductService.bringProducts();
				io.emit("products", { products });
			} catch (error) {
				logger.error("Error on socket", { info: error.message || error });
				socket.emit("error", { error: true, message: "Something went wrong" });
			}
		});

		socket.on("delete-product", async (data) => {
			try {
				const result = await ProductService.removeProduct(data.id);
				if (!result) {
					socket.emit("error", { error: true, message: "Product not found" });
				}
				const products = await ProductService.bringProducts();
				io.emit("products", { products });
			} catch (error) {
				logger.error("Error on socket", { info: error.message || error });
				socket.emit("error", { error: true, message: "Something went wrong" });
			}
		});
	});
};
