import * as productManager from "./managers/ProductManager.js";

export default (io) => {
	io.on("connection", async (socket) => {
		console.info(`New client connected: ${socket.id}`);

		try {
			const products = await productManager.getProducts();
			socket.emit("products", { products });
		} catch (error) {
			console.error(error);
			socket.emit("error", { error: true, message: "Something went wrong" });
		}

		socket.on("new-product", async (data) => {
			try {
				const result = await productManager.addProduct(data.product);
				if (!result) {
					socket.emit("error", {
						error: true,
						message: "Missing fields or code alredy in use"
					});
				}
				const products = await productManager.getProducts();
				io.emit("products", { products });
			} catch (error) {
				console.error(error);
				socket.emit("error", { error: true, message: "Something went wrong" });
			}
		});

		socket.on("delete-product", async (data) => {
			try {
				const result = await productManager.deleteProduct(data.id);
				if (!result) {
					socket.emit("error", { error: true, message: "Product not found" });
				}
				const products = await productManager.getProducts();
				io.emit("products", { products });
			} catch (error) {
				console.error(error);
				socket.emit("error", { error: true, message: "Something went wrong" });
			}
		});
	});
};
