import multer from "multer";
import path from "path";

const createStorage = (dir) => {
	return multer.diskStorage({
		destination: function (req, file, cb) {
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
