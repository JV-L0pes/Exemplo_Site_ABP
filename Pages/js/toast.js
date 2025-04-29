// Sistema de Toast para mensagens de feedback
function showToast(message, type = 'info') {
    // Criar container de toast se não existir
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Criar elemento toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${getIconForType(type)}"></i>
        <span>${message}</span>
    `;

    // Adicionar ao container
    toastContainer.appendChild(toast);

    // Mostrar toast com animação
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Remover após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Função auxiliar para escolher o ícone baseado no tipo de mensagem
function getIconForType(type) {
    switch (type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        default:
            return 'fa-info-circle';
    }
}

// Sistema de Toast compartilhado
class Toast {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        this.container.appendChild(toast);

        // Adiciona a animação de entrada
        requestAnimationFrame(() => {
            toast.style.animation = 'slideIn 0.3s ease-in-out';
        });

        // Remove o toast após a duração especificada
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease-in-out';
            toast.addEventListener('animationend', () => {
                this.container.removeChild(toast);
            });
        }, duration);
    }

    success(message, duration) {
        this.show(message, 'success', duration);
    }

    error(message, duration) {
        this.show(message, 'error', duration);
    }

    warning(message, duration) {
        this.show(message, 'warning', duration);
    }

    info(message, duration) {
        this.show(message, 'info', duration);
    }
}

// Cria uma instância global do Toast
const toast = new Toast(); 