/* eslint-disable-next-line */
const socket = io();

// Upload all products
/* eslint-disable-next-line */
const productsList = document.getElementById("products-list");

socket.on("products", (data) => {
	const html = data.products.reduce(generateCardProduct, "");
	productsList.innerHTML = `<div class="row">` + html + `</div>`;
	addDeleteEventListeners();
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
					<button class="btn btn-danger delete-product" id=${product.id}>Delete product</button>
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

// Add delete product functionality
function addDeleteEventListeners() {
	/* eslint-disable-next-line */
	const deleteButtons = document.querySelectorAll(".delete-product");
	deleteButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			socket.emit("delete-product", { id: e.target.id });
		});
	});
}

// Add new product
/* eslint-disable-next-line */
const formProduct = document.getElementById("form-product");
formProduct.addEventListener("submit", (e) => {
	e.preventDefault();

	const formData = new FormData(formProduct);
	const formValues = {};

	// Iterar sobre los pares clave-valor del objeto FormData
	for (const [key, value] of formData.entries()) {
		formValues[key] = value;
	}

	socket.emit("new-product", { product: formValues });
});

// Show errors
/* eslint-disable-next-line */
const toastyError = document.getElementById("toasty-error");

socket.on("error", (error) => {
	/* eslint-disable-next-line */
	const toast = document.createElement("div");
	toast.classList.add("toast");
	toast.setAttribute("role", "alert");
	toast.setAttribute("aria-live", "assertive");
	toast.setAttribute("aria-atomic", "true");

	toast.innerHTML = `
    <div class="toast-header">
      <strong class="rounded me-2">*</strong>
      <strong class="me-auto">Error al cargar producto</strong>
      <small>now</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ${error.message} !!
    </div>
  `;

	toastyError.appendChild(toast);
	/* eslint-disable-next-line */
	const bootstrapToast = new bootstrap.Toast(toast);
	bootstrapToast.show();

	setTimeout(() => {
		toastyError.removeChild(toast);
	}, 6000);
});
