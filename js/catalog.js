document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products');
    const colorFilter = document.getElementById('color-filter');

    /**
     * FUNÇÃO: Renderizar os produtos na tela
     * @param {string} filterColor - A cor selecionada no filtro (ou 'all' para todas)
     */
    const renderProducts = (filterColor = 'all') => {
        if (!productsContainer) return;

        // Limpa a lista antes de mostrar os novos (importante para o filtro)
        productsContainer.innerHTML = ''; 

        // Filtra as motos: se for 'all' pega tudo, senão pega só a cor escolhida
        const filteredProducts = filterColor === 'all' 
            ? productsData 
            : productsData.filter(p => p.color === filterColor);

        // Para cada moto, cria o "quadradinho" (card) na tela
        filteredProducts.forEach(product => {
            const productHtml = `
                <a href="product-detail.html?modelo=${product.slug}" class="product-link">
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

    // Inicializa a página mostrando todas as motos
    if (typeof productsData !== 'undefined') {
        renderProducts();
    }

    /**
     * EVENTO: Quando o usuário muda o filtro de cor
     */
    if (colorFilter) {
        colorFilter.addEventListener('change', () => {
            renderProducts(colorFilter.value);
        });
    }
});