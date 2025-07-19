// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar cache de DOM
    DOMCache.init();
    
    // Preload de recursos críticos
    preloadCriticalResources();
    
    // Otimizar animações
    optimizeAnimations();
    
    // Elementos do menu mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const navMobile = document.querySelector('.nav-mobile');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    
    // Toggle do menu mobile
    menuMobile.addEventListener('click', function() {
        navMobile.classList.toggle('active');
        overlay.classList.toggle('active');
        menuMobile.querySelector('i').classList.toggle('fa-bars');
        menuMobile.querySelector('i').classList.toggle('fa-times');
        body.classList.toggle('no-scroll');
    });
    
    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', function() {
        navMobile.classList.remove('active');
        overlay.classList.remove('active');
        menuMobile.querySelector('i').classList.add('fa-bars');
        menuMobile.querySelector('i').classList.remove('fa-times');
        body.classList.remove('no-scroll');
    });
    
    // Fechar menu ao clicar em um link
    const mobileLinks = document.querySelectorAll('.nav-mobile a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('active');
            overlay.classList.remove('active');
            menuMobile.querySelector('i').classList.add('fa-bars');
            menuMobile.querySelector('i').classList.remove('fa-times');
            body.classList.remove('no-scroll');
        });
    });
    
    // Depoimentos Slider (versão simples)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
            } else {
                testimonial.style.display = 'none';
            }
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Mudar depoimento a cada 5 segundos se houver mais de um
    if (testimonials.length > 1) {
        showTestimonial(0);
        setInterval(nextTestimonial, 5000);
    }
    
    // Substituir eventos de scroll e resize pelos otimizados
    initOptimizedScroll();
    initOptimizedResize();
    
    // Inicializar lazy loading avançado
    initAdvancedLazyLoading();
    
    // Inicializar service worker
    initServiceWorker();
});

// Adicionar classe para animações quando a página estiver totalmente carregada
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Adicionar classe active aos elementos fade-in que estão visíveis inicialmente
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

// Validação de formulários
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateContactForm();
        });
    }
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateAppointmentForm();
        });
    }
}

function validateContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return false;
    }
    
    // Simular envio (substituir por integração real)
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    document.getElementById('contactForm').reset();
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Inicializar validação
initFormValidation();

// Funcionalidade de busca
function initSearch() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input').value;
            if (query.trim()) {
                // Simular busca (implementar busca real depois)
                alert(`Buscando por: "${query}". Funcionalidade em desenvolvimento.`);
            }
        });
    }
}

// Inicializar busca
initSearch();

// Google Maps Integration
function initGoogleMaps() {
    // Verificar se estamos na página de contato
    if (window.location.pathname.includes('contato.html')) {
        // Adicionar loading state
        const mapContainer = document.querySelector('.google-map');
        if (mapContainer) {
            const iframe = mapContainer.querySelector('iframe');
            
            // Loading indicator
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'map-loading';
            loadingDiv.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Carregando mapa...</p>
            `;
            mapContainer.appendChild(loadingDiv);
            
            // Remove loading when iframe loads
            iframe.addEventListener('load', function() {
                setTimeout(() => {
                    loadingDiv.remove();
                }, 1000);
            });
        }
        
        // Adicionar funcionalidade de fullscreen
        addMapFullscreen();
    }
}

// Funcionalidade de tela cheia para o mapa
function addMapFullscreen() {
    const mapContainer = document.querySelector('.google-map');
    if (mapContainer) {
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'map-fullscreen-btn';
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        fullscreenBtn.title = 'Ver em tela cheia';
        
        fullscreenBtn.addEventListener('click', function() {
            const iframe = mapContainer.querySelector('iframe');
            const mapUrl = iframe.src.replace('embed?', 'embed?output=embed&');
            window.open(mapUrl, '_blank');
        });
        
        mapContainer.appendChild(fullscreenBtn);
    }
}

// Inicializar Google Maps
initGoogleMaps();

// ⚡ **5. Otimizações de Performance**

// **Implementar lazy loading:**

// ⚡ OTIMIZAÇÕES DE PERFORMANCE ⚡

// 1. Função de debounce para otimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 2. Throttle para eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 3. Preload de recursos críticos
function preloadCriticalResources() {
    const criticalImages = [
        'assets/images/Logo.png',
        'assets/images/Dr Charles.jpg',
        'assets/images/Foto Clinica.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// 4. Lazy loading melhorado com placeholder
function initAdvancedLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    // Adicionar placeholder blur effect
    images.forEach(img => {
        if (!img.src) {
            img.style.filter = 'blur(5px)';
            img.style.transition = 'filter 0.3s';
        }
    });
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Criar nova imagem para preload
                    const newImg = new Image();
                    newImg.onload = () => {
                        img.src = img.dataset.src;
                        img.style.filter = 'none';
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                    };
                    newImg.src = img.dataset.src;
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.1
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores antigos
        images.forEach(img => {
            img.src = img.dataset.src;
            img.style.filter = 'none';
        });
    }
}

// 5. Otimização de scroll com throttle
function initOptimizedScroll() {
    const header = document.querySelector('header');
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const optimizedScrollHandler = throttle(() => {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Fade in animations
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }, 16); // ~60fps
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
}

// 6. Otimização de resize com debounce
function initOptimizedResize() {
    const optimizedResizeHandler = debounce(() => {
        // Equalizar altura dos cards
        const cards = document.querySelectorAll('.service-card');
        let maxHeight = 0;
        
        cards.forEach(card => {
            card.style.height = 'auto';
        });
        
        cards.forEach(card => {
            if (card.offsetHeight > maxHeight) {
                maxHeight = card.offsetHeight;
            }
        });
        
        if (window.innerWidth > 768) {
            cards.forEach(card => {
                card.style.height = maxHeight + 'px';
            });
        }
    }, 250);
    
    window.addEventListener('resize', optimizedResizeHandler);
}

// 7. Cache de elementos DOM
const DOMCache = {
    header: null,
    menuMobile: null,
    navMobile: null,
    overlay: null,
    body: null,
    
    init() {
        this.header = document.querySelector('header');
        this.menuMobile = document.querySelector('.menu-mobile');
        this.navMobile = document.querySelector('.nav-mobile');
        this.overlay = document.querySelector('.overlay');
        this.body = document.body;
    }
};

// 8. Minificação de animações CSS via JS
function optimizeAnimations() {
    // Reduzir animações em dispositivos com pouca bateria
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2) {
                document.documentElement.style.setProperty('--animation-duration', '0.1s');
            }
        });
    }
    
    // Reduzir animações se o usuário preferir
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01s');
    }
}

// 9. Service Worker para cache (básico)
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registrado com sucesso:', registration.scope);
                })
                .catch(registrationError => {
                    console.log('Falha no registro do SW:', registrationError);
                });
        });
    }
}

// 10. Compressão de imagens via Canvas (para uploads futuros)
function compressImage(file, quality = 0.8) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob(resolve, 'image/jpeg', quality);
        };
        
        img.src = URL.createObjectURL(file);
    });
}


// Otimização específica para página da equipe
function initTeamPageOptimizations() {
    if (window.location.pathname.includes('equipe.html')) {
        // Escalonar animações dos cards da equipe
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach((card, index) => {
            card.style.setProperty('--delay', index);
        });
        
        // Lazy load otimizado para imagens da equipe
        const teamImages = document.querySelectorAll('.team-image img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const teamImageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const newImg = new Image();
                        
                        newImg.onload = () => {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            img.classList.add('loaded');
                        };
                        
                        newImg.src = img.dataset.src;
                        teamImageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            teamImages.forEach(img => {
                teamImageObserver.observe(img);
            });
        }
    }
}

// Adicionar ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Inicializar otimizações da página da equipe
    initTeamPageOptimizations();
});