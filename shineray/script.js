document.addEventListener('DOMContentLoaded', () => {
    console.log('Shineray - Site do Consultor Shine carregado');
    
    // Configuração dos links
    const linksConfig = {
        whatsapp: {
            id: 'whatsapp-link',
            url: 'https://wa.me/5541998251213',
            message: 'Olá Shine! Gostaria de mais informações sobre os veículos Shineray.'
        },
        catalog: {
            id: 'catalog-link',
            url: 'https://www.shineray.com.br/catalogo'
        },
        address: {
            id: 'address-link',
            url: 'https://maps.app.goo.gl/AUK92fukuokmDext8'
        },
        personal: {
            id: 'personal-link',
            url: 'https://www.instagram.com/shineraycolombo'
        }
    };
    
    // Configurar links com tracking
    Object.values(linksConfig).forEach(link => {
        const element = document.getElementById(link.id);
        if (element) {
            element.href = link.url;
            element.addEventListener('click', (e) => {
                trackClick(link.id);
            });
        }
    });
    
    // WhatsApp com mensagem pré-definida
    const whatsappLink = document.getElementById('whatsapp-link');
    if (whatsappLink) {
        const whatsappUrl = `https://wa.me/5541998251213?text=${encodeURIComponent(linksConfig.whatsapp.message)}`;
        whatsappLink.href = whatsappUrl;
    }
    
    // Animações dos cards
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach((card, index) => {
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
    
    // Efeito de digitação no título
    const title = document.querySelector('h1');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
    }
    
    // Contador de visitas (simplificado)
    let visitCount = localStorage.getItem('shineray_visits') || 0;
    visitCount++;
    localStorage.setItem('shineray_visits', visitCount);
    console.log(`Visitas: ${visitCount}`);
    
    // Atualizar horário de funcionamento
    updateBusinessHours();
    
    // Adicionar efeito de confete no clique do WhatsApp flutuante
    const floatWhatsapp = document.querySelector('.float-whatsapp');
    if (floatWhatsapp) {
        floatWhatsapp.addEventListener('click', (e) => {
            createConfetti();
            trackClick('float-whatsapp');
        });
    }
    
    // Funções auxiliares
    function trackClick(linkName) {
        console.log(`Link clicado: ${linkName}`);
        // Aqui você pode adicionar Google Analytics ou outro tracking
        // gtag('event', 'click', { 'event_category': 'link', 'event_label': linkName });
    }
    
    function updateBusinessHours() {
        const now = new Date();
        const hours = now.getHours();
        const contactItems = document.querySelectorAll('.contact-item');
        
        let statusText = 'Fechado agora';
        let statusColor = '#e53935';
        
        // Verificar se está dentro do horário comercial (8h às 18h, seg-sex)
        const day = now.getDay(); // 0 = domingo, 1 = segunda, ...
        const isWeekday = day >= 1 && day <= 5;
        const isSaturday = day === 6;

        const isBusinessHours = hours >= 9 && hours < 19; // seg–sex
        const isBusinessHoursSaturday = hours >= 9 && hours < 13; // sábado
        
        if (day === 0) {
        statusText = 'Fechado — voltamos amanhã às 9h';
        statusColor = '#e53935';
    }
    else if (isWeekday && isBusinessHours) {
        statusText = 'Aberto agora';
        statusColor = '#4CAF50';
    }
    else if (isSaturday && isBusinessHoursSaturday) {
        statusText = 'Aberto agora';
        statusColor = '#4CAF50';
    }
        
        // Adicionar indicador de status
        const statusElement = document.createElement('div');
        statusElement.className = 'business-status';
        statusElement.innerHTML = `
            <span style="display: inline-block; width: 13px; height: 13px; 
            border-radius: 50%; background: ${statusColor}; margin-right: 8px;"></span>
            ${statusText}
        `;
        
        // Adicionar ao header ou outra área visível
        const header = document.querySelector('header');
        if (header) {
            header.appendChild(statusElement);
        }
    }
    
    function createConfetti() {
        const colors = ['#e53935', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 2px;
                top: 50%;
                left: 50%;
                opacity: 0.8;
                z-index: 10000;
                pointer-events: none;
            `;
            
            document.body.appendChild(confetti);
            
            // Animação
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 3;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;
            
            let posX = 50;
            let posY = 50;
            
            function animate() {
                posX += x;
                posY += y;
                confetti.style.left = `${posX}%`;
                confetti.style.top = `${posY}%`;
                confetti.style.opacity = parseFloat(confetti.style.opacity) - 0.02;
                
                if (parseFloat(confetti.style.opacity) > 0) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            }
            
            requestAnimationFrame(animate);
        }
    }
    
    // Adicionar classe de carregamento concluído
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});