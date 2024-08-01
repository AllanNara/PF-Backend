const validateProductFields = (req, res, next) => {
	const { title, description, code, category } = req.body;
	let price = req.body.price;
	let stock = req.body.stock;

	if (!title || !description || !code || !price || !stock || !category) {
		req.logger.warn("Missing fields", {
			info: {
				title: title || null,
				description: description || null,
				code: code || null,
				price: price || null,
				stock: stock || null,
				category: category || null
			}
		});
		return res.status(400).json({ status: "error", message: "Missing fields" });
	}

	price = Number(price);
	stock = Number(stock);

	if (isNaN(stock) || isNaN(price)) {
		req.logger.error("Invalid values 'stock' or 'price'");
		return;
	}

	if (!req.body.status) req.body.status = true;
	next();
};

export default validateProductFields;
