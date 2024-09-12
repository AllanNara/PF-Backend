import config from "../../config/index.js";
import { join } from "path";
import logger from "../../lib/winston.js";

const DAOS = {};
const getDAO = (entity) => DAOS[entity];

const importDAO = async (entity) => {
	try {
		const path = join(
			import.meta.dirname,
			config.DAO,
			`${entity}.dao.${config.DAO}.js`
		);
		const module = await import(path);
		return module;
	} catch (error) {
		logger.error(`Error importing ${entity}.dao.${config.DAO}:`, {
			error: error.message || error
		});
		throw error;
	}
};
const loadDAOS = async () => (
	(DAOS["Cart"] = await importDAO("cart")),
	(DAOS["Product"] = await importDAO("product")),
	(DAOS["User"] = await importDAO("user")),
	(DAOS["Ticket"] = await importDAO("ticket"))
);

await loadDAOS();

export default getDAO;
