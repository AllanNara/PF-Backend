export default (data, { page, limit, sort, query }) => {
	const offset = limit * (page - 1);
	let payload, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage;

	if (query) {
		const queryObj = JSON.parse(query);
		data = data.filter(
			(doc) =>
				(typeof queryObj.status !== "boolean" ||
					queryObj.status === doc.status) &&
				(!queryObj.category || queryObj.category === doc.category)
		);
	}

	payload = data.slice(offset, offset + limit);
	if (sort) {
		payload.sort((a, b) =>
			sort === "asc"
				? a.price - b.price
				: sort === "desc"
					? b.price - a.price
					: 0
		);
	}
	totalPages = Math.ceil(data.length / limit);
	hasPrevPage = page > 1;
	hasNextPage = page < totalPages;
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
};
