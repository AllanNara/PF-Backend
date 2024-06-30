import { _dirname } from "../../dirname";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(_dirname, "public", "upload"));
	},
	filename: function (req, file, cb) {
		req.fileName = Date.now() + "-" + file.originalname;
		cb(null, req.fileName);
	}
});

export const upload = multer({ storage });
