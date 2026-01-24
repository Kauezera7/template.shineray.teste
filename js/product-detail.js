// product-detail.js - Gerencia a exibição dinâmica dos detalhes do produto

document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail-container');
    
    /**
     * FUNÇÃO: Identificar qual moto mostrar
     * Ela olha para a barra de endereço e procura por '?modelo=nome-da-moto'
     */
    const getProductSlug = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramSlug = urlParams.get('modelo');
        if (paramSlug) return paramSlug;

        // Alternativa: Se usar links com # (ex: #/inicio/catalogo/urban-150-efi)
        const hash = window.location.hash;
        if (hash && hash.includes('/catalogo/')) {
            const parts = hash.split('/');
            return parts[parts.length - 1];
        }
        return null;
    };

    const productSlug = getProductSlug();

    // Se não encontrar o nome da moto na URL, avisa o usuário
    if (!productSlug) {
        productDetailContainer.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    // Busca os dados da moto dentro do arquivo js/products-data.js
    const product = productsData.find(p => p.slug === productSlug);

    if (!product) {
        productDetailContainer.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    /**
     * SEO E URL LIMPA
     * Melhora como o Google vê o site e como o link aparece na barra de endereço
     */
    const newHash = `/inicio/catalogo/${product.slug}`;
    if (window.location.hash !== '#' + newHash) {
        const newUrl = `${window.location.pathname}#${newHash}`;
        window.history.replaceState(null, document.title, newUrl);
    }

    const productId = product.id; 

    // Atualiza o título da aba do navegador e as metatags para redes sociais
    document.title = `Shineray - ${product.name}`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', `Conheça a ${product.name}. Preço: ${product.price}. Veja a ficha técnica completa e fale com um consultor.`);
    }

    // --- MONTAGEM DO HTML DINÂMICO ---

    // 1. Prepara a Galeria de Fotos
    const allImages = [product.mainImage, ...product.thumbnails.filter(t => t !== product.mainImage)];
    
    let slidesHtml = '';
    let thumbsHtml = '';

    allImages.forEach((img, index) => {
        slidesHtml += `
            <div class="detail-slide">
                <img src="${img}" alt="${product.name} - Vista ${index + 1}">
            </div>
        `;
        thumbsHtml += `
            <img src="${img}" alt="Thumbnail ${index + 1}" class="thumbnail-img ${index === 0 ? 'active' : ''}" data-index="${index}">
        `;
    });

    // 2. Prepara a Ficha Técnica
    let specificationsHtml = '';
    for (const key in product.specifications) {
        specificationsHtml += `<li><strong>${key}:</strong> <span>${product.specifications[key]}</span></li>`;
    }

    // 3. Injeta tudo no container principal da página
    productDetailContainer.innerHTML = `
        <div class="product-detail-layout">
            <div class="product-images">
                <div class="detail-slider-container">
                    <div class="detail-slider-track">
                        ${slidesHtml}
                    </div>
                    <button class="slider-btn prev">&lt;</button>
                    <button class="slider-btn next">&gt;</button>
                </div>
                <div class="thumbnail-gallery">
                    ${thumbsHtml}
                </div>
            </div>
            <div class="product-info">
                <h1 id="product-name">${product.name}</h1>
                <p class="price" id="product-price">${product.price}</p>
                <a href="https://wa.me/5500000000000" class="btn btn-contact" target="_blank">Falar com um Vendedor</a>
                
                <div class="specifications accordion">
                    <div class="accordion-header">
                        <h2>Ficha Técnica</h2>
                        <span class="accordion-icon">+</span>
                    </div>
                    <div class="accordion-content">
                        <ul id="product-specs-list">
                            ${specificationsHtml}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    `;

    // --- LÓGICA DO ACORDEÃO (ABRIR/FECHAR FICHA TÉCNICA) ---
    const accordion = productDetailContainer.querySelector('.accordion');
    const accordionHeader = productDetailContainer.querySelector('.accordion-header');
    
    if (accordion && accordionHeader) {
        accordionHeader.addEventListener('click', () => {
            accordion.classList.toggle('active');
            const content = accordion.querySelector('.accordion-content');
            if (accordion.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    }

    // --- LÓGICA DO SLIDER DE IMAGENS (PASSAR FOTOS) ---
    const track = document.querySelector('.detail-slider-track');
    const slides = document.querySelectorAll('.detail-slide');
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const thumbnails = document.querySelectorAll('.thumbnail-img');
    
    let currentIndex = 0;

    const updateSlider = (index) => {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnails[currentIndex].classList.add('active');
    };

    nextBtn.addEventListener('click', () => {
        let index = (currentIndex + 1) % slides.length;
        updateSlider(index);
    });

    prevBtn.addEventListener('click', () => {
        let index = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider(index);
    });

    // Clique nas miniaturas
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = parseInt(thumb.dataset.index);
            updateSlider(index);
        });
    });

    // --- LÓGICA DE PRODUTOS RELACIONADOS ---
    const relatedContainer = document.getElementById('related-products-container');
    if (relatedContainer && typeof productsData !== 'undefined') {
        const availableProducts = productsData.filter(p => p.id !== productId);
        const shuffled = availableProducts.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 3);

        selectedProducts.forEach(p => {
             const productHtml = `
                <a href="product-detail.html?modelo=${p.slug}" class="product-link">
                    <div class="product-card">
                        <img src="${p.mainImage}" alt="${p.name}">
                        <h3>${p.name}</h3>
                        <p class="price">${p.price}</p>
                    </div>
                </a>
            `;
            relatedContainer.innerHTML += productHtml;
        });
    }
});
