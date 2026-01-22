document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products');
    const colorFilter = document.getElementById('color-filter');

    // Função para renderizar os produtos
    const renderProducts = (filterColor = 'all') => {
        if (!productsContainer) return;

        productsContainer.innerHTML = ''; // Limpa o catálogo

        const filteredProducts = filterColor === 'all' 
            ? productsData 
            : productsData.filter(p => p.color === filterColor);

        filteredProducts.forEach(product => {
            const productHtml = `
                <a href="product-detail.html?id=${product.id}" class="product-link">
                    <div class="product-card" data-color="${product.color}" data-id="${product.id}">
                        <img src="${product.mainImage}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                    </div>
                </a>
            `;
            productsContainer.innerHTML += productHtml;
        });
    };

    // Inicializa o catálogo
    if (typeof productsData !== 'undefined') {
        renderProducts();
    }

    // Filtro de cores
    if (colorFilter) {
        colorFilter.addEventListener('change', () => {
            renderProducts(colorFilter.value);
        });
    }
});