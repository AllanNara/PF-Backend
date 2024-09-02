import config from "../../config/index.js";
import { join } from "path";
import logger from "../../lib/winston.js";

const Managers = {};
const getManager = (entity) => Managers[entity];

const importManager = async (entity) => {
	try {
		const path = join(import.meta.dirname, config.DAO, `${entity}Manager.js`);
		const module = await import(path);
		return module;
	} catch (error) {
		logger.error(`Error importing ${entity}Manager:`, {
			error: error.message || error
		});
		throw error;
	}
};
const loadManagers = async () => (
	(Managers["Cart"] = await importManager("Cart")),
	(Managers["Product"] = await importManager("Product")),
	(Managers["User"] = await importManager("User"))
);

await loadManagers();

export default getManager;
