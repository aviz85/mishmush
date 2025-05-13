document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + testimonialCards.length) % testimonialCards.length;
        
        testimonialCards[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause slider on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(accordionItem => {
                accordionItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Form submission
    const form = document.getElementById('registration-form');
    const formSuccess = document.getElementById('form-success');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server
            // For this demo, we'll just show the success message
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            if (!name || !email || !phone) {
                alert('אנא מלא את כל השדות החובה');
                return;
            }
            
            // Show success message
            form.style.display = 'none';
            formSuccess.classList.remove('hidden');
            
            // Clear form fields (if needed later)
            form.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced animations on scroll
    const animateSections = document.querySelectorAll('section');
    const animateElements = document.querySelectorAll('.feature-card, .timeline-item, .pricing-card, .testimonial-card, .accordion-item');
    
    function checkIfInView() {
        const triggerBottom = window.innerHeight * 0.8;
        
        // Animate sections
        animateSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
        
        // Animate elements
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animate');
            }
        });
    }
    
    // Pricing cards hover effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
                card.style.zIndex = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = '';
                card.style.boxShadow = '';
                card.style.zIndex = '';
            }
        });
    });
    
    // Animate elements when they come into view
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Initial animations for elements above the fold
    setTimeout(() => {
        document.querySelector('.hero').classList.add('loaded');
    }, 300);
    
    // Particles animation in hero section (create floating shapes)
    const hero = document.querySelector('.hero');
    createParticles(hero, 5);
    
    function createParticles(container, count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random styling
            const size = Math.random() * 50 + 20; // 20-70px
            const posX = Math.random() * 100; // 0-100%
            const posY = Math.random() * 100; // 0-100%
            const duration = Math.random() * 20 + 10; // 10-30s
            const delay = Math.random() * 5; // 0-5s
            
            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.right = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.opacity = '0.05';
            particle.style.position = 'absolute';
            particle.style.borderRadius = '50%';
            particle.style.background = 'var(--primary-color)';
            particle.style.animation = 'float 15s infinite ease-in-out';
            
            container.appendChild(particle);
        }
    }
}); 