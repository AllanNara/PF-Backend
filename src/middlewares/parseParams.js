export const parseParams = (req, res, next) => {
	const paramsToCheck = ["uid", "cid", "pid"];

	paramsToCheck.forEach((param) => {
		if (req.params[param]) {
			const parsedValue = parseInt(req.params[param], 10);
			if (!isNaN(parsedValue)) {
				req.params[param] = parsedValue;
			}
		}
	});

	next();
};
