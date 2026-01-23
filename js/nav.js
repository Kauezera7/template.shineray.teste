// main.js for ShineStore

document.addEventListener('DOMContentLoaded', () => {

    console.log('ShineStore JavaScript loaded successfully!');

    // --- Hamburger Menu Functionality ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('nav-open');
    });



    // --- Navigation Link Handling (Smooth Scroll & Page Navigation) ---
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');

            // Check if it's an on-page anchor link
            if (href.startsWith('#') || (href.includes('index.html#') && window.location.pathname.endsWith('index.html'))) {
                event.preventDefault(); // Prevent default only for smooth scroll

                const targetId = href.substring(href.indexOf('#'));
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // If mobile nav is open, close it before scrolling
                    if (navLinks.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                        body.classList.remove('nav-open');
                        // Wait a moment for the menu to close before scrolling
                        setTimeout(() => {
                            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 300); // 300ms matches the CSS transition
                    } else {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
            // For external links (like catalog.html) or anchors on other pages,
            // the default browser action will proceed, navigating to the page.
            // We also make sure to close the nav if it's open.
            else if (navLinks.classList.contains('active')) {
                 hamburger.classList.remove('active');
                 navLinks.classList.remove('active');
                 body.classList.remove('nav-open');
            }
        });
    });

    // --- Carousel Functionality ---
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        let autoPlayInterval;

        const updateCarousel = () => {
            const cardWidth = track.querySelector('.product-link').offsetWidth + 20; // 20 is gap
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        };

        const nextSlide = () => {
            const visibleCards = Math.floor(track.parentElement.offsetWidth / (track.querySelector('.product-link').offsetWidth));
            const totalCards = track.querySelectorAll('.product-link').length;
            
            if (currentIndex < totalCards - visibleCards) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateCarousel();
        };

        const prevSlide = () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const visibleCards = Math.floor(track.parentElement.offsetWidth / (track.querySelector('.product-link').offsetWidth));
                const totalCards = track.querySelectorAll('.product-link').length;
                currentIndex = totalCards - visibleCards; // Loop to end
            }
            updateCarousel();
        };

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 5000); // Mudar a cada 5 segundos
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

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

        // Pausar quando o mouse estiver sobre o carrossel
        const container = document.querySelector('.carousel-container');
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);

        // Iniciar auto-play
        startAutoPlay();

        // Handle window resize to keep carousel aligned
        window.addEventListener('resize', updateCarousel);
    }

    // --- Hero Slider Logic ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroPrevBtn = document.querySelector('.hero-btn.prev');
    const heroNextBtn = document.querySelector('.hero-btn.next');

    if (heroSlides.length > 0) {
        let currentHeroIndex = 0;
        const heroIntervalTime = 6000; // 6 seconds
        let heroInterval;

        const showHeroSlide = (index) => {
            // Remove active class from all slides
            heroSlides.forEach(slide => slide.classList.remove('active'));
            // Add active class to current slide
            heroSlides[index].classList.add('active');
        };

        const nextHeroSlide = () => {
            currentHeroIndex++;
            if (currentHeroIndex >= heroSlides.length) {
                currentHeroIndex = 0;
            }
            showHeroSlide(currentHeroIndex);
        };

        const prevHeroSlide = () => {
            currentHeroIndex--;
            if (currentHeroIndex < 0) {
                currentHeroIndex = heroSlides.length - 1;
            }
            showHeroSlide(currentHeroIndex);
        };

        // Auto Play
        const startHeroAutoPlay = () => {
            heroInterval = setInterval(nextHeroSlide, heroIntervalTime);
        };

        const stopHeroAutoPlay = () => {
            clearInterval(heroInterval);
        };

        // Event Listeners
        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', () => {
                nextHeroSlide();
                stopHeroAutoPlay();
                startHeroAutoPlay();
            });
        }

        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', () => {
                prevHeroSlide();
                stopHeroAutoPlay();
                startHeroAutoPlay();
            });
        }

        // Start Auto Play on load
        startHeroAutoPlay();
    }
});

