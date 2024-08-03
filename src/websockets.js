import { ProductManager } from "./dao/factory.js";
import logger from "../lib/winston.js";

export default (io) => {
	io.on("connection", async (socket) => {
		logger.info(`New client connected: ${socket.id}`);

		try {
			const products = await ProductManager.getProducts();
			socket.emit("products", { products });
		} catch (error) {
			logger.error("Error on socket", { info: error.message || error });
			socket.emit("error", { error: true, message: "Something went wrong" });
		}

		socket.on("new-product", async (data) => {
			try {
				const result = await ProductManager.addProduct(data.product);
				if (!result) {
					socket.emit("error", {
						error: true,
						message: "Missing fields or code already in use"
					});
				}
				const products = await ProductManager.getProducts();
				io.emit("products", { products });
			} catch (error) {
				logger.error("Error on socket", { info: error.message || error });
				socket.emit("error", { error: true, message: "Something went wrong" });
			}
		});

		socket.on("delete-product", async (data) => {
			try {
				const result = await ProductManager.deleteProduct(data.id);
				if (!result) {
					socket.emit("error", { error: true, message: "Product not found" });
				}
				const products = await ProductManager.getProducts();
				io.emit("products", { products });
			} catch (error) {
				logger.error("Error on socket", { info: error.message || error });
				socket.emit("error", { error: true, message: "Something went wrong" });
			}
		});
	});
};
