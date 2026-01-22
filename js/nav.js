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
});

