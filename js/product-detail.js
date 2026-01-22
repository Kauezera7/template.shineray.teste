document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail-container');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (isNaN(productId)) {
        productDetailContainer.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    const product = productsData.find(p => p.id === productId);

    if (!product) {
        productDetailContainer.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    // Update page title
    document.title = `ShineStore - ${product.name}`;

    // Build product detail HTML
    let thumbnailsHtml = '';
    product.thumbnails.forEach(thumb => {
        thumbnailsHtml += `<img src="${thumb}" alt="Thumbnail of ${product.name}" class="thumbnail-img">`;
    });

    let specificationsHtml = '';
    for (const key in product.specifications) {
        specificationsHtml += `<li><strong>${key}:</strong> ${product.specifications[key]}</li>`;
    }

    productDetailContainer.innerHTML = `
        <div class="product-detail-layout">
            <div class="product-images">
                <img src="${product.mainImage}" alt="${product.name}" id="main-product-image">
                <div class="thumbnail-gallery">
                    ${thumbnailsHtml}
                </div>
            </div>
            <div class="product-info">
                <h1 id="product-name">${product.name}</h1>
                <p class="price" id="product-price">${product.price}</p>
                <div class="specifications">
                    <h2>Especificações</h2>
                    <ul id="product-specs-list">
                        ${specificationsHtml}
                    </ul>
                </div>
                <button class="btn">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;

    // Add functionality to switch main image on thumbnail click
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-gallery .thumbnail-img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            mainImage.src = thumbnail.src;
            // Optionally add an active class to highlight the current thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
});
