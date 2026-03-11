// ============================================
// CONFIGURATION
// ============================================
const OPEN_TO_WORK = true; // Set to false to hide the badge

// ============================================
// OPEN TO WORK BADGE
// ============================================
const openToWorkBadge = document.getElementById('openToWorkBadge');
if (!OPEN_TO_WORK && openToWorkBadge) {
    openToWorkBadge.style.display = 'none';
}

// ============================================
// PROJECT CARD MEDIA PREVIEW & LAZY LOADING
// ============================================
const projectCards = document.querySelectorAll('.project-card');
let isMobile = window.innerWidth <= 768;

window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
});

projectCards.forEach(card => {
    const projectImage = card.querySelector('.project-image');
    const video = card.querySelector('.project-preview');
    const staticImg = card.querySelector('.project-static');
    let isPlaying = false;

    if (!video) return; // Skip if no video element

    // Lazy load video when card is visible
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !video.src) {
                const dataSrc = video.getAttribute('data-src');
                if (dataSrc) {
                    video.src = dataSrc;
                }
            }
        });
    }, { threshold: 0.1 });

    imageObserver.observe(projectImage);

    // Desktop: hover to play, mouse leave to stop
    if (!isMobile) {
        projectImage.addEventListener('mouseenter', () => {
            if (video && video.src && !isPlaying) {
                staticImg.style.opacity = '0';
                video.style.display = 'block';
                video.style.opacity = '1';
                video.play().catch(e => console.log('Video play failed:', e));
                isPlaying = true;
            }
        });

        projectImage.addEventListener('mouseleave', () => {
            if (video && isPlaying) {
                video.pause();
                video.currentTime = 0;
                video.style.opacity = '0';
                setTimeout(() => {
                    video.style.display = 'none';
                    staticImg.style.opacity = '1';
                    isPlaying = false;
                }, 300);
            }
        });
    }

    // Mobile: tap to toggle
    if (isMobile) {
        projectImage.addEventListener('click', (e) => {
            e.preventDefault();
            if (video && video.src) {
                if (!isPlaying) {
                    staticImg.style.opacity = '0';
                    video.style.display = 'block';
                    video.style.opacity = '1';
                    video.play().catch(e => console.log('Video play failed:', e));
                    isPlaying = true;
                } else {
                    video.pause();
                    video.currentTime = 0;
                    video.style.opacity = '0';
                    setTimeout(() => {
                        video.style.display = 'none';
                        staticImg.style.opacity = '1';
                        isPlaying = false;
                    }, 300);
                }
            }
        });
    }
});

// ============================================
// MOBILE NAVIGATION
// ============================================
const mobileHamburger = document.querySelector('.mobile-hamburger');
const sidebar = document.querySelector('.sidebar');
const navLinks = document.querySelectorAll('.nav-link');

mobileHamburger.addEventListener('click', () => {
    mobileHamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileHamburger.classList.remove('active');
        sidebar.classList.remove('active');
    });
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !mobileHamburger.contains(e.target)) {
        mobileHamburger.classList.remove('active');
        sidebar.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
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

// Typing animation for hero title
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = "Hi, I'm Zach";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingText.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                typingText.style.borderRight = 'none';
            }, 1000);
        }
    }

    // Add cursor effect
    typingText.style.borderRight = '3px solid #1DB954';
    typingText.style.animation = 'blink 1s infinite';

    // Start typing animation when page loads
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// Add blink animation for cursor
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: #1DB954; }
        51%, 100% { border-color: transparent; }
    }
`;
document.head.appendChild(style);

// Active navigation link on scroll
const mainContent = document.querySelector('.main-content');
const sections = document.querySelectorAll('section[id]');

mainContent.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - mainContent.parentElement.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (mainContent.scrollTop >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target === 100) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const targets = [3, 50, 100];
                setTimeout(() => {
                    animateCounter(stat, targets[index]);
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Add play button to project cards on hover
document.querySelectorAll('.project-card').forEach(card => {
    const overlay = card.querySelector('.project-overlay');
    
    if (overlay && !overlay.querySelector('.play-button')) {
        const playButton = document.createElement('div');
        playButton.className = 'play-button';
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        overlay.appendChild(playButton);
    }
});