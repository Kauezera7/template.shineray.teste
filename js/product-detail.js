document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail-container');
    
    // Function to extract slug from URL (Query Param OR Hash)
    const getProductSlug = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramSlug = urlParams.get('modelo');
        if (paramSlug) return paramSlug;

        // Try getting from Hash: #/inicio/catalogo/slug-do-produto
        const hash = window.location.hash;
        if (hash && hash.includes('/catalogo/')) {
            const parts = hash.split('/');
            // Assumes format #/inicio/catalogo/slug
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

    // --- Clean URL Logic ---
    // Changes URL to: product-detail.html#/inicio/catalogo/urban-150-efi
    const newHash = `/inicio/catalogo/${product.slug}`;
    if (window.location.hash !== '#' + newHash) {
        // Use replaceState to update URL without reloading and remove query params
        const newUrl = `${window.location.pathname}#${newHash}`;
        window.history.replaceState(null, document.title, newUrl);
    }

    const productId = product.id; // Still needed for related products filtering

    // Update page title
    document.title = `ShineStore - ${product.name}`;

    // Update Breadcrumb Text
    const breadcrumbName = document.getElementById('breadcrumb-product-name');
    if (breadcrumbName) {
        breadcrumbName.textContent = product.name;
    }

    // Combine all images (main + thumbnails) for the slider
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

    // --- Accordion Logic ---
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

    // --- Slider Logic ---
    const track = document.querySelector('.detail-slider-track');
    const slides = document.querySelectorAll('.detail-slide');
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const thumbnails = document.querySelectorAll('.thumbnail-img');
    
    let currentIndex = 0;

    const updateSlider = (index) => {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active thumbnail
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

    // --- Related Products Logic ---
    const relatedContainer = document.getElementById('related-products-container');
    if (relatedContainer && typeof productsData !== 'undefined') {
        // Filter out current product
        const availableProducts = productsData.filter(p => p.id !== productId);
        
        // Shuffle array to get random products each time
        const shuffled = availableProducts.sort(() => 0.5 - Math.random());

        // Take first 3
        const selectedProducts = shuffled.slice(0, 3);

        // Render
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