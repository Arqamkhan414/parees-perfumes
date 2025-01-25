document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle hamburger animation
        hamburger.classList.toggle('active');
        
        // Toggle nav menu
        navLinks.classList.toggle('active');
        
        // Animate links
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navLinksItems.forEach(link => {
                link.style.animation = '';
            });
        });
    });
});

// Add Product Navigation
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const scrollAmount = 300;

    function checkScroll() {
        const maxScroll = productGrid.scrollWidth - productGrid.clientWidth;
        prevBtn.disabled = productGrid.scrollLeft <= 0;
        nextBtn.disabled = productGrid.scrollLeft >= maxScroll;
    }

    prevBtn.addEventListener('click', () => {
        productGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(checkScroll, 100);
    });

    nextBtn.addEventListener('click', () => {
        productGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(checkScroll, 100);
    });

    productGrid.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();
});

// Add animation for features on scroll
document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'all 0.6s ease';
        observer.observe(feature);
    });
});

// Add smooth scroll for newsletter form submission
document.addEventListener('DOMContentLoaded', () => {
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = subscribeForm.querySelector('input');
            if (input.value) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = 'var(--nav-bg)';
                successMessage.style.marginTop = '1rem';
                successMessage.style.fontSize = 'clamp(0.9rem, 1.5vw, 1rem)';
                
                // Remove any existing success message
                const existingMessage = subscribeForm.querySelector('.newsletter-success');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                subscribeForm.appendChild(successMessage);
                input.value = '';
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }
});
