/**
 * TOOLKITPROO - MODERN ANIMATIONS & SCROLL EFFECTS
 * Lightweight, performant animations for all pages
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const config = {
        revealThreshold: 0.1,
        revealRootMargin: '0px 0px -50px 0px',
        throttleDelay: 16,
        parallaxSpeed: 0.5
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    
    class ScrollReveal {
        constructor() {
            this.elements = [];
            this.observer = null;
            this.init();
        }

        init() {
            // Check for reduced motion preference
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.showAllElements();
                return;
            }

            this.setupObserver();
            this.findElements();
        }

        setupObserver() {
            const options = {
                root: null,
                rootMargin: config.revealRootMargin,
                threshold: config.revealThreshold
            };

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.revealElement(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, options);
        }

        findElements() {
            const selectors = [
                '.reveal',
                '.reveal-fade-up',
                '.reveal-fade-down',
                '.reveal-fade-left',
                '.reveal-fade-right',
                '.reveal-zoom-in',
                '.reveal-zoom-out',
                '.reveal-flip',
                '.reveal-slide-up',
                '.card-entrance'
            ];

            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    this.elements.push(el);
                    this.observer.observe(el);
                });
            });
        }

        revealElement(element) {
            // Add stagger delay based on element index
            const parent = element.parentElement;
            if (parent) {
                const siblings = Array.from(parent.children).filter(child => 
                    child.classList.contains('reveal') || 
                    child.classList.contains('reveal-fade-up') ||
                    child.classList.contains('card-entrance')
                );
                const index = siblings.indexOf(element);
                if (index > 0) {
                    element.style.transitionDelay = `${index * 0.1}s`;
                }
            }

            requestAnimationFrame(() => {
                element.classList.add('active');
            });
        }

        showAllElements() {
            const allRevealElements = document.querySelectorAll(
                '.reveal, .reveal-fade-up, .reveal-fade-down, .reveal-fade-left, ' +
                '.reveal-fade-right, .reveal-zoom-in, .reveal-zoom-out, .reveal-flip, ' +
                '.reveal-slide-up, .card-entrance'
            );
            allRevealElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    
    class NavbarScroll {
        constructor() {
            this.navbar = document.querySelector('.navbar');
            this.lastScroll = 0;
            this.init();
        }

        init() {
            if (!this.navbar) return;
            
            window.addEventListener('scroll', throttle(() => {
                this.handleScroll();
            }, config.throttleDelay), { passive: true });
        }

        handleScroll() {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll direction
            if (currentScroll > this.lastScroll && currentScroll > 100) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }

            this.lastScroll = currentScroll;
        }
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const targetId = anchor.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        this.scrollTo(targetElement);
                    }
                });
            });
        }

        scrollTo(element, offset = 80) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // ============================================
    // PARALLAX EFFECT
    // ============================================
    
    class ParallaxEffect {
        constructor() {
            this.elements = [];
            this.init();
        }

        init() {
            this.elements = document.querySelectorAll('[data-parallax]');
            if (this.elements.length === 0) return;

            window.addEventListener('scroll', throttle(() => {
                this.updateParallax();
            }, config.throttleDelay), { passive: true });
        }

        updateParallax() {
            const scrolled = window.pageYOffset;
            
            this.elements.forEach(element => {
                const speed = element.dataset.parallax || config.parallaxSpeed;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    
    class CounterAnimation {
        constructor() {
            this.counters = [];
            this.init();
        }

        init() {
            this.counters = document.querySelectorAll('[data-counter]');
            if (this.counters.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            this.counters.forEach(counter => observer.observe(counter));
        }

        animateCounter(element) {
            const target = parseInt(element.dataset.counter);
            const duration = parseInt(element.dataset.duration) || 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        }
    }

    // ============================================
    // MOBILE MENU ANIMATION
    // ============================================
    
    class MobileMenu {
        constructor() {
            this.toggle = document.querySelector('.mobile-menu-btn');
            this.menu = document.querySelector('.nav-links');
            this.init();
        }

        init() {
            if (!this.toggle || !this.menu) return;

            this.toggle.addEventListener('click', () => {
                this.toggle.classList.toggle('active');
                this.menu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking on links
            this.menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.toggle.classList.remove('active');
                    this.menu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }
    }

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    
    class ButtonRipple {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('.btn, button').forEach(button => {
                button.addEventListener('click', (e) => {
                    this.createRipple(e, button);
                });
            });
        }

        createRipple(e, button) {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        }
    }

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    
    class LazyLoader {
        constructor() {
            this.images = [];
            this.init();
        }

        init() {
            this.images = document.querySelectorAll('img[data-src]');
            if (this.images.length === 0) return;

            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        imageObserver.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '50px' });

            this.images.forEach(img => imageObserver.observe(img));
        }

        loadImage(img) {
            const src = img.dataset.src;
            if (!src) return;

            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        }
    }

    // ============================================
    // TYPING EFFECT
    // ============================================
    
    class TypingEffect {
        constructor() {
            this.elements = [];
            this.init();
        }

        init() {
            this.elements = document.querySelectorAll('[data-typing]');
            if (this.elements.length === 0) return;

            this.elements.forEach(element => {
                const text = element.dataset.typing;
                const speed = parseInt(element.dataset.typingSpeed) || 100;
                this.typeText(element, text, speed);
            });
        }

        typeText(element, text, speed) {
            let i = 0;
            element.textContent = '';
            
            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            };

            // Start typing when element is in view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    type();
                    observer.disconnect();
                }
            });

            observer.observe(element);
        }
    }

    // ============================================
    // PROGRESS BAR ANIMATION
    // ============================================
    
    class ProgressBar {
        constructor() {
            this.bars = [];
            this.init();
        }

        init() {
            this.bars = document.querySelectorAll('[data-progress]');
            if (this.bars.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateBar(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            this.bars.forEach(bar => observer.observe(bar));
        }

        animateBar(bar) {
            const progress = bar.dataset.progress;
            bar.style.width = '0%';
            
            requestAnimationFrame(() => {
                bar.style.transition = 'width 1s ease-out';
                bar.style.width = `${progress}%`;
            });
        }
    }

    // ============================================
    // MAGNETIC BUTTON EFFECT
    // ============================================
    
    class MagneticButton {
        constructor() {
            this.buttons = [];
            this.init();
        }

        init() {
            // Only on non-touch devices
            if (window.matchMedia('(pointer: coarse)').matches) return;

            this.buttons = document.querySelectorAll('[data-magnetic]');
            
            this.buttons.forEach(button => {
                button.addEventListener('mousemove', (e) => {
                    this.handleMouseMove(e, button);
                });

                button.addEventListener('mouseleave', () => {
                    button.style.transform = 'translate(0, 0)';
                });
            });
        }

        handleMouseMove(e, button) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        }
    }

    // ============================================
    // PAGE TRANSITION
    // ============================================
    
    class PageTransition {
        constructor() {
            this.init();
        }

        init() {
            // Add page wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'page-wrapper';
            
            while (document.body.firstChild) {
                wrapper.appendChild(document.body.firstChild);
            }
            
            document.body.appendChild(wrapper);

            // Handle link clicks
            document.querySelectorAll('a').forEach(link => {
                if (link.hostname === window.location.hostname && !link.getAttribute('href').startsWith('#')) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.transitionTo(link.href);
                    });
                }
            });
        }

        transitionTo(url) {
            const wrapper = document.querySelector('.page-wrapper');
            wrapper.classList.add('page-exit');

            setTimeout(() => {
                window.location.href = url;
            }, 300);
        }
    }

    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    
    class ScrollProgress {
        constructor() {
            this.progressBar = null;
            this.init();
        }

        init() {
            // Create progress bar
            this.progressBar = document.createElement('div');
            this.progressBar.className = 'scroll-progress';
            this.progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #6366f1, #8b5cf6);
                z-index: 9999;
                transition: width 0.1s;
            `;
            document.body.appendChild(this.progressBar);

            window.addEventListener('scroll', throttle(() => {
                this.updateProgress();
            }, 16), { passive: true });
        }

        updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            this.progressBar.style.width = `${scrollPercent}%`;
        }
    }

    // ============================================
    // INITIALIZE ALL ANIMATIONS
    // ============================================
    
    function initAnimations() {
        // Core animations
        new ScrollReveal();
        new NavbarScroll();
        new SmoothScroll();
        new MobileMenu();
        new LazyLoader();
        
        // Optional effects
        new ParallaxEffect();
        new CounterAnimation();
        new ButtonRipple();
        new TypingEffect();
        new ProgressBar();
        new MagneticButton();
        new ScrollProgress();
        
        // Page transition (optional - can be disabled if causing issues)
        // new PageTransition();

        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }

    // Re-initialize for dynamically added content
    window.reinitAnimations = function() {
        new ScrollReveal();
        new CounterAnimation();
        new LazyLoader();
    };

})();
