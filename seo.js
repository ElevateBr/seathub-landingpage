// SEO Configuration - SeatHub
// Arquivo centralizado para configurações de SEO e dados estruturados

// Configurações de SEO por idioma
const seoConfig = {
    'pt-br': {
        organization: {
            name: "SeatHub",
            description: "Plataforma inteligente para anunciar espaços de coworking e maximizar receitas. Conecte proprietários de espaços com milhares de profissionais qualificados.",
            url: "https://user.seathub.net",
            logo: "https://user.seathub.net/images/seathubLogo01.png",
            sameAs: ["https://seathub.net"],
            contactPoint: {
                contactType: "customer service",
                availableLanguage: ["Portuguese", "English", "Spanish"]
            },
            offers: {
                description: "Anuncie seu espaço de coworking e maximize sua receita",
                category: "Coworking Space Management",
                price: "0",
                priceCurrency: "BRL"
            },
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android"
        }
    },
    'en': {
        organization: {
            name: "SeatHub",
            description: "Intelligent platform to list coworking spaces and maximize revenue. Connect space owners with thousands of qualified professionals.",
            url: "https://user.seathub.net",
            logo: "https://user.seathub.net/images/seathubLogo01.png",
            sameAs: ["https://seathub.net"],
            contactPoint: {
                contactType: "customer service",
                availableLanguage: ["Portuguese", "English", "Spanish"]
            },
            offers: {
                description: "List your coworking space and maximize your revenue",
                category: "Coworking Space Management",
                price: "0",
                priceCurrency: "USD"
            },
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android"
        }
    },
    'es': {
        organization: {
            name: "SeatHub",
            description: "Plataforma inteligente para anunciar espacios de coworking y maximizar ingresos. Conecta propietarios de espacios con miles de profesionales cualificados.",
            url: "https://user.seathub.net",
            logo: "https://user.seathub.net/images/seathubLogo01.png",
            sameAs: ["https://seathub.net"],
            contactPoint: {
                contactType: "customer service",
                availableLanguage: ["Portuguese", "English", "Spanish"]
            },
            offers: {
                description: "Anuncia tu espacio de coworking y maximiza tus ingresos",
                category: "Coworking Space Management",
                price: "0",
                priceCurrency: "EUR"
            },
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android"
        }
    }
};

// Função para detectar o idioma da página
function detectLanguage() {
    const htmlLang = document.documentElement.lang;
    
    if (htmlLang === 'pt-BR' || htmlLang === 'pt') return 'pt-br';
    if (htmlLang === 'en') return 'en';
    if (htmlLang === 'es') return 'es';
    
    // Fallback para português
    return 'pt-br';
}

// Função para gerar JSON-LD
function generateJsonLd() {
    const language = detectLanguage();
    const config = seoConfig[language];
    
    if (!config) {
        console.warn('Configuração de SEO não encontrada para o idioma:', language);
        return null;
    }
    
    // Gera Schema específico para SoftwareApplication
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": config.organization.name,
        "description": config.organization.description,
        "url": config.organization.url,
        "applicationCategory": config.organization.applicationCategory,
        "operatingSystem": config.organization.operatingSystem,
        "offers": {
            "@type": "Offer",
            "price": config.organization.offers.price,
            "priceCurrency": config.organization.offers.priceCurrency,
            "description": config.organization.offers.description
        },
        "provider": {
            "@type": "Organization",
            "name": config.organization.name,
            "url": config.organization.url,
            "logo": config.organization.logo,
            "sameAs": config.organization.sameAs,
            "contactPoint": config.organization.contactPoint
        },
        "featureList": getFeatureList(language)
    };
}

// Função para obter lista de recursos por idioma
function getFeatureList(language) {
    const features = {
        'pt-br': [
            "Gestão de reservas em tempo real",
            "Dashboard completo com analytics",
            "App mobile para iOS e Android",
            "Pagamentos automáticos e seguros",
            "Marketing automático para espaços",
            "Suporte humanizado 24/7"
        ],
        'en': [
            "Real-time booking management",
            "Complete dashboard with analytics",
            "Mobile app for iOS and Android",
            "Automatic and secure payments",
            "Automatic marketing for spaces",
            "Humanized support 24/7"
        ],
        'es': [
            "Gestión de reservas en tiempo real",
            "Dashboard completo con analytics",
            "App móvil para iOS y Android",
            "Pagos automáticos y seguros",
            "Marketing automático para espacios",
            "Soporte humanizado 24/7"
        ]
    };
    
    return features[language] || features['pt-br'];
}

// Função para inserir JSON-LD no head
function insertJsonLd() {
    // Remove JSON-LD existente se houver
    const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
    if (existingJsonLd) {
        existingJsonLd.remove();
    }
    
    // Gera novo JSON-LD
    const jsonLd = generateJsonLd();
    
    if (jsonLd) {
        // Cria novo script
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLd, null, 2);
        
        // Insere no head
        document.head.appendChild(script);
        
        console.log('JSON-LD inserido com sucesso para o idioma:', detectLanguage());
    }
}

// Função para inicializar SEO
function initSEO() {
    // Aguarda o DOM estar carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertJsonLd);
    } else {
        insertJsonLd();
    }
}

// Inicializa automaticamente
initAdvancedSEO();

// Função para rastrear eventos de conversão
function trackConversion(eventName, eventData = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'conversion',
            event_label: 'seathub',
            ...eventData
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    console.log('Conversion tracked:', eventName, eventData);
}

// Função para otimizar imagens (lazy loading)
function optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Função para melhorar performance
function optimizePerformance() {
    // Preload recursos críticos
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Função para adicionar breadcrumbs
function addBreadcrumbs() {
    const breadcrumbs = {
        'pt-br': [
            { name: "Início", url: "https://user.seathub.net/" },
            { name: "Anunciar Espaço", url: "https://user.seathub.net/#space-types" }
        ],
        'en': [
            { name: "Home", url: "https://user.seathub.net/en/" },
            { name: "List Space", url: "https://user.seathub.net/en/#space-types" }
        ],
        'es': [
            { name: "Inicio", url: "https://user.seathub.net/es/" },
            { name: "Anunciar Espacio", url: "https://user.seathub.net/es/#space-types" }
        ]
    };
    
    const language = detectLanguage();
    const breadcrumbData = breadcrumbs[language] || breadcrumbs['pt-br'];
    
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbData.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);
}

// Função para inicializar SEO melhorado
function initAdvancedSEO() {
    initSEO();
    optimizeImages();
    optimizePerformance();
    addBreadcrumbs();
    
    // Rastrear cliques em CTAs
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn-primary, .cta-primary')) {
            trackConversion('cta_click', {
                button_text: e.target.textContent.trim(),
                button_location: e.target.closest('section')?.id || 'unknown'
            });
        }
    });
}

// Exporta funções para uso global
window.SEO = {
    init: initAdvancedSEO,
    generateJsonLd: generateJsonLd,
    detectLanguage: detectLanguage,
    trackConversion: trackConversion,
    optimizeImages: optimizeImages,
    optimizePerformance: optimizePerformance,
    addBreadcrumbs: addBreadcrumbs
};
