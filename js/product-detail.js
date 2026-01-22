document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail-container');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (isNaN(productId)) {
        productDetailContainer.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    const product = productsData.find(p => p.id === productId);

    if (!product) {
        productDetailContainer.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    // Update page title
    document.title = `ShineStore - ${product.name}`;

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
        specificationsHtml += `<li><strong>${key}:</strong> ${product.specifications[key]}</li>`;
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
                <div class="specifications">
                    <h2>Especificações</h2>
                    <ul id="product-specs-list">
                        ${specificationsHtml}
                    </ul>
                </div>
                <button class="btn">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;

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
});