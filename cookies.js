// ===== SISTEMA DE COOKIES E PRIVACIDADE =====

class CookieManager {
    constructor() {
        this.cookieName = 'dr_charles_cookie_preferences';
        this.cookieDuration = 365; // dias
        this.init();
    }

    init() {
        // Verificar se já existe preferência salva
        const savedPreferences = this.getCookiePreferences();
        
        if (!savedPreferences) {
            // Mostrar banner se não há preferências salvas
            this.showCookieBanner();
        } else {
            // Aplicar preferências salvas
            this.applyPreferences(savedPreferences);
        }

        this.bindEvents();
    }

    bindEvents() {
        // Eventos do banner
        const acceptBtn = document.getElementById('cookie-accept');
        const rejectBtn = document.getElementById('cookie-reject');
        const settingsBtn = document.getElementById('cookie-settings');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAllCookies());
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => this.rejectAllCookies());
        }

        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showPrivacyModal());
        }

        // Eventos do modal
        const closeModal = document.getElementById('close-privacy-modal');
        const savePreferences = document.getElementById('save-preferences');
        const privacyModal = document.getElementById('privacy-modal');

        if (closeModal) {
            closeModal.addEventListener('click', () => this.hidePrivacyModal());
        }

        if (savePreferences) {
            savePreferences.addEventListener('click', () => this.saveCustomPreferences());
        }

        if (privacyModal) {
            privacyModal.addEventListener('click', (e) => {
                if (e.target === privacyModal) {
                    this.hidePrivacyModal();
                }
            });
        }
    }

    showCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000); // Mostrar após 1 segundo
        }
    }

    hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
        }
    }

    showPrivacyModal() {
        const modal = document.getElementById('privacy-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Carregar preferências atuais
            this.loadCurrentPreferences();
        }
    }

    hidePrivacyModal() {
        const modal = document.getElementById('privacy-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    acceptAllCookies() {
        const preferences = {
            essential: true,
            performance: true,
            marketing: true,
            timestamp: new Date().getTime()
        };

        this.savePreferences(preferences);
        this.applyPreferences(preferences);
        this.hideCookieBanner();
        this.showNotification('Todas as preferências de cookies foram aceitas!', 'success');
    }

    rejectAllCookies() {
        const preferences = {
            essential: true, // Sempre necessário
            performance: false,
            marketing: false,
            timestamp: new Date().getTime()
        };

        this.savePreferences(preferences);
        this.applyPreferences(preferences);
        this.hideCookieBanner();
        this.showNotification('Apenas cookies essenciais foram aceitos.', 'info');
    }

    saveCustomPreferences() {
        const preferences = {
            essential: true, // Sempre true
            performance: document.getElementById('performance-cookies').checked,
            marketing: document.getElementById('marketing-cookies').checked,
            timestamp: new Date().getTime()
        };

        this.savePreferences(preferences);
        this.applyPreferences(preferences);
        this.hidePrivacyModal();
        this.hideCookieBanner();
        this.showNotification('Suas preferências foram salvas!', 'success');
    }

    loadCurrentPreferences() {
        const preferences = this.getCookiePreferences();
        
        if (preferences) {
            document.getElementById('performance-cookies').checked = preferences.performance;
            document.getElementById('marketing-cookies').checked = preferences.marketing;
        }
    }

    savePreferences(preferences) {
        const cookieValue = JSON.stringify(preferences);
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (this.cookieDuration * 24 * 60 * 60 * 1000));
        
        document.cookie = `${this.cookieName}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    }

    getCookiePreferences() {
        const name = this.cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                try {
                    return JSON.parse(cookie.substring(name.length, cookie.length));
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    }

    applyPreferences(preferences) {
        // Aplicar configurações de cookies baseadas nas preferências
        
        if (preferences.performance) {
            this.enablePerformanceCookies();
        } else {
            this.disablePerformanceCookies();
        }

        if (preferences.marketing) {
            this.enableMarketingCookies();
        } else {
            this.disableMarketingCookies();
        }

        // Sempre habilitar cookies essenciais
        this.enableEssentialCookies();
    }

    enableEssentialCookies() {
        // Cookies necessários para funcionamento básico
        console.log('Cookies essenciais habilitados');
        
        // Exemplo: Salvar preferências de idioma, tema, etc.
        // localStorage.setItem('site_language', 'pt-BR');
    }

    enablePerformanceCookies() {
        console.log('Cookies de performance habilitados');
        
        // Exemplo: Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('consent', 'update', {
        //         'analytics_storage': 'granted'
        //     });
        // }
    }

    disablePerformanceCookies() {
        console.log('Cookies de performance desabilitados');
        
        // Exemplo: Desabilitar Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('consent', 'update', {
        //         'analytics_storage': 'denied'
        //     });
        // }
    }

    enableMarketingCookies() {
        console.log('Cookies de marketing habilitados');
        
        // Exemplo: Facebook Pixel, Google Ads
        // if (typeof gtag !== 'undefined') {
        //     gtag('consent', 'update', {
        //         'ad_storage': 'granted'
        //     });
        // }
    }

    disableMarketingCookies() {
        console.log('Cookies de marketing desabilitados');
        
        // Exemplo: Desabilitar Facebook Pixel, Google Ads
        // if (typeof gtag !== 'undefined') {
        //     gtag('consent', 'update', {
        //         'ad_storage': 'denied'
        //     });
        // }
    }

    showNotification(message, type = 'info') {
        // Criar notificação temporária
        const notification = document.createElement('div');
        notification.className = `cookie-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Adicionar estilos inline para a notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10002;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Mostrar notificação
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Evento para fechar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });

        // Auto-remover após 5 segundos
        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Método público para resetar preferências (útil para desenvolvimento)
    resetPreferences() {
        document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        location.reload();
    }
}

// Inicializar o gerenciador de cookies quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    window.cookieManager = new CookieManager();
});

// Expor método para resetar (apenas para desenvolvimento)
// Para usar: cookieManager.resetPreferences() no console do navegador
window.resetCookiePreferences = function() {
    if (window.cookieManager) {
        window.cookieManager.resetPreferences();
    }
};