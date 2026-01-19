/**
 * Luis Pascual — Portfolio
 */

(function() {
    'use strict';

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isOpen);
            navContainer.classList.toggle('open');
            
            if (!isOpen) {
                const firstLink = navContainer.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });

        navContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navContainer.classList.remove('open');
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navContainer.classList.contains('open')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navContainer.classList.remove('open');
                menuToggle.focus();
            }
        });
    }

    // Nav scroll effect
    const nav = document.querySelector('nav');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.pageYOffset > 100);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Scroll reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

// Reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const hoverElements = document.querySelectorAll('a, button, .experiment-card, .resource-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

   // Keywords Trail (Hero + Contact)
const trailSections = document.querySelectorAll('.hero, .contact');

trailSections.forEach(section => {
    const container = section.querySelector('.keywords-trail');
    if (!container) return;

    const keywords = [
        'Design Systems', 'Tokens', 'WCAG', 'Figma', 'A11y', 
        'DesignOps', 'Components', 'Handoff', 'Storybook', 
        'Variables', 'IA', 'Accessibility', 'UI', 'UX'
    ];
    
    let lastTime = 0;
    const throttleMs = 150;

    section.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < throttleMs) return;
        lastTime = now;

        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const keyword = document.createElement('span');
        keyword.className = 'trail-keyword';
        keyword.textContent = keywords[Math.floor(Math.random() * keywords.length)];
        keyword.style.left = x + 'px';
        keyword.style.top = y + 'px';
        keyword.style.fontSize = [0.75, 0.875, 1, 1.125, 1.375, 1.75][Math.floor(Math.random() * 6)] + 'rem';
        keyword.style.setProperty('--keyword-opacity', (Math.random() * 0.5 + 0.2).toFixed(2));

        container.appendChild(keyword);
        setTimeout(() => keyword.remove(), 2000);
    });
});

// Dot Grid Effect
const dotGrid = document.querySelector('.dot-grid');

if (dotGrid) {
    const spacing = 40;
    const cols = Math.floor(dotGrid.offsetWidth / spacing);
    const rows = Math.floor(dotGrid.offsetHeight / spacing);
    const points = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const point = document.createElement('span');
            point.className = 'dot-grid-point';
            point.style.left = (j * spacing + spacing / 2) + 'px';
            point.style.top = (i * spacing + spacing / 2) + 'px';
            dotGrid.appendChild(point);
            points.push(point);
        }
    }

    const manifesto = document.querySelector('.manifesto');
    const radius = 100;

    manifesto.addEventListener('mousemove', (e) => {
        const rect = dotGrid.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        points.forEach(point => {
            const pointX = parseFloat(point.style.left);
            const pointY = parseFloat(point.style.top);
            const distance = Math.sqrt((mouseX - pointX) ** 2 + (mouseY - pointY) ** 2);

            if (distance < radius) {
                point.classList.add('active');
            } else {
                point.classList.remove('active');
            }
        });
    });

    manifesto.addEventListener('mouseleave', () => {
        points.forEach(point => point.classList.remove('active'));
    });
}
})();
