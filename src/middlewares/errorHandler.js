// eslint-disable-next-line -- 'next' param is needed for middleware errors
const errorHandler = (err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
};

export default errorHandler;
