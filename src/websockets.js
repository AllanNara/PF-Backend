import getDAO from "./daos/factory.js";
import logger from "../lib/winston.js";

const ProductDAO = getDAO("Product");
export default (io) => {
	io.on("connection", async (socket) => {
		logger.info(`New client connected: ${socket.id}`);

		try {
			const products = await ProductDAO.getProducts();
			socket.emit("products", { products });
		} catch (error) {
			logger.error("Error on socket", { info: error.message || error });
			socket.emit("error", { error: true, message: "Something went wrong" });
		}

		socket.on("new-product", async (data) => {
			try {
				const result = await ProductDAO.addProduct(data.product);
				if (!result) {
					socket.emit("error", {
						error: true,
						message: "Missing fields or code already in use"
					});
				}
				const products = await ProductDAO.getProducts();
				io.emit("products", { products });
			} catch (error) {
				logger.error("Error on socket", { info: error.message || error });
				socket.emit("error", { error: true, message: "Something went wrong" });
			}
		});

		socket.on("delete-product", async (data) => {
			try {
				const result = await ProductDAO.deleteProduct(data.id);
				if (!result) {
					socket.emit("error", { error: true, message: "Product not found" });
				}
				const products = await ProductDAO.getProducts();
				io.emit("products", { products });
			} catch (error) {
				logger.error("Error on socket", { info: error.message || error });
				socket.emit("error", { error: true, message: "Something went wrong" });
			}
		});
	});
};
