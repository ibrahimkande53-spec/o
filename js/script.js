// ===== MOBILE NAVIGATION TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        navbar.style.background = 'rgba(45, 45, 45, 0.98)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        navbar.style.background = 'rgba(45, 45, 45, 0.95)';
    }

    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== ACTIVE NAVIGATION ITEM HIGHLIGHTING =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link) {
        const linkPage = link.getAttribute('href');
        if ((currentPage === 'index.html' || currentPage === '') && linkPage === 'index.html') {
            item.classList.add('active');
        } else if (currentPage === linkPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    }
});

// ===== FADE IN ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .service-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== BUTTON HOVER EFFECTS =====
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== SERVICE CARDS INTERACTIVE EFFECT =====
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== PARALLAX EFFECT FOR HERO SECTION =====
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===== RESPONSIVE IMAGE LOADING =====
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.transition = 'opacity 0.3s ease';
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
    }
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%cLoumou\'s Guinée', 'color: #3498db; font-size: 24px; font-weight: bold;');
console.log('%cSite web professionnel développé avec HTML, CSS et JavaScript', 'color: #95a5a6; font-size: 14px;');

// ===== TABS FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ===== FORMATION BUTTONS FUNCTIONALITY =====
    const formationButtons = document.querySelectorAll('.formation-btn');
    const infoDisplay = document.getElementById('info-display');
    const prestationInfoDisplay = document.getElementById('prestation-info-display');

    // Function to display info
    function displayInfo(button, targetDisplay) {
        const infoKey = button.getAttribute('data-info');
        const info = formationInfo[infoKey];

        if (info && targetDisplay) {
            // Remove active class from all buttons in the same tab
            const currentTab = button.closest('.tab-content');
            if (currentTab) {
                const buttonsInTab = currentTab.querySelectorAll('.formation-btn');
                buttonsInTab.forEach(btn => btn.classList.remove('active'));
            }
            
            // Add active class to clicked button
            button.classList.add('active');

            // Create and display the information
            let infoHTML = '';

            // Check if it's a detailed info format
            if (info.hasDetailedInfo) {
                infoHTML = `
                    <div class="info-content active">
                        <h3>
                            <span class="info-icon">${info.icon}</span>
                            ${info.title}
                        </h3>
                        ${info.description ? `<p class="info-description">${info.description}</p>` : ''}
                        
                        ${info.types ? `
                            <div class="info-section">
                                <h4>🧾 Types de cartes que nous concevons :</h4>
                                <ul>
                                    ${info.types.map(type => `<li>${type}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${info.caracteristiques ? `
                            <div class="info-section">
                                <h4>⚙️ Caractéristiques techniques :</h4>
                                <ul>
                                    ${info.caracteristiques.map(carac => `<li>${carac}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${info.processus ? `
                            <div class="info-section">
                                <h4>🖌️ Processus de création :</h4>
                                <ol class="info-processus">
                                    ${info.processus.map((step, index) => `<li>${step}</li>`).join('')}
                                </ol>
                            </div>
                        ` : ''}
                    </div>
                `;
            } else {
                // Standard format
                infoHTML = `
                    <div class="info-content active">
                        <h3>
                            <span class="info-icon">${info.icon}</span>
                            ${info.title}
                        </h3>
                        <ul>
                            ${info.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            targetDisplay.innerHTML = infoHTML;
        }
    }

    // Information data for each formation
    const formationInfo = {
        initiation: {
            title: 'Initiation en informatique',
            icon: '📚',
            items: [
                'Bases de l\'ordinateur',
                'Système Windows',
                'Organisation des fichiers'
            ]
        },
        bureautique: {
            title: 'Bureautique complète',
            icon: '💼',
            items: [
                'Word',
                'Excel',
                'PowerPoint',
                'Access'
            ]
        },
        internet: {
            title: 'Internet et communication numérique',
            icon: '🌐',
            items: [
                'Navigation',
                'E-mails',
                'Réseaux sociaux',
                'E-commerce'
            ]
        },
        graphisme: {
            title: 'Graphisme et design',
            icon: '🎨',
            items: [
                'Photoshop',
                'Canva',
                'Création de logos et affiches professionnelles'
            ]
        },
        dactylographie: {
            title: 'Dactylographie',
            icon: '⌨️',
            items: [
                'Apprentissage du clavier',
                'Amélioration de la vitesse de frappe'
            ]
        },
        maintenance: {
            title: 'Maintenance informatique',
            icon: '🔧',
            items: [
                'Entretien',
                'Réparation',
                'Configuration des ordinateurs'
            ]
        },
        excel: {
            title: 'Création d\'applications sur Excel',
            icon: '📊',
            items: [
                'Gestion d\'entreprise',
                'Facturation',
                'Stock',
                'Pointage',
                'Et bien plus encore...'
            ]
        },
        'sites-vitrines': {
            title: 'Création de sites vitrines et sites e-commerce',
            icon: '🌐',
            items: [
                'Création de sites vitrines (toutes vos activités)',
                'Création de sites e-commerce',
                'Design moderne et responsive',
                'Solutions complètes sur mesure'
            ]
        },
        'conception-logos': {
            title: 'Conception de logos et affiches',
            icon: '🎨',
            items: [
                'Conception de logos professionnels',
                'Création d\'affiches',
                'Cartes en PVC',
                'Cartes de visite'
            ]
        },
        'impression-diplomes': {
            title: 'Impression de diplômes et documents',
            icon: '📄',
            items: [
                'Impression de diplômes',
                'Attestations',
                'Documents administratifs',
                'Traitement de qualité professionnelle'
            ]
        },
        'logiciels-sur-mesure': {
            title: 'Développement de logiciels sur mesure',
            icon: '💻',
            items: [
                'Logiciels sur Excel',
                'Logiciels sur Access',
                'Solutions personnalisées',
                'Développement adapté à vos besoins'
            ]
        },
        'presentations-powerpoint': {
            title: 'Création de présentations PowerPoint',
            icon: '📊',
            items: [
                'Présentations PowerPoint professionnelles',
                'Design moderne et attractif',
                'Animations et transitions',
                'Personnalisation complète'
            ]
        },
        'assistance-depannage': {
            title: 'Assistance informatique et dépannage',
            icon: '🛠️',
            items: [
                'Assistance technique',
                'Dépannage informatique',
                'Résolution de problèmes',
                'Support rapide et efficace'
            ]
        },
        'cartes-pvc': {
            title: 'Confection de cartes PVC professionnelles',
            icon: '🖨️',
            description: 'LOMOU\'S GUINÉE réalise la conception et l\'impression de cartes PVC personnalisées pour entreprises, écoles, associations et particuliers. Ces cartes sont solides, durables et esthétiques, parfaites pour représenter votre identité de manière professionnelle.',
            types: [
                '🎓 Cartes d\'étudiant',
                '🪪 Cartes professionnelles / badges d\'entreprise',
                '💳 Cartes de membre ou d\'adhésion',
                '🎟️ Cartes d\'accès et cartes de fidélité',
                '💼 Cartes d\'identification personnalisées avec photo, logo et code QR'
            ],
            caracteristiques: [
                'Impression PVC haute qualité (format standard 85x54 mm)',
                'Possibilité d\'ajouter : Logo et photo',
                'Codes-barres ou QR codes',
                'Signature numérique',
                'Bande magnétique (en option)',
                'Finition brillante ou mate'
            ],
            processus: [
                'Conception graphique (logo, texte, couleurs et design personnalisé)',
                'Validation du modèle avec le client',
                'Impression sur carte PVC avec matériel professionnel',
                'Livraison rapide selon la quantité demandée'
            ],
            hasDetailedInfo: true
        },
        'projets-pratiques': {
            title: 'Projets pratiques (Word, Excel, PowerPoint)',
            icon: '📝',
            items: [
                'Projets pratiques sur Word',
                'Projets pratiques sur Excel',
                'Projets pratiques sur PowerPoint',
                'Mise en application des compétences'
            ]
        },
        'gestion-finance': {
            title: 'Gestion et finance d\'entreprise sur Excel',
            icon: '💰',
            items: [
                'Formations en gestion d\'entreprise',
                'Finance d\'entreprise sur Excel',
                'Tableaux de bord financiers',
                'Outils de gestion avancés'
            ]
        },
        'entrepreneuriat-numerique': {
            title: 'Ateliers d\'entrepreneuriat numérique',
            icon: '🚀',
            items: [
                'Formation à l\'entrepreneuriat numérique',
                'Stratégies digitales',
                'Outils numériques pour entrepreneurs',
                'Accompagnement professionnel'
            ]
        }
    };

    formationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Determine which display to use based on the tab
            const currentTab = button.closest('.tab-content');
            let targetDisplay = null;
            
            if (currentTab) {
                const tabId = currentTab.getAttribute('id');
                if (tabId === 'formation-tab') {
                    targetDisplay = infoDisplay;
                } else if (tabId === 'prestation-tab') {
                    targetDisplay = prestationInfoDisplay;
                }
            }
            
            displayInfo(button, targetDisplay);
        });
    });
});


