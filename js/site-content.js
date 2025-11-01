// ===== SITE CONTENT LOADER =====

// Function to load site data from admin.js
function getSiteData() {
    // Check if admin.js is loaded and has the function
    if (typeof loadSiteData === 'function') {
        return loadSiteData();
    }
    // If not, use localStorage directly
    const storedData = localStorage.getItem('site_data');
    if (storedData) {
        try {
            return JSON.parse(storedData);
        } catch (e) {
            console.error('Error parsing site data:', e);
            return null;
        }
    }
    return null;
}

// Apply dynamic content to the page
function applyDynamicContent() {
    const data = getSiteData();
    
    if (!data) {
        // No admin data, keep default content
        return;
    }
    
    // Hero section
    if (data.hero) {
        const heroTitle = document.querySelector('.hero-title');
        const heroSlogan = document.querySelector('.hero-slogan');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroLogo = document.querySelector('.hero-logo');
        const navLogo = document.querySelector('.logo-img');
        
        if (heroTitle && data.hero.title) heroTitle.textContent = data.hero.title;
        if (heroSlogan && data.hero.slogan) heroSlogan.textContent = data.hero.slogan;
        if (heroSubtitle && data.hero.subtitle) heroSubtitle.textContent = data.hero.subtitle;
        
        // Update logos with error handling
        if (heroLogo && data.hero.logo) {
            heroLogo.onerror = function() {
                this.src = 'images/global.jpg'; // Fallback to default
            };
            heroLogo.src = data.hero.logo;
        }
        if (navLogo && data.hero.logo) {
            navLogo.onerror = function() {
                this.src = 'images/global.jpg'; // Fallback to default
            };
            navLogo.src = data.hero.logo;
        }
    }
    
    // About section
    if (data.about) {
        const aboutTexts = document.querySelectorAll('.about-text p');
        if (aboutTexts.length >= 2) {
            if (data.about.p1) aboutTexts[0].textContent = data.about.p1;
            if (data.about.p2) aboutTexts[1].textContent = data.about.p2;
        }
    }
    
    // Slider images
    if (data.images) {
        const sliderImages = [
            { selector: '.slide img[src*="carte.jpg"]', src: data.images.slider1, fallback: 'images/carte.jpg' },
            { selector: '.slide img[src*="carte2.jpg"]', src: data.images.slider2, fallback: 'images/carte2.jpg' },
            { selector: '.slide img[src*="centre.jpg"]', src: data.images.slider3, fallback: 'images/centre.jpg' },
            { selector: '.slide img[src*="info.jpg"]', src: data.images.slider4, fallback: 'images/info.jpg' }
        ];
        
        sliderImages.forEach(img => {
            const element = document.querySelector(img.selector);
            if (element && img.src) {
                element.onerror = function() {
                    this.src = img.fallback; // Fallback to default
                };
                element.src = img.src;
            }
        });
    }
    
    // Contact information
    if (data.contact) {
        // Update all phone links
        document.querySelectorAll('a[href^="tel:+224"]').forEach(link => {
            const text = link.textContent.trim();
            if (text.includes('623 79 51 49')) {
                link.href = `tel:+224${data.contact.phone1.replace(/\s/g, '')}`;
                link.textContent = data.contact.phone1;
            } else if (text.includes('623 44 90 12')) {
                link.href = `tel:+224${data.contact.phone2.replace(/\s/g, '')}`;
                link.textContent = data.contact.phone2;
            }
        });
        
        // Update WhatsApp links
        document.querySelectorAll('a[href*="wa.me/224623449012"]').forEach(link => {
            link.href = `https://wa.me/224${data.contact.phone2.replace(/\s/g, '')}`;
        });
        
        // Update email
        document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
            if (link.href.includes('loumousguinee2025')) {
                link.href = `mailto:${data.contact.email}`;
                link.textContent = data.contact.email;
            }
        });
        
        // Update address
        const addressParas = document.querySelectorAll('p');
        addressParas.forEach(p => {
            if (p.textContent.includes('Conakry, Guinée')) {
                p.textContent = `Adresse: ${data.contact.address}`;
            }
        });
    }
    
    // Footer slogan
    document.querySelectorAll('.footer-slogan').forEach(el => {
        if (data.hero && data.hero.slogan) {
            el.textContent = data.hero.slogan;
        }
    });
}

// Load the admin.js file to get loadSiteData function
function loadAdminScript() {
    const script = document.createElement('script');
    script.src = 'js/admin.js';
    script.onload = () => {
        applyDynamicContent();
    };
    script.onerror = () => {
        // If admin.js doesn't exist on public pages, just use localStorage
        applyDynamicContent();
    };
    document.head.appendChild(script);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Only load if not on admin page
    if (!window.location.pathname.includes('admin.html')) {
        loadAdminScript();
    }
});

// Listen for storage changes (when admin saves data)
window.addEventListener('storage', (e) => {
    if (e.key === 'site_data') {
        applyDynamicContent();
    }
});

