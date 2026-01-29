document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products');
    
    // Configuração dos Dropdowns
    const filters = {
        color: {
            id: 'color-dropdown',
            selected: 'all',
            options: ['all', 'preto', 'vermelho', 'branco', 'azul', 'cinza', 'laranja'],
            labelDefault: 'Todas as cores'
        },
        fuel: {
            id: 'fuel-dropdown',
            selected: 'all',
            options: ['all', 'gasolina', 'eletrica'],
            labelDefault: 'Todos'
        },
        brand: {
            id: 'brand-dropdown',
            selected: 'all',
            options: ['all', 'shineray', 'sbm'],
            labelDefault: 'Todas as marcas'
        }
    };

    const toggleBtn = document.getElementById('toggle-filters');
    const filtersContainer = document.getElementById('filters-container');
    const resetBtn = document.getElementById('reset-filters');

    /**
     * INICIALIZA OS DROPDOWNS
     */
    const initDropdowns = () => {
        Object.keys(filters).forEach(key => {
            const config = filters[key];
            const wrapper = document.getElementById(config.id);
            if (!wrapper) return;

            const trigger = wrapper.querySelector('.custom-select-trigger');
            const optionsContainer = wrapper.querySelector('.custom-options');

            // Click para abrir/fechar
            trigger.addEventListener('click', (e) => {
                // Fecha outros dropdowns abertos
                document.querySelectorAll('.custom-select-wrapper').forEach(w => {
                    if (w !== wrapper) w.classList.remove('open');
                });
                wrapper.classList.toggle('open');
                e.stopPropagation();
            });

            renderOptions(key);
        });
    };

    /**
     * RENDERIZA AS OPÇÕES DE CADA DROPDOWN COM CONTAGEM
     */
    const renderOptions = (key) => {
        const config = filters[key];
        const wrapper = document.getElementById(config.id);
        const optionsContainer = wrapper.querySelector('.custom-options');

        // Contagem
        const counts = { all: productsData.length };
        productsData.forEach(p => {
            let val;
            if (key === 'color') {
                val = p.colors || [p.color] || [];
            } else {
                val = [p[key] || (key === 'fuel' ? 'gasolina' : 'shineray')];
            }
            
            const values = Array.isArray(val) ? val : [val];
            values.forEach(v => {
                counts[v] = (counts[v] || 0) + 1;
            });
        });

        optionsContainer.innerHTML = config.options.map(opt => {
            let label = opt === 'all' ? config.labelDefault : opt.charAt(0).toUpperCase() + opt.slice(1);
            const count = counts[opt] || 0;
            
            // Adiciona ícone apenas para cor
            const dotHtml = key === 'color' ? `<div class="color-dot ${opt}"></div>` : '';
            
            return `
                <div class="custom-option" data-value="${opt}">
                    ${dotHtml}
                    <span>${label}</span>
                    <span class="count">(${count})</span>
                </div>
            `;
        }).join('');

        // Evento de Seleção
        optionsContainer.querySelectorAll('.custom-option').forEach(option => {
            option.addEventListener('click', function() {
                config.selected = this.dataset.value;
                
                // Atualiza o gatilho (trigger)
                const trigger = wrapper.querySelector('.custom-select-trigger');
                const labelText = this.querySelector('span').textContent;
                trigger.querySelector('span').textContent = labelText;
                
                if (key === 'color') {
                    trigger.querySelector('.color-dot').className = `color-dot ${config.selected}`;
                }

                wrapper.classList.remove('open');
                renderAllOptions(); // Atualiza contagens de todos
                renderProducts();
            });
        });
    };

    const renderAllOptions = () => {
        Object.keys(filters).forEach(key => renderOptions(key));
    };

    /**
     * RENDERIZA OS PRODUTOS FILTRADOS
     */
    const renderProducts = () => {
        if (!productsContainer) return;

        const filteredProducts = productsData.filter(product => {
            const pColors = product.colors || [product.color] || [];
            const pFuel = product.fuel || 'gasolina';
            const pBrand = product.brand || 'shineray';

            const matchColor = filters.color.selected === 'all' || pColors.includes(filters.color.selected);
            const matchFuel = filters.fuel.selected === 'all' || pFuel === filters.fuel.selected;
            const matchBrand = filters.brand.selected === 'all' || pBrand === filters.brand.selected;

            return matchColor && matchFuel && matchBrand;
        });

        productsContainer.innerHTML = '';

        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `<div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                <i class="fas fa-motorcycle" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
                <p>Nenhuma moto encontrada com esses filtros.</p>
            </div>`;
            return;
        }

        productsContainer.innerHTML = filteredProducts.map((product, index) => {
            const highlightsHtml = (product.highlights || [])
                .map(h => `<span><i class="fas ${h.icon}"></i> ${h.text}</span>`)
                .join('');

            return `
                <a href="product-detail.html?modelo=${product.slug}" class="product-link product-card-animated" style="animation-delay: ${index * 0.1}s">
                    <div class="product-card">
                        <div class="moto-badge">${(product.brand || 'Shineray').toUpperCase()}</div>
                        <img src="${product.mainImage}" alt="${product.name}">
                        <div class="moto-info">
                            <h3>${product.name}</h3>
                            <div class="moto-specs">
                                <span><i class="fas fa-gas-pump"></i> ${(product.fuel || 'gasolina').charAt(0).toUpperCase() + (product.fuel || 'gasolina').slice(1)}</span>
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
    };

    // Global click para fechar dropdowns
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
    });

    // Toggle do container de filtros
    if (toggleBtn && filtersContainer) {
        toggleBtn.addEventListener('click', () => {
            toggleBtn.classList.toggle('active');
            filtersContainer.style.display = (filtersContainer.style.display === 'block') ? 'none' : 'block';
        });
    }

    // Reset de Filtros
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            Object.keys(filters).forEach(key => {
                const config = filters[key];
                config.selected = 'all';
                const wrapper = document.getElementById(config.id);
                const trigger = wrapper.querySelector('.custom-select-trigger');
                trigger.querySelector('span').textContent = config.labelDefault;
                if (key === 'color') trigger.querySelector('.color-dot').className = 'color-dot all';
            });
            renderAllOptions();
            renderProducts();
        });
    }

    if (typeof productsData !== 'undefined') {
        initDropdowns();
        renderProducts();
    }
});
