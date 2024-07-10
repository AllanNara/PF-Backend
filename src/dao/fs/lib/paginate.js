export default function paginateDocs(data, options) {
	const { page, limit, sort } = options;
	const offset = limit * (page - 1);
	let payload, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage;

	if (options.query) {
		const query = JSON.parse(options.query);
		data = data.filter((doc) => {
			return (
				(typeof query.status !== "boolean" || query.status === doc.status) &&
				(!query.category || query.category === doc.category)
			);
		});
	}

	payload = data.slice(offset, offset + limit);
	if (sort) {
		payload.sort((a, b) => {
			if (sort === "asc") return a.price - b.price;
			else if (sort === "desc") return b.price - a.price;
			else return 0;
		});
	}
	totalPages = Math.ceil(data.length / limit);
	hasPrevPage = Boolean(page > 1);
	hasNextPage = Boolean(page < totalPages);
	prevPage = hasPrevPage ? page - 1 : null;
	nextPage = hasNextPage ? page + 1 : null;

	return {
		payload,
		totalPages,
		page,
		hasPrevPage,
		hasNextPage,
		prevPage,
		nextPage
	};
}
