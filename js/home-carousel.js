/**
 * LÓGICA DO CARROSSEL DE PRODUTOS (HOME)
 * Carrega as motos dinamicamente na página inicial usando o novo design.
 */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    
    if (!track) return;

    const renderCarouselProducts = () => {
        // Pega apenas as primeiras 6 motos para o destaque da home
        const featuredProducts = productsData.slice(0, 6);

        const productsHtml = featuredProducts.map(product => {
            const highlightsHtml = (product.highlights || [])
                .map(h => `<span><i class="fas ${h.icon}"></i> ${h.text}</span>`)
                .join('');

            return `
                <div class="product-link">
                    <a href="product-detail.html?modelo=${product.slug}" style="text-decoration:none; color:inherit;">
                        <div class="product-card">
                            <div class="moto-badge">${(product.brand || 'Shineray').toUpperCase()}</div>
                            <img src="${product.mainImage}" alt="${product.name}">
                            
                            <div class="moto-info">
                                <h3>${product.name}</h3>
                                
                                <div class="moto-specs">
                                    ${highlightsHtml}
                                </div>
                                
                                <div class="moto-price">
                                    <strong>${product.price}</strong>
                                    <small>${product.installment || 'Consulte parcelamento'}</small>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        }).join('');

        track.innerHTML = productsHtml;
    };

    if (typeof productsData !== 'undefined') {
        renderCarouselProducts();
    }
});