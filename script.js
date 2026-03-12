// ============================================
// NAVBAR SCROLL EFFECT & BORDER GLOW
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE NAVIGATION HAMBURGER MENU
// ============================================
const mobileHamburger = document.querySelector('.mobile-hamburger');
const navMenu = document.querySelector('.nav-menu');

mobileHamburger.addEventListener('click', () => {
    mobileHamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileHamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileHamburger.contains(e.target)) {
        mobileHamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// TYPEWRITER EFFECT
// ============================================
const typewriterOptions = [
    'Full Stack Developer',
    'Python Engineer',
    'React Developer',
    'Problem Solver',
    'AI App Builder'
];

let typewriterIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.querySelector('.typewriter-text');

if (typewriterElement) {
    function typeWriter() {
        const currentText = typewriterOptions[typewriterIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                typewriterIndex = (typewriterIndex + 1) % typewriterOptions.length;
            }
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                return;
            }
        }
        
        const speed = isDeleting ? 50 : 100;
        const pauseTime = charIndex === currentText.length ? 2000 : speed;
        setTimeout(typeWriter, pauseTime);
    }
    
    typeWriter();
}

// ============================================
// INTERSECTION OBSERVER FOR SECTIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInSection 0.6s ease';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// ============================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// BLOG ACCORDION EXPAND/COLLAPSE
// ============================================
const blogToggles = document.querySelectorAll('.blog-toggle');

blogToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const postId = this.getAttribute('data-post');
        const contentElement = document.getElementById(`blog-content-${postId}`);
        
        if (contentElement) {
            const isExpanded = contentElement.classList.contains('expanded');
            
            // Close all other blog posts
            document.querySelectorAll('.blog-content').forEach(content => {
                content.classList.remove('expanded');
            });
            
            document.querySelectorAll('.blog-toggle').forEach(btn => {
                btn.textContent = 'Read More';
            });
            
            // Toggle current post
            if (!isExpanded) {
                contentElement.classList.add('expanded');
                this.textContent = 'Read Less';
            }
        }
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// CONTACT FORM - EmailJS INTEGRATION
// ============================================
// To set up EmailJS:
// 1. Go to https://www.emailjs.com
// 2. Create an account and set up your email service
// 3. Create an email template
// 4. Replace the values below with your actual credentials:
//    - SERVICE_ID
//    - TEMPLATE_ID
//    - PUBLIC_KEY

// Initialize EmailJS (currently commented out until credentials are provided)
/*
emailjs.init('YOUR_PUBLIC_KEY');

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Send email via EmailJS
        emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'zachndungu861@gmail.com'
        }).then(function(response) {
            console.log('SUCCESS', response.status, response.text);
            submitBtn.textContent = 'Message Sent! ✓';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, function(error) {
            console.log('FAILED', error);
            submitBtn.textContent = 'Error - Try Again';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    });
}
*/

// Fallback: Contact form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Get form values for mailto fallback
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link with form data
        const mailtoLink = `mailto:zachndungu861@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        
        window.location.href = mailtoLink;
        
        submitBtn.textContent = 'Opening email...';
        setTimeout(() => {
            submitBtn.textContent = originalText;
        }, 2000);
    });
}

// ============================================
// SMOOTH ANIMATION FOR ELEMENTS ON SCROLL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.skill-badge, .project-card, .skill-card, .metric-card, .blog-card, .contact-card'
    );
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        elementObserver.observe(el);
    });
});

// ============================================
// PREVENT HAMBURGER MENU ACTIVE STATE ANIMATION ISSUES
// ============================================
const hamburgerSpans = document.querySelectorAll('.mobile-hamburger span');
document.addEventListener('click', () => {
    if (!mobileHamburger.classList.contains('active')) {
        hamburgerSpans.forEach(span => {
            span.style.transform = 'none';
        });
    }
});
