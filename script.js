// Initialisation du site
document.addEventListener('DOMContentLoaded', function() {
    // 1. Animation des statistiques
    animateStats();
    
    // 2. Effets de particules
    initParticles();
    
    // 3. Navigation mobile
    initMobileMenu();
    
    // 4. Form submission
    initContactForm();
    
    // 5. Effets au scroll
    initScrollEffects();
    
    // 6. Animation des cartes au survol
    initCardAnimations();
    
    // 7. Typing effect pour le titre
    initTypingEffect();
});

// 1. Animation des chiffres statistiques
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target;
                const target = parseInt(statValue.getAttribute('data-count'));
                const suffix = statValue.textContent.includes('k') ? 'k' : '';
                animateValue(statValue, 0, target, 2000, suffix);
                observer.unobserve(statValue);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(statValue => observer.observe(statValue));
}

function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        
        if (suffix === 'k' && end >= 1000) {
            element.textContent = (current / 1000).toFixed(1) + suffix;
        } else {
            element.textContent = current + suffix;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 2. Effets de particules pour l'arrière-plan
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Position aléatoire
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Taille aléatoire
        const size = Math.random() * 3 + 1;
        
        // Durée d'animation aléatoire
        const duration = Math.random() * 10 + 10;
        
        // Délai aléatoire
        const delay = Math.random() * 5;
        
        // Appliquer les styles
        particle.style.cssText = `
            position: absolute;
            top: ${y}%;
            left: ${x}%;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
            border-radius: 50%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: float ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Ajouter l'animation float au CSS si elle n'existe pas
    if (!document.querySelector('#float-animation')) {
        const style = document.createElement('style');
        style.id = 'float-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 90 - 45}deg); }
                50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 90 - 45}deg); }
                75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 90 - 45}deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// 3. Menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(20px);
                    padding: 2rem;
                    border-top: 1px solid var(--glass-border);
                    z-index: 1000;
                `;
                
                navLinks.querySelectorAll('a').forEach(link => {
                    link.style.cssText = `
                        padding: 1rem 0;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        width: 100%;
                        text-align: center;
                    `;
                });
            }
        });
        
        // Fermer le menu en cliquant sur un lien
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
        
        // Réinitialiser le menu sur le redimensionnement
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.style.cssText = '';
                navLinks.style.display = 'flex';
                
                navLinks.querySelectorAll('a').forEach(link => {
                    link.style.cssText = '';
                });
            } else {
                navLinks.style.display = 'none';
            }
        });
    }
}

// 4. Formulaire de contact
function initContactForm() {
    const form = document.getElementById('audit-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };
        
        // Simuler l'envoi (à remplacer par une vraie requête AJAX)
        console.log('Formulaire soumis:', formData);
        
        // Afficher un message de succès
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Demande envoyée !';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Réinitialiser le formulaire
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            
            // Afficher une notification
            showNotification('Votre demande a été envoyée avec succès ! Nous vous répondrons dans les 24h.', 'success');
        }, 3000);
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Styles de la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 9999;
        box-shadow: var(--glass-shadow);
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer la notification après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Ajouter les animations si elles n'existent pas
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// 5. Effets au scroll
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.service-card, .why-card, .testimonial-card, .team-member').forEach(el => {
        observer.observe(el);
    });
    
    // Ajouter l'animation CSS
    if (!document.querySelector('#scroll-animations')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations';
        style.textContent = `
            .service-card,
            .why-card,
            .testimonial-card,
            .team-member {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Délais d'animation pour les cartes */
            .services-grid .service-card:nth-child(1) { transition-delay: 0.1s; }
            .services-grid .service-card:nth-child(2) { transition-delay: 0.2s; }
            .services-grid .service-card:nth-child(3) { transition-delay: 0.3s; }
            .services-grid .service-card:nth-child(4) { transition-delay: 0.4s; }
        `;
        document.head.appendChild(style);
    }
}

// 6. Animation des cartes au survol
function initCardAnimations() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });
}

// 7. Effet de typing pour le titre
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const lines = heroTitle.querySelectorAll('.title-line');
    let currentLine = 0;
    
    function typeLine(lineIndex) {
        const line = lines[lineIndex];
        const text = line.textContent;
        line.textContent = '';
        
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < text.length) {
                line.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50); // Vitesse de frappe
            } else if (lineIndex < lines.length - 1) {
                currentLine++;
                setTimeout(() => typeLine(currentLine), 500);
            }
        };
        
        typeChar();
    }
    
    // Démarrer l'effet lorsque la section est visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeLine(0);
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    
    observer.observe(heroTitle.parentElement);
}

// 8. Smooth scrolling pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 9. Gestion du thème (optionnel pour le futur)
function initTheme() {
    // Stocker la préférence de thème
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        // Option pour changer de thème plus tard
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

// Initialiser le thème
initTheme();
