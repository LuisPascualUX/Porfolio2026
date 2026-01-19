/**
 * Luis Pascual — Portfolio
 * Main JavaScript
 */

(function() {
    'use strict';

    // ==========================================================================
    // Language Switch
    // ==========================================================================

    const langButtons = document.querySelectorAll('.lang-switch button');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('lang');
            document.documentElement.setAttribute('lang', lang);
            
            langButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            // Update page title
            document.title = lang === 'es' 
                ? 'Luis Pascual — Senior Product Designer'
                : 'Luis Pascual — Senior Product Designer';
            
            // Store preference
            localStorage.setItem('lang', lang);
        });
    });

    // Restore language preference
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        document.documentElement.setAttribute('lang', savedLang);
        langButtons.forEach(btn => {
            const isActive = btn.getAttribute('lang') === savedLang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive.toString());
        });
    }

    // ==========================================================================
    // Mobile Menu
    // ==========================================================================

    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isOpen);
            navContainer.classList.toggle('open');
            
            // Trap focus when menu is open
            if (!isOpen) {
                const firstLink = navContainer.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });

        // Close menu on link click
        navContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navContainer.classList.remove('open');
            });
        });

        // Close menu on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navContainer.classList.contains('open')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navContainer.classList.remove('open');
                menuToggle.focus();
            }
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (navContainer.classList.contains('open') && 
                !navContainer.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navContainer.classList.remove('open');
            }
        });
    }

    // ==========================================================================
    // Navigation Scroll Effect
    // ==========================================================================

    const nav = document.querySelector('nav');
    let lastScroll = 0;
    let ticking = false;

    function updateNav() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    });

    // ==========================================================================
    // Scroll Reveal with Intersection Observer
    // ==========================================================================

    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after revealing
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // Smooth Scroll for Anchor Links
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Set focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
                
                // Remove tabindex after blur
                target.addEventListener('blur', () => {
                    target.removeAttribute('tabindex');
                }, { once: true });
            }
        });
    });

    // ==========================================================================
    // Reduced Motion Preference
    // ==========================================================================

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion() {
        if (prefersReducedMotion.matches) {
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('visible');
            });
        }
    }

    handleReducedMotion();
    prefersReducedMotion.addEventListener('change', handleReducedMotion);

    // ==========================================================================
    // Current Year in Footer (optional)
    // ==========================================================================

    const yearElement = document.querySelector('[data-year]');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

})();
