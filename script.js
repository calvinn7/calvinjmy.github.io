/* ===================================
   Calvin Jee Portfolio - JavaScript
   Interactive Features & Animations
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initBatSignal();
    initMobileMenu();
});

/* ===================================
   Navigation
   =================================== */
function initNavigation() {
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class for background
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                document.querySelector('.nav-links')?.classList.remove('active');

                const navHeight = nav.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   Mobile Menu
   =================================== */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

/* ===================================
   Scroll Animations
   =================================== */
function initScrollAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.about-card, .about-bio, .project-card, .timeline-item, ' +
        '.skill-category, .interest-card, .contact-link'
    );

    // Add animation class
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/* ===================================
   Bat Signal Easter Egg
   =================================== */
function initBatSignal() {
    const batSignal = document.getElementById('batSignal');

    if (!batSignal) return;

    // Show bat signal when scrolling past hero
    const heroSection = document.getElementById('hero');

    const batObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Past hero section - show bat signal
                batSignal.classList.add('visible');
            } else {
                // In hero section - hide bat signal
                batSignal.classList.remove('visible');
            }
        });
    }, { threshold: 0.5 });

    if (heroSection) {
        batObserver.observe(heroSection);
    }

    // Easter egg: Click bat signal to toggle dark mode effect
    batSignal.style.cursor = 'pointer';
    batSignal.style.pointerEvents = 'auto';

    batSignal.addEventListener('click', () => {
        // Create a flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at ${batSignal.offsetLeft + 30}px ${batSignal.offsetTop + 30}px, 
                rgba(212, 175, 55, 0.3) 0%, transparent 50%);
            pointer-events: none;
            z-index: 998;
            animation: flashPulse 1s ease-out forwards;
        `;

        document.body.appendChild(flash);

        setTimeout(() => {
            flash.remove();
        }, 1000);
    });

    // Add flash animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flashPulse {
            0% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1.5); }
            100% { opacity: 0; transform: scale(2); }
        }
    `;
    document.head.appendChild(style);
}

/* ===================================
   Typing Effect for Hero (Optional)
   =================================== */
function initTypingEffect() {
    const taglineItems = document.querySelectorAll('.tagline-item');

    taglineItems.forEach((item, index) => {
        const text = item.textContent;
        item.textContent = '';
        item.style.opacity = '1';

        setTimeout(() => {
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    item.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, index * 500);
    });
}

/* ===================================
   Project Card Hover Effects
   =================================== */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add glow effect
        card.style.boxShadow = '0 0 30px rgba(0, 168, 232, 0.4)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});

/* Resume download now works via HTML download attribute */

/* ===================================
   Console Easter Egg
   =================================== */
console.log(`
%c🦇 Welcome to the Batcave... I mean, Calvin's Portfolio! 🦇

%cBuilt with passion for AI and cinema.
Contact: calvinjmy993@gmail.com

"It's not who I am underneath, but what I do that defines me."
`,
    'font-size: 16px; font-weight: bold; color: #d4af37;',
    'font-size: 12px; color: #00a8e8;'
);

/* Skill Bar Animation */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.setProperty('--target-width', width + '%');
                bar.classList.add('animated');
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initSkillBars();
});
