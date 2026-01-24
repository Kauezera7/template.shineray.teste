document.addEventListener('DOMContentLoaded', () => {
    // O trilho (track) é onde as motos ficam alinhadas uma ao lado da outra
    const carouselTrack = document.querySelector('.carousel-track');

    if (carouselTrack && typeof productsData !== 'undefined') {
        // Limpa qualquer conteúdo estático que estiver no HTML
        carouselTrack.innerHTML = ''; 

        // Percorre a lista de motos e cria o HTML para cada uma
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

        // NOTA: A lógica de movimento (botão para o lado) está no arquivo js/carousel.js
    }
});
