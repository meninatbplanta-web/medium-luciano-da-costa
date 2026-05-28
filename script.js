document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 3. Floating WhatsApp Button Visibility
    const whatsappFloatingBtn = document.getElementById('whatsapp-floating-btn');
    
    const handleScroll = () => {
        if (window.scrollY > 300) {
            whatsappFloatingBtn.classList.add('visible');
        } else {
            whatsappFloatingBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once initially to set correct state
    handleScroll();

    // 4. FAQ Accordion Interaction
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items for a clean accordion experience
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherTrigger = otherItem.querySelector('.faq-trigger');
                    const otherContent = otherItem.querySelector('.faq-content');
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherContent.setAttribute('hidden', '');
                }
            });

            // Toggle current FAQ item
            if (isExpanded) {
                item.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
                content.setAttribute('hidden', '');
            } else {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                content.removeAttribute('hidden');
            }
        });
    });

    // 5. Smooth Scroll adjustments for headers (safeguard)
    const headerLinks = document.querySelectorAll('.nav-link, .logo, .btn-nav');
    
    headerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
