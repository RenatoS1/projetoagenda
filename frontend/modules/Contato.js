/*
import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        if (!this.form) return;
        this.events();
    }

    events() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate();
        });
    }

    validate() {
        const nomeInput = this.form.querySelector('.form-nome');
        const sobrenomeInput = this.form.querySelector('.form-sobrenome');
        const emailInput = this.form.querySelector('.form-email');
        const telefoneInput = this.form.querySelector('.form-telefone');

        let isValid = true;

        // Limpar mensagens anteriores
        this.clearMessages();

        // Validação do Nome
        if (!nomeInput.value.trim()) {
            this.showMessage('.mensagemNome', 'O nome é obrigatório.');
            isValid = false;
        }

        // Validação do Sobrenome
        if (!sobrenomeInput.value.trim()) {
            this.showMessage('.mensagemSobreNome', 'O sobrenome é obrigatório.');
            isValid = false;
        }

        // Validação do Email
        if (emailInput.value && !validator.isEmail(emailInput.value)) {
            this.showMessage('.mensagemEmail', 'E-mail inválido.');
            isValid = false;
        }

        // Validação do Telefone
        if (!telefoneInput.value.trim() && !emailInput.value.trim()) {
            this.showMessage('.mensagemTel', 'Pelo menos um contato (telefone ou e-mail) deve ser preenchido.');
            isValid = false;
        } else if (telefoneInput.value && !validator.isMobilePhone(telefoneInput.value, 'pt-BR')) {
            this.showMessage('.mensagemTel', 'Número de telefone inválido.');
            isValid = false;
        }

        // Se todas as validações passaram, envia o formulário
        if (isValid) this.form.submit();
    }

    showMessage(selector, message) {
        const element = this.form.querySelector(selector);
        if (element) {
            element.textContent = message;
            element.style.color = 'red';
        }
    }

    clearMessages() {
        this.form.querySelectorAll('p').forEach((p) => (p.textContent = ''));
    }
}

*/