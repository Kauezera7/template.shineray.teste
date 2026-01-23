// product-detail.js - Gerencia a exibição dinâmica dos detalhes do produto

document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail-container');
    
    // Função para extrair o slug (modelo) da URL (Query Param ou Hash)
    const getProductSlug = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramSlug = urlParams.get('modelo');
        if (paramSlug) return paramSlug;

        // Tenta pegar pelo Hash: #/inicio/catalogo/slug-do-produto
        const hash = window.location.hash;
        if (hash && hash.includes('/catalogo/')) {
            const parts = hash.split('/');
            return parts[parts.length - 1];
        }
        return null;
    };

    const productSlug = getProductSlug();

    if (!productSlug) {
        productDetailContainer.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    const product = productsData.find(p => p.slug === productSlug);

    if (!product) {
        productDetailContainer.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    // --- Lógica de URL Limpa ---
    // Altera a URL para: product-detail.html#/inicio/catalogo/urban-150-efi
    const newHash = `/inicio/catalogo/${product.slug}`;
    if (window.location.hash !== '#' + newHash) {
        // Usa replaceState para atualizar a URL sem recarregar e remover query params
        const newUrl = `${window.location.pathname}#${newHash}`;
        window.history.replaceState(null, document.title, newUrl);
    }

    const productId = product.id; // Necessário para filtrar produtos relacionados

    // Atualiza o título da página e meta tags para SEO
    document.title = `ShineStore - ${product.name}`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', `Conheça a ${product.name}. Preço: ${product.price}. Veja a ficha técnica completa e fale com um consultor.`);
    }

    // Tags Open Graph (Redes Sociais)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');

    if (ogTitle) ogTitle.setAttribute('content', `ShineStore - ${product.name}`);
    if (ogDescription) ogDescription.setAttribute('content', `Confira a ${product.name} por apenas ${product.price}. Aproveite nossas ofertas!`);
    if (ogImage) ogImage.setAttribute('content', window.location.origin + '/' + product.mainImage);

    // Atualiza o texto do Breadcrumb (Caminho de navegação)
    const breadcrumbName = document.getElementById('breadcrumb-product-name');
    if (breadcrumbName) {
        breadcrumbName.textContent = product.name;
    }

    // Combina todas as imagens para o slider
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

    let specificationsHtml = '';
    for (const key in product.specifications) {
        specificationsHtml += `<li><strong>${key}:</strong> <span>${product.specifications[key]}</span></li>`;
    }

    // Renderiza o HTML principal
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

    // --- Lógica do Acordeão (Ficha Técnica) ---
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

    // --- Lógica do Slider de Imagens ---
    const track = document.querySelector('.detail-slider-track');
    const slides = document.querySelectorAll('.detail-slide');
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const thumbnails = document.querySelectorAll('.thumbnail-img');
    
    let currentIndex = 0;

    const updateSlider = (index) => {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualiza a miniatura ativa
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

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = parseInt(thumb.dataset.index);
            updateSlider(index);
        });
    });

    // --- Lógica de Produtos Relacionados ---
    const relatedContainer = document.getElementById('related-products-container');
    if (relatedContainer && typeof productsData !== 'undefined') {
        // Filtra para remover o produto atual da lista
        const availableProducts = productsData.filter(p => p.id !== productId);
        
        // Embaralha o array para pegar produtos aleatórios a cada vez
        const shuffled = availableProducts.sort(() => 0.5 - Math.random());

        // Pega os 3 primeiros
        const selectedProducts = shuffled.slice(0, 3);

        // Renderiza os produtos relacionados
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
