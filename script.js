// Smooth scrolling para links de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação das imagens da galeria do hero
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-in');
    });

    // Efeito de parallax sutil no scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-gallery, .pricing-card, .time-card');
        
        parallaxElements.forEach(element => {
            const speed = 0.2;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animação das cards no scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar todas as cards e linhas do ranking
    const allCards = document.querySelectorAll('.pricing-card, .time-card, .schedule-card, .info-card, .ranking-row');
    allCards.forEach(card => {
        observer.observe(card);
    });

    // Efeito hover nos botões
    const buttons = document.querySelectorAll('.btn-hero');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Navegação mobile responsiva
    const nav = document.querySelector('.nav');
    let isNavExpanded = false;

    // Adicionar botão de menu mobile se necessário
    if (window.innerWidth <= 768) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #1F2937;
        `;
        
        nav.insertBefore(mobileMenuBtn, nav.firstChild);
        
        mobileMenuBtn.addEventListener('click', function() {
            isNavExpanded = !isNavExpanded;
            const navLeft = document.querySelector('.nav-left');
            const navRight = document.querySelector('.nav-right');
            
            if (isNavExpanded) {
                navLeft.style.display = 'flex';
                navRight.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.gap = '1rem';
            } else {
                navLeft.style.display = 'none';
                navRight.style.display = 'none';
                nav.style.flexDirection = 'row';
                nav.style.gap = '0';
            }
        });
        
        // Esconder navegação por padrão em mobile
        const navLeft = document.querySelector('.nav-left');
        const navRight = document.querySelector('.nav-right');
        navLeft.style.display = 'none';
        navRight.style.display = 'none';
    }

    // Contador animado para estatísticas da pista
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Adicionar estatísticas da pista
    const statsSection = document.createElement('section');
    statsSection.className = 'stats';
    statsSection.innerHTML = `
        <div class="stats-content">
        
            <div class="stat-item">
                <h3 class="stat-number">599+</h3>
                <p>Eventos Realizados</p>
            </div>
            <div class="stat-item">
                <h3 class="stat-number">999%</h3>
                <p>Satisfação dos Pilotos</p>
            </div>
        </div>
    `;
    
    // Inserir antes do footer
    const footer = document.querySelector('.footer');
    footer.parentNode.insertBefore(statsSection, footer);

    // Estilos para a seção de estatísticas
    const statsStyles = `
        .stats {
            background-color: #2563EB;
            color: white;
            padding: 4rem 2rem;
            text-align: center;
        }
        
        .stats-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 3rem;
        }
        
        .stat-item h3 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: white;
        }
        
        .stat-item p {
            font-size: 1.1rem;
            color: #D1D5DB;
        }
        
        @media (max-width: 768px) {
            .stats-content {
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
            }
            
            .stat-item h3 {
                font-size: 2.5rem;
            }
        }
        
        @media (max-width: 480px) {
            .stats-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
        }
    `;
    
    // Adicionar estilos ao head
    if (!document.querySelector('#stats-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'stats-styles';
        styleSheet.textContent = statsStyles;
        document.head.appendChild(styleSheet);
    }

    // Animar contadores quando a seção estiver visível
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    stat.textContent = '0';
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);

    // Blood Donation Interactive Features

    // Funcionalidade de busca de horários
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            const time = this.querySelector('.time').textContent;
            const status = this.querySelector('.status').textContent;
            
            if (status === 'Aberto') {
                // Mostrar disponibilidade
                showTimeAvailability(time);
            }
        });
    });

    function showTimeAvailability(time) {
        const availability = document.createElement('div');
        availability.className = 'availability-popup';
        availability.innerHTML = `
            <div class="popup-content">
                <h4>Horário: ${time}</h4>
                <p>✅ Disponível para treino</p>
                <p>👥 Máximo: 32 pilotos</p>
                <p>🕐 Duração: 6 horas</p>
                <p>💳 Pague na hora - sem reserva!</p>
                <button class="btn-close-popup">Entendi</button>
            </div>
        `;

        // Estilos do popup
        const popupStyles = `
            .availability-popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                z-index: 1001;
                max-width: 300px;
                text-align: center;
            }
            
            .popup-content h4 {
                margin-bottom: 1rem;
                color: #1F2937;
            }
            
            .popup-content p {
                margin-bottom: 0.5rem;
                color: #6B7280;
            }
            
            .btn-close-popup {
                background-color: #2563EB;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 500;
                cursor: pointer;
                margin-top: 1rem;
                transition: background-color 0.3s ease;
            }
            
            .btn-close-popup:hover {
                background-color: #1D4ED8;
            }
        `;

        // Adicionar estilos ao head
        if (!document.querySelector('#popup-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'popup-styles';
            styleSheet.textContent = popupStyles;
            document.head.appendChild(styleSheet);
        }

        // Adicionar popup ao body
        document.body.appendChild(availability);

        // Fechar popup após 8 segundos
        setTimeout(() => {
            if (document.body.contains(availability)) {
                document.body.removeChild(availability);
            }
        }, 8000);

        // Fechar ao clicar no botão
        const closeBtn = availability.querySelector('.btn-close-popup');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(availability);
        });

        // Fechar ao clicar fora
        availability.addEventListener('click', (e) => {
            if (e.target === availability) {
                document.body.removeChild(availability);
            }
        });
    }

    // Funcionalidade de ranking - destacar top 3
    const rankingRows = document.querySelectorAll('.ranking-row');
    
    // Adicionar efeito de clique nas linhas do ranking
    rankingRows.forEach(row => {
        row.addEventListener('click', function() {
            const pilotName = this.querySelector('.pilot-col span').textContent;
            const time = this.querySelector('.time-col').textContent;
            const position = this.querySelector('.rank-col').textContent;
            
            showPilotDetails(pilotName, time, position);
        });
    });

    function showPilotDetails(pilotName, time, position) {
        const details = document.createElement('div');
        details.className = 'pilot-details-popup';
        details.innerHTML = `
            <div class="popup-content">
                <h4>${pilotName}</h4>
                <p><strong>Posição:</strong> ${position}</p>
                <p><strong>Melhor Tempo:</strong> ${time}</p>
                <p><strong>Status:</strong> Ativo</p>
                <p><strong>Última Atualização:</strong> Dezembro 2024</p>
                <button class="btn-close-details">Fechar</button>
            </div>
        `;

        // Estilos do popup de detalhes
        const detailsStyles = `
            .pilot-details-popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                z-index: 1001;
                max-width: 300px;
                text-align: center;
            }
            
            .popup-content h4 {
                margin-bottom: 1rem;
                color: #1F2937;
                font-size: 1.3rem;
            }
            
            .popup-content p {
                margin-bottom: 0.5rem;
                color: #6B7280;
            }
            
            .btn-close-details {
                background-color: #2563EB;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 500;
                cursor: pointer;
                margin-top: 1rem;
                transition: background-color 0.3s ease;
            }
            
            .btn-close-details:hover {
                background-color: #1D4ED8;
            }
        `;

        // Adicionar estilos ao head
        if (!document.querySelector('#details-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'details-styles';
            styleSheet.textContent = detailsStyles;
            document.head.appendChild(styleSheet);
        }

        // Adicionar popup ao body
        document.body.appendChild(details);

        // Fechar popup
        const closeBtn = details.querySelector('.btn-close-details');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(details);
        });

        // Fechar ao clicar fora
        details.addEventListener('click', (e) => {
            if (e.target === details) {
                document.body.removeChild(details);
            }
        });
    }
});


// Adicionar classes CSS para animações
const additionalStyles = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .gallery-item.animate-in {
        animation: slideInFromBottom 0.6s ease-out forwards;
    }
    
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(50px) rotate(-5deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotate(-5deg);
        }
    }
    
    .gallery-item:nth-child(even).animate-in {
        animation: slideInFromBottomEven 0.6s ease-out forwards;
    }
    
    @keyframes slideInFromBottomEven {
        from {
            opacity: 0;
            transform: translateY(50px) rotate(5deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotate(5deg);
        }
    }
    
    .pricing-card.animate-in {
        animation: slideInFromLeft 0.6s ease-out forwards;
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .time-card.animate-in {
        animation: slideInFromRight 0.6s ease-out forwards;
    }
    
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .ranking-row.animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .ranking-row:nth-child(even).animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
        animation-delay: 0.1s;
    }
    
    .ranking-row:nth-child(odd).animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
        animation-delay: 0.2s;
    }
    
    .ranking-row.top-3.animate-in {
        animation: fadeInUpScale 0.8s ease-out forwards;
        animation-delay: 0.3s;
    }
    
    @keyframes fadeInUpScale {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;

// Adicionar estilos de animação
const animationStyles = document.createElement('style');
animationStyles.textContent = additionalStyles;
document.head.appendChild(animationStyles);

// Menu hambúrguer para mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }
});
