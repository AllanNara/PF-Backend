/* eslint-disable */
const socket = io();

// Upload all products
const productsList = document.getElementById("products-list");

socket.on("products", (data) => {
	const html = data.products.reduce(generateCardProduct, "");
	productsList.innerHTML = `<div class="row">` + html + `</div>`;
});

function generateCardProduct(prev, product) {
	const gallery = generateGallery(product.thumbnails);
	const card = `
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
				 	${gallery}
					<h5 class="card-title">${product.title}</h5>
					<p class="card-subtitle">${product.category}</p>
					<p class="card-text">${product.description}</p>
					<p class="card-text">$ ${product.price}</p>
					<p class="card-text">Stock: ${product.stock}</p>
					<button class="btn btn-danger">Delete product</button>
				</div>
			</div>
		</div>
	`;

	return prev + card;
}

function generateGallery(thumbnails) {
	if (!thumbnails.length) {
		return `
			<img
				src="assets/images/not-available.webp"
				class="card-img-top object-fit-cover mb-3"
				alt="images"
				style="height: 13.7rem"
			/>`;
	}
	const allThumbnails = thumbnails.reduce(generateThumbnail, "");

	const gallery = `
	<div
		id="thumbnails"
		class="carousel slide"
	>
		<div class="carousel-inner">
			${allThumbnails}
			<button
				class="carousel-control-prev"
				type="button"
				data-bs-target="#thumbnails"
				data-bs-slide="prev"
			>
				<span
					class="carousel-control-prev-icon"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button
				class="carousel-control-next"
				type="button"
				data-bs-target="#thumbnails"
				data-bs-slide="next"
			>
				<span
					class="carousel-control-next-icon"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>
	</div>
	`;
	return gallery;
}

function generateThumbnail(result, thumbnail, index) {
	let thumbnailsHtml = `
	<div class="carousel-item ${index === 0 ? "active" : ""}">
		<img
			src="uploads/products/${thumbnail}"
			class="card-img-top object-fit-cover mb-3"
			alt="images"
			style="height: 13.7rem"
		/>
	</div>

 `;
	return result + thumbnailsHtml;
}

// Add new product
const formProduct = document.getElementById("form-product");
console.log({ form: new FormData(formProduct) });
