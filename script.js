// Анимация звезд
class StarAnimation {
    constructor() {
        this.container = document.getElementById('stars-container');
        this.stars = [];
        this.particles = [];
        this.init();
    }

    init() {
        this.createStars();
        this.createFloatingParticles();
        this.animateStars();
        this.startParticleAnimation();
    }

    createStars() {
        const starCount = 150;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Случайные размеры и позиции
            const size = Math.random() * 4 + 1;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const delay = Math.random() * 3;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${Math.random() * 4 + 3}s`;
            
            // Добавляем случайные цвета для звезд
            const colors = ['#fff', '#4ecdc4', '#ff6b6b', '#45b7d1', '#96ceb4'];
            star.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            this.container.appendChild(star);
            this.stars.push(star);
        }
    }

    createFloatingParticles() {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            const size = Math.random() * 8 + 2;
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight + Math.random() * 100;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            // Добавляем случайные формы
            const shapes = ['circle', 'square', 'triangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            if (shape === 'square') {
                particle.style.borderRadius = '0';
            } else if (shape === 'triangle') {
                particle.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                particle.style.borderRadius = '0';
            }
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    animateStars() {
        this.stars.forEach((star, index) => {
            // Случайная задержка для начала анимации
            setTimeout(() => {
                const duration = Math.random() * 15 + 10;
                star.style.animation = `float ${duration}s linear infinite`;
            }, Math.random() * 8000);
        });
    }

    startParticleAnimation() {
        this.particles.forEach((particle, index) => {
            setTimeout(() => {
                const duration = Math.random() * 8 + 6;
                particle.style.animation = `float ${duration}s linear infinite`;
            }, Math.random() * 3000);
        });
    }
}

// Плавная прокрутка для якорных ссылок
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Анимации при скролле
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
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

        // Наблюдаем за элементами для анимации
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
}

// Обработка формы контактов перенесена в contact-handler.js

// Эффект печатания для заголовка
class TypewriterEffect {
    constructor() {
        this.title = document.querySelector('.hero-title');
        this.init();
    }

    init() {
        if (this.title) {
            const lines = this.title.querySelectorAll('.title-line');
            lines.forEach((line, index) => {
                line.style.opacity = '0';
                line.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    this.typeText(line, 100);
                }, index * 1000);
            });
        }
    }

    typeText(element, speed) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Параллакс эффект для звезд
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const stars = document.querySelectorAll('.star');
            
            stars.forEach((star, index) => {
                const speed = 0.5 + (index % 3) * 0.1;
                const yPos = -(scrolled * speed);
                star.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Интерактивные анимации
class InteractiveAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.addMouseTracking();
        this.addClickEffects();
        this.addHoverEffects();
        this.addScrollEffects();
    }

    addMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }
        });
    }

    addClickEffects() {
        document.addEventListener('click', (e) => {
            this.createRippleEffect(e);
        });
    }

    createRippleEffect(e) {
        const ripple = document.createElement('div');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${e.clientX - rect.left - size/2}px;
            top: ${e.clientY - rect.top - size/2}px;
            background: radial-gradient(circle, rgba(78, 205, 196, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
            z-index: 1000;
        `;
        
        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addHoverEffects() {
        // Проверяем, мобильное ли устройство
        const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
        
        if (!isMobile) {
            // Добавляем hover эффекты только для десктопа
            const elements = document.querySelectorAll('.portfolio-item, .skill-tag');
            
            elements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    // Добавляем только случайный цвет, transform остается в CSS
                    const colors = ['#4ecdc4', '#ff6b6b', '#45b7d1', '#96ceb4', '#feca57'];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    element.style.boxShadow = `0 10px 30px ${randomColor}40`;
                });
                
                element.addEventListener('mouseleave', () => {
                    element.style.boxShadow = '';
                });
            });
        }
    }

    addScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Параллакс для фона
            document.body.style.backgroundPosition = `center ${rate}px`;
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
        
        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            // Переинициализируем hover эффекты при изменении размера
            this.addHoverEffects();
        });
    }
}

