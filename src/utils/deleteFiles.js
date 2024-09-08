import fs from "fs";
import logger from "../../lib/winston.js";
import path from "path";

const deleteFilesByPath = async (files, folder) => {
	const uploadsFolder = path.resolve("src", "public", "uploads", folder);
	if (files && files.length) {
		try {
			for (const file of files) {
				const filePath = path.join(uploadsFolder, file.filename);
				await fs.promises.unlink(filePath);
				logger.verbose(`File deleted: ${file.filename}`);
			}
		} catch (error) {
			logger.error("Error on delete files", { info: error.message || error });
		}
	}
};

export default deleteFilesByPath;
