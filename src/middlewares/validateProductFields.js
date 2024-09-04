import { ProductDTO } from "../dtos/product.dto.js";

const validateProductFields = (req, res, next) => {
	try {
		const thumbnails = req.files
			? req.files.map((file) => `/uploads/products/${file.filename}`)
			: [];
		const formatterData = ProductDTO.generate({ ...req.body, thumbnails });
		req.product = formatterData;
		next();
	} catch (error) {
		next(error);
	}
};

export default validateProductFields;