// Анимация загрузки
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.createLoadingScreen();
        this.hideLoadingScreen();
    }

    createLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Загрузка...</div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(loader);
    }

    hideLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.remove();
                    }, 500);
                }
            }, 1000);
        });
    }
}

// Дополнительные анимации
class AdvancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.addTypingEffect();
        this.addParticleTrail();
        this.addRandomAnimations();
        this.addClickAnimations();
    }

    addTypingEffect() {
        const elements = document.querySelectorAll('.skill-tag');
        elements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid #4ecdc4';
            
            setTimeout(() => {
                this.typeText(element, text, 50);
            }, index * 200);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(timer);
                element.style.borderRight = 'none';
            }
        }, speed);
    }

    addParticleTrail() {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.3) { // 30% шанс создания частицы
                this.createTrailParticle(e.clientX, e.clientY);
            }
        });
    }

    createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: #4ecdc4;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: floatUp 2s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }

    addRandomAnimations() {
        setInterval(() => {
            const elements = document.querySelectorAll('.portfolio-item, .skill-tag');
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            
            if (randomElement) {
                randomElement.style.animation = 'elastic 0.5s ease';
                setTimeout(() => {
                    randomElement.style.animation = '';
                }, 500);
            }
        }, 5000);
    }

    addClickAnimations() {
        document.addEventListener('click', (e) => {
            this.createClickBurst(e.clientX, e.clientY);
        });
    }

    createClickBurst(x, y) {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            const angle = (i / 6) * Math.PI * 2;
            const distance = 50;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 6px;
                height: 6px;
                background: #4ecdc4;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: burst 0.8s ease-out forwards;
            `;
            
            particle.style.setProperty('--angle', `${angle}rad`);
            particle.style.setProperty('--distance', `${distance}px`);
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }
}

// Инициализация всех компонентов
document.addEventListener('DOMContentLoaded', () => {
    new StarAnimation();
    new SmoothScroll();
    new ScrollAnimations();
    new TypewriterEffect();
    new ParallaxEffect();
    new InteractiveAnimations();
    new LoadingAnimation();
    new AdvancedAnimations();
});

// Добавляем CSS для анимаций уведомлений и новых эффектов
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    .loader-content {
        text-align: center;
        color: #fff;
    }
    
    .loader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(78, 205, 196, 0.3);
        border-top: 3px solid #4ecdc4;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loader-text {
        font-size: 1.2rem;
        font-weight: 300;
        animation: pulse 2s infinite;
    }
    
    /* Улучшенные анимации для кнопок */
    .nav-btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
        z-index: -1;
        pointer-events: none;
    }
    
    .nav-btn:hover::after {
        width: 200px;
        height: 200px;
    }
    
    /* Дополнительные эффекты для кнопок */
    .nav-btn:active {
        transform: translateY(-1px) scale(1.02);
    }
    
    /* Анимация для портфолио */
    .portfolio-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s;
    }
    
    .portfolio-item:hover::before {
        left: 100%;
    }
    
    /* Эффект печатания для навыков */
    .skill-tag {
        position: relative;
        overflow: hidden;
    }
    
    .skill-tag::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(78, 205, 196, 0.3), transparent);
        transition: left 0.5s;
    }
    
    .skill-tag:hover::before {
        left: 100%;
    }
    
    /* Новые анимации */
    @keyframes burst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(cos(var(--angle)) * var(--distance)), calc(sin(var(--angle)) * var(--distance))) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
    
    /* Эффект печатания */
    .skill-tag {
        overflow: hidden;
        white-space: nowrap;
    }
    
    /* Улучшенные эффекты для кнопок */
    .nav-btn {
        position: relative;
        overflow: hidden;
    }
    
    .nav-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    .nav-btn:hover::before {
        left: 100%;
    }
    
    /* Анимация для заголовков */
    .hero-title .title-line {
        position: relative;
        overflow: hidden;
    }
    
    .hero-title .title-line::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        animation: typewriter 2s ease-in-out infinite;
    }
`;
document.head.appendChild(style);
