import { ProductDTO } from "../dtos/product.dto.js";
import deleteFilesByPath from "../utils/deleteFiles.js";

const validateProductFields = (req, res, next) => {
	try {
		const formatterData = ProductDTO.generate(req.body);
		req.product = formatterData;
		next();
	} catch (error) {
		if (req.files) {
			deleteFilesByPath(req.files, "products");
		}
		next({ ...error, status: 400, message: error.message });
	}
};

export default validateProductFields;
