// carousel.js - Gerencia o movimento do carrossel de produtos

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        let autoPlayInterval;

        // Atualiza a posição visual do carrossel
        const updateCarousel = () => {
            const productLinks = track.querySelectorAll('.product-link');
            if (productLinks.length === 0) return;
            
            const cardWidth = productLinks[0].offsetWidth + 20; // 20 é o espaçamento (gap)
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        };

        // Avança para o próximo slide
        const nextSlide = () => {
            const productLinks = track.querySelectorAll('.product-link');
            if (productLinks.length === 0) return;

            const visibleCards = Math.floor(track.parentElement.offsetWidth / productLinks[0].offsetWidth);
            const totalCards = productLinks.length;
            
            if (currentIndex < totalCards - visibleCards) {
                currentIndex++;
            } else {
                currentIndex = 0; // Volta para o início
            }
            updateCarousel();
        };

        // Volta para o slide anterior
        const prevSlide = () => {
            const productLinks = track.querySelectorAll('.product-link');
            if (productLinks.length === 0) return;

            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const visibleCards = Math.floor(track.parentElement.offsetWidth / productLinks[0].offsetWidth);
                const totalCards = productLinks.length;
                currentIndex = Math.max(0, totalCards - visibleCards); // Vai para o final
            }
            updateCarousel();
        };

        // Inicia o movimento automático
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
        };

        // Para o movimento automático
        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        // Eventos dos botões
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay(); // Reinicia o timer ao clicar
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay(); // Reinicia o timer ao clicar
        });

        // Pausa quando o mouse estiver sobre o carrossel
        const container = document.querySelector('.carousel-container');
        if (container) {
            container.addEventListener('mouseenter', stopAutoPlay);
            container.addEventListener('mouseleave', startAutoPlay);
        }

        // Inicia o auto-play e lida com redimensionamento da janela
        startAutoPlay();
        window.addEventListener('resize', updateCarousel);
    }
});