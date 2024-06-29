const validateProductFields = (req, res, next) => {
	const { title, description, code, price, stock, category } = req.body;

	if (!title || !description || !code || !price || !stock || !category) {
		return res.status(400).json({ status: "error", message: "Missing fields" });
	}

	if (!req.body.status) req.body.status = true;
	next();
};

export default validateProductFields;
