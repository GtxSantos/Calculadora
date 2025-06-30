document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU DE NAVEGAÇÃO RESPONSIVO ---
    const btnMenu = document.querySelector('.btn-menu');
    const navBar = document.querySelector('.navbar');
    const menuLinks = document.querySelector('.menu-links');

    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            navBar.classList.toggle('active');
            menuLinks.classList.toggle('active');
        });
    }

    // --- LÓGICA DA CALCULADORA ---
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('.buttons');
    let isResultDisplayed = false;

    if (buttonsContainer) {
        buttonsContainer.addEventListener('click', (event) => {
            if (!event.target.matches('button')) {
                return;
            }

            const button = event.target;
            const action = button.dataset.action;
            const value = button.dataset.value;

            if (!action) {
                if (display.textContent === '0' || isResultDisplayed) {
                    display.textContent = value;
                    isResultDisplayed = false;
                } else {
                    display.textContent += value;
                }
            }

            if (action === 'clear') {
                display.textContent = '0';
                isResultDisplayed = false;
            }

            if (action === 'calculate') {
                try {
                    const expression = display.textContent.replace(/×/g, '*').replace(/÷/g, '/');
                    const result = new Function('return ' + expression)();
                    display.textContent = result;
                } catch {
                    display.textContent = 'Erro';
                }
                isResultDisplayed = true;
            }
        });
    }

    // --- LÓGICA DA VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                formStatus.textContent = 'Por favor, preencha todos os campos.';
                formStatus.style.color = '#ff5722'; // Cor de erro
                return;
            }

            formStatus.textContent = 'Mensagem enviada com sucesso! Obrigado.';
            formStatus.style.color = 'var(--cor-destaque)'; // Cor de sucesso
            
            contactForm.reset();
        });
    }
});