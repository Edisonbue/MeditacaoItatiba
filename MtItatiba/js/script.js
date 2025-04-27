// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const modalTermos = document.getElementById('modal-termos');
    const modalPrivacidade = document.getElementById('modal-privacidade');
    const modalCookies = document.getElementById('modal-cookies');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const termoLink = document.getElementById('termos-uso');
    const privacidadeLink = document.getElementById('politica-privacidade');
    const cookiesLink = document.getElementById('politica-cookies');
    const depoimentoSlides = document.querySelectorAll('.depoimento-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.depoimentos-dots');
    const contactForm = document.getElementById('formulario-contato');
    const newsletterForm = document.getElementById('newsletter-form');

    // Variáveis
    let currentSlide = 0;
    
    // Funções
    
    // Função para mostrar o cookie consent se não foi aceito
    function checkCookieConsent() {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieConsent.classList.add('show');
            }, 2000);
        }
    }
    
    // Função para aceitar cookies
    function acceptCookies() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('show');
    }
    
    // Função para abrir modal
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Função para fechar modal
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Função para alternar o menu mobile
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
    }
    
    // Função para fechar o menu ao clicar em um link
    function closeMenuOnClick() {
        if (window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            menu.classList.remove('active');
        }
    }
    
    // Função para mudar o estilo do header ao rolar
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Função para mostrar um slide específico
    function showSlide(n) {
        // Remover classe active de todos os slides
        depoimentoSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Atualizar o índice do slide atual
        currentSlide = (n + depoimentoSlides.length) % depoimentoSlides.length;
        
        // Adicionar classe active ao slide atual
        depoimentoSlides[currentSlide].classList.add('active');
        
        // Atualizar os dots
        updateDots();
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Função para criar os dots de navegação
    function createDots() {
        for (let i = 0; i < depoimentoSlides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.setAttribute('data-slide', i);
            dot.addEventListener('click', () => {
                showSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
        updateDots();
    }
    
    // Função para atualizar os dots
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Função para iniciar o carrossel automático
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 5000);
    }
    
    // Função para parar o carrossel automático
    function stopCarousel() {
        clearInterval(carouselInterval);
    }
    
    // Função para animar elementos ao rolar
    function animateOnScroll() {
        const elements = document.querySelectorAll('.beneficio, .diferencial, .stat, .passo, .depoimento');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Função para enviar formulário de contato
    function handleContactForm(e) {
        e.preventDefault();
        
        // Simulação de envio de formulário
        const formData = new FormData(contactForm);
        const formValues = {};
        
        for (let [key, value] of formData.entries()) {
            formValues[key] = value;
        }
        
        // Aqui você adicionaria o código para enviar os dados para um servidor
        console.log('Formulário de contato enviado:', formValues);
        
        // Feedback para o usuário
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    }
    
    // Função para enviar formulário de newsletter
    function handleNewsletterForm(e) {
        e.preventDefault();
        
        // Simulação de envio de formulário
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Aqui você adicionaria o código para enviar os dados para um servidor
        console.log('Inscrição na newsletter:', email);
        
        // Feedback para o usuário
        alert('Inscrição realizada com sucesso! Você receberá nossas novidades em breve.');
        e.target.reset();
    }
    
    // Inicializações e Event Listeners
    
    // Verificar cookie consent
    checkCookieConsent();
    
    // Inicializar o carrossel de depoimentos
    if (depoimentoSlides.length > 0) {
        showSlide(0);
        createDots();
        startCarousel();
        
        // Event listeners para os botões do carrossel
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopCarousel();
                startCarousel();
            });
            
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopCarousel();
                startCarousel();
            });
        }
    }
    
    // Event listener para o botão de aceitar cookies
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', acceptCookies);
    }
    
    // Event listeners para os links de termos e políticas
    if (termoLink) {
        termoLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(modalTermos);
        });
    }
    
    if (privacidadeLink) {
        privacidadeLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(modalPrivacidade);
        });
    }
    
    if (cookiesLink) {
        cookiesLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(modalCookies);
        });
    }
    
    // Event listeners para fechar modais
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Event listener para o toggle do menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Event listeners para os links do menu
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenuOnClick);
    });
    
    // Event listener para o scroll
    window.addEventListener('scroll', () => {
        handleScroll();
        animateOnScroll();
    });
    
    // Iniciar a animação ao carregar a página
    animateOnScroll();
    
    // Event listener para o formulário de contato
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Event listener para o formulário de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
    
    // Smooth scroll para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Adicionar classe animate aos elementos visíveis na carga inicial
    setTimeout(animateOnScroll, 300);
    
    // Adicionar estilos CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        .beneficio, .diferencial, .stat, .passo, .depoimento {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .beneficio.animate, .diferencial.animate, .stat.animate, .passo.animate, .depoimento.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
