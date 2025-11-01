// ===== ADMIN SCRIPT =====

// Password
const ADMIN_PASSWORD = 'lomou2025';

// Check if user is logged in
function checkLogin() {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (isLoggedIn === 'true') {
        showAdminPanel();
    } else {
        showLoginScreen();
    }
}

// Show login screen
function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-panel').style.display = 'none';
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadAdminData();
}

// Initialize event listeners
function initAdminEvents() {
    // Handle login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('login-error');
            
            if (password === ADMIN_PASSWORD) {
                localStorage.setItem('admin_logged_in', 'true');
                errorDiv.textContent = '';
                showAdminPanel();
            } else {
                errorDiv.textContent = '❌ Mot de passe incorrect';
                document.getElementById('password').value = '';
            }
        });
    }
    
    // Handle logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('admin_logged_in');
            showLoginScreen();
        });
    }
    
    // Handle save button
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveAdminData);
    }
}

// Load admin data
function loadAdminData() {
    // Load data from localStorage or use defaults
    const data = loadSiteData();
    
    // Hero section
    if (data.hero) {
        document.getElementById('hero-title').value = data.hero.title || '';
        document.getElementById('hero-slogan').value = data.hero.slogan || '';
        document.getElementById('hero-subtitle').value = data.hero.subtitle || '';
        document.getElementById('hero-logo').value = data.hero.logo || 'images/global.jpg';
    }
    
    // About section
    if (data.about) {
        document.getElementById('about-p1').value = data.about.p1 || '';
        document.getElementById('about-p2').value = data.about.p2 || '';
    }
    
    // Services
    if (data.services) {
        if (data.services.initiation) {
            document.getElementById('service-init-title').value = data.services.initiation.title || '';
            document.getElementById('service-init-items').value = data.services.initiation.items || '';
        }
        if (data.services.bureautique) {
            document.getElementById('service-bur-title').value = data.services.bureautique.title || '';
            document.getElementById('service-bur-items').value = data.services.bureautique.items || '';
        }
    }
    
    // Images
    if (data.images) {
        document.getElementById('img-slider-1').value = data.images.slider1 || 'images/carte.jpg';
        document.getElementById('img-slider-2').value = data.images.slider2 || 'images/carte2.jpg';
        document.getElementById('img-slider-3').value = data.images.slider3 || 'images/centre.jpg';
        document.getElementById('img-slider-4').value = data.images.slider4 || 'images/info.jpg';
    }
    
    // Contact
    if (data.contact) {
        document.getElementById('contact-phone1').value = data.contact.phone1 || '';
        document.getElementById('contact-phone2').value = data.contact.phone2 || '';
        document.getElementById('contact-email').value = data.contact.email || '';
        document.getElementById('contact-address').value = data.contact.address || '';
    }
}

// Save admin data
function saveAdminData() {
    const statusDiv = document.getElementById('save-status');
    
    try {
        const data = {
            hero: {
                title: document.getElementById('hero-title').value,
                slogan: document.getElementById('hero-slogan').value,
                subtitle: document.getElementById('hero-subtitle').value,
                logo: document.getElementById('hero-logo').value
            },
            about: {
                p1: document.getElementById('about-p1').value,
                p2: document.getElementById('about-p2').value
            },
            services: {
                initiation: {
                    title: document.getElementById('service-init-title').value,
                    items: document.getElementById('service-init-items').value
                },
                bureautique: {
                    title: document.getElementById('service-bur-title').value,
                    items: document.getElementById('service-bur-items').value
                }
            },
            images: {
                slider1: document.getElementById('img-slider-1').value,
                slider2: document.getElementById('img-slider-2').value,
                slider3: document.getElementById('img-slider-3').value,
                slider4: document.getElementById('img-slider-4').value
            },
            contact: {
                phone1: document.getElementById('contact-phone1').value,
                phone2: document.getElementById('contact-phone2').value,
                email: document.getElementById('contact-email').value,
                address: document.getElementById('contact-address').value
            }
        };
        
        localStorage.setItem('site_data', JSON.stringify(data));
        statusDiv.textContent = '✅ Modifications enregistrées avec succès !';
        statusDiv.className = 'save-status success';
        
        // Clear message after 3 seconds
        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = 'save-status';
        }, 3000);
        
    } catch (error) {
        statusDiv.textContent = '❌ Erreur lors de l\'enregistrement';
        statusDiv.className = 'save-status error';
        console.error('Save error:', error);
    }
}

// Image preview
function previewImage(inputId) {
    const input = document.getElementById(inputId);
    const imgSrc = input.value;
    
    if (imgSrc) {
        const modal = document.getElementById('image-preview-modal');
        const img = document.getElementById('preview-img');
        img.src = imgSrc;
        modal.style.display = 'block';
    }
}

// Close modal
function closeModal() {
    document.getElementById('image-preview-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('image-preview-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Load site data (for public pages)
function loadSiteData() {
    const storedData = localStorage.getItem('site_data');
    if (storedData) {
        try {
            return JSON.parse(storedData);
        } catch (e) {
            console.error('Error parsing site data:', e);
            return getDefaultData();
        }
    }
    return getDefaultData();
}

// Default data
function getDefaultData() {
    return {
        hero: {
            title: "Bienvenue chez Loumou's Guinée",
            slogan: "Loumou's Guinée — Votre partenaire de confiance pour apprendre, entreprendre et réussir.",
            subtitle: "Votre partenaire de confiance pour l'informatique, le business et l'immobilier",
            logo: "images/global.jpg"
        },
        about: {
            p1: "Loumou's Guinée est une entreprise dynamique et innovante qui propose des services de qualité dans trois domaines d'excellence : l'informatique, le business et l'immobilier.",
            p2: "Notre mission est de fournir des solutions professionnelles adaptées aux besoins de nos clients, avec un engagement constant envers l'excellence et la satisfaction client."
        },
        services: {
            initiation: {
                title: "Initiation en informatique",
                items: "Bases de l'ordinateur\nSystème Windows\nOrganisation des fichiers"
            },
            bureautique: {
                title: "Bureautique complète",
                items: "Word\nExcel\nPowerPoint\nAccess"
            }
        },
        images: {
            slider1: "images/carte.jpg",
            slider2: "images/carte2.jpg",
            slider3: "images/centre.jpg",
            slider4: "images/info.jpg"
        },
        contact: {
            phone1: "623 79 51 49",
            phone2: "623 44 90 12",
            email: "loumousguinee2025@gmail.com",
            address: "Conakry, Guinée, commune de sanoyah, quartier kountia"
        }
    };
}

// Make loadSiteData available globally for other pages
window.loadSiteData = loadSiteData;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initAdminEvents();
    checkLogin();
});

// Prevent unauthorized access
window.addEventListener('storage', (e) => {
    if (e.key === 'admin_logged_in' && e.newValue === null) {
        window.location.reload();
    }
});

