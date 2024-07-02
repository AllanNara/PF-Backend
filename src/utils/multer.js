import { _dirname } from "../../dirname.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(_dirname, "public", "upload"));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname);
		cb(null, file.fieldname + "-" + uniqueSuffix + ext);
	}
});

export const upload = multer({ storage });
