document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');

    if (carouselTrack && typeof productsData !== 'undefined') {
        carouselTrack.innerHTML = ''; // Limpa os estáticos

        // Renderiza todos os produtos no carrossel
        productsData.forEach(product => {
            const productHtml = `
                <a href="product-detail.html?modelo=${product.slug}" class="product-link">
                    <div class="product-card" data-id="${product.id}">
                        <img src="${product.mainImage}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                    </div>
                </a>
            `;
            carouselTrack.innerHTML += productHtml;
        });

        // Após carregar os produtos, reiniciamos a lógica do carrossel (que está no nav.js ou chamamos aqui)
        // Como a lógica está no nav.js, ela já vai funcionar se os elementos forem criados a tempo.
    }
});
