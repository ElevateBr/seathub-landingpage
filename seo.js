// SEO Configuration - SeatHub
// Arquivo centralizado para configurações de SEO e dados estruturados

// Configurações de SEO por idioma
const seoConfig = {
    'pt-br': {
        organization: {
            name: "SeatHub",
            description: "Plataforma inteligente que revoluciona a forma de encontrar e reservar espaços de coworking, conectando profissionais a ambientes inspiradores.",
            url: "https://user.seathub.net",
            logo: "https://user.seathub.net/images/seathubLogo01.png",
            sameAs: ["https://seathub.net"],
            contactPoint: {
                contactType: "customer service",
                availableLanguage: ["Portuguese", "English", "Spanish"]
            },
            offers: {
                description: "Busca e reserva de espaços de coworking",
                category: "Coworking Spaces"
            }
        }
    },
    'en': {
        organization: {
            name: "SeatHub",
            description: "Intelligent platform that revolutionizes the way to find and book coworking spaces, connecting professionals to inspiring environments.",
            url: "https://user.seathub.net",
            logo: "https://user.seathub.net/images/seathubLogo01.png",
            sameAs: ["https://seathub.net"],
            contactPoint: {
                contactType: "customer service",
                availableLanguage: ["Portuguese", "English", "Spanish"]
            },
            offers: {
                description: "Search and booking of coworking spaces",
                category: "Coworking Spaces"
            }
        }
    },
    'es': {
        organization: {
            name: "SeatHub",
            description: "Plataforma inteligente que revoluciona la forma de encontrar y reservar espacios de coworking, conectando profesionales a ambientes inspiradores.",
            url: "https://user.seathub.net",
            logo: "https://user.seathub.net/images/seathubLogo01.png",
            sameAs: ["https://seathub.net"],
            contactPoint: {
                contactType: "customer service",
                availableLanguage: ["Portuguese", "English", "Spanish"]
            },
            offers: {
                description: "Búsqueda y reserva de espacios de coworking",
                category: "Coworking Spaces"
            }
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
    
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        ...config.organization
    };
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
initSEO();

// Exporta funções para uso global (se necessário)
window.SEO = {
    init: initSEO,
    generateJsonLd: generateJsonLd,
    detectLanguage: detectLanguage
};
