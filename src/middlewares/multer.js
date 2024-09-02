import getDAO from "../daos/factory.js";
import multer from "multer";
import path from "path";

const ProductDAO = getDAO("Product");
const createStorage = (dir) => {
	return multer.diskStorage({
		destination: async function (req, file, cb) {
			if (dir === "products") {
				const productCode = req.body.code;
				const codeRepeat = await ProductDAO.checkCodeExists(productCode);
				if (codeRepeat)
					return cb({ message: `Code ${productCode} already exists` });
			}

			const uploadPath = path.resolve(
				import.meta.dirname,
				"..",
				"public",
				"uploads",
				dir
			);

			cb(null, uploadPath);
		},
		filename: function (req, file, cb) {
			const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
			const ext = path.extname(file.originalname).toLowerCase();
			cb(null, file.fieldname + "-" + uniqueSuffix + ext);
		}
	});
};

export const productUpload = multer({ storage: createStorage("products") });
