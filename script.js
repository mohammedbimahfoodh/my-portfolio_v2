(function () {
    'use strict';

    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.indicator-dot');

    function setActive(index) {
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
    }

    // Track which section is currently in view — IntersectionObserver
    // avoids the scroll-event + getBoundingClientRect polling pattern,
    // so there's no work done on frames where nothing actually changed.
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Array.from(sections).indexOf(entry.target);
                        setActive(index);
                    }
                });
            },
            { threshold: 0.5 }
        );
        sections.forEach((section) => observer.observe(section));
    }

    dots.forEach((dot) => {
        const index = parseInt(dot.getAttribute('data-index'), 10);

        dot.addEventListener('click', () => {
            sections[index]?.scrollIntoView({ behavior: 'smooth' });
        });

        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                sections[index]?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // In-page links (e.g. "View Projects") get the same smooth-scroll
    // treatment instead of relying on inline onclick handlers.
    document.querySelectorAll('[data-scroll]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();
