document.addEventListener('DOMContentLoaded', () => {

    const colorFilter = document.getElementById('color-filter');
    const productCards = document.querySelectorAll('.products .product-card');

    colorFilter.addEventListener('change', () => {
        const selectedColor = colorFilter.value;

        productCards.forEach(card => {
            const cardColor = card.dataset.color;

            if (selectedColor === 'all' || selectedColor === cardColor) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

