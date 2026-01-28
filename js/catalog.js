document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products');
    
    // Elementos de Filtro
    const colorFilter = document.getElementById('color-filter');
    const fuelFilter = document.getElementById('fuel-filter');
    const brandFilter = document.getElementById('brand-filter');
    const resetBtn = document.getElementById('reset-filters');
    
    // Toggle de Filtros
    const toggleBtn = document.getElementById('toggle-filters');
    const filtersContainer = document.getElementById('filters-container');

    if (toggleBtn && filtersContainer) {
        toggleBtn.addEventListener('click', () => {
            toggleBtn.classList.toggle('active');
            filtersContainer.classList.toggle('active');
        });
    }

    /**
     * FUNÇÃO PRINCIPAL: Renderizar Produtos com Novo Design
     */
    const renderProducts = () => {
        if (!productsContainer) return;

        const selectedColor = colorFilter ? colorFilter.value : 'all';
        const selectedFuel = fuelFilter ? fuelFilter.value : 'all';
        const selectedBrand = brandFilter ? brandFilter.value : 'all';

        const filteredProducts = productsData.filter(product => {
            const matchColor = selectedColor === 'all' || product.color === selectedColor;
            const matchFuel = selectedFuel === 'all' || (product.fuel || 'gasolina') === selectedFuel;
            const matchBrand = selectedBrand === 'all' || (product.brand || 'shineray') === selectedBrand;
            return matchColor && matchFuel && matchBrand;
        });

        productsContainer.innerHTML = '';

        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `<div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                <i class="fas fa-motorcycle" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
                <p>Nenhuma moto encontrada.</p>
            </div>`;
            return;
        }

        const productsHtml = filteredProducts.map(product => {
            // Prepara os destaques (ícones)
            const highlightsHtml = (product.highlights || [])
                .map(h => `<span><i class="fas ${h.icon}"></i> ${h.text}</span>`)
                .join('');

            return `
                <a href="product-detail.html?modelo=${product.slug}" class="product-link">
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
            `;
        }).join('');

        productsContainer.innerHTML = productsHtml;
    };

    const clearFilters = () => {
        if(colorFilter) colorFilter.value = 'all';
        if(fuelFilter) fuelFilter.value = 'all';
        if(brandFilter) brandFilter.value = 'all';
        renderProducts();
    };

    if (typeof productsData !== 'undefined') renderProducts();

    if(colorFilter) colorFilter.addEventListener('change', renderProducts);
    if(fuelFilter) fuelFilter.addEventListener('change', renderProducts);
    if(brandFilter) brandFilter.addEventListener('change', renderProducts);
    if(resetBtn) resetBtn.addEventListener('click', clearFilters);
});