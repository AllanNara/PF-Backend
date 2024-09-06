import { ProductDTO } from "../dtos/product.dto.js";

const validateProductFields = (req, res, next) => {
	try {
		const formatterData = ProductDTO.generate(req.body);
		req.product = formatterData;
		next();
	} catch (error) {
		next(error);
	}
};

export default validateProductFields;
