// Sistema de Notificações
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.notificationBtn = document.querySelector('.notification-btn');
        this.setupNotificationButton();
        this.loadNotifications();
    }

    setupNotificationButton() {
        // Criar o dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'notification-dropdown';
        dropdown.innerHTML = `
            <div class="notification-header">
                <h3>Notificações</h3>
                <button class="mark-all-read">Marcar todas como lidas</button>
            </div>
            <div class="notification-list"></div>
        `;

        // Adicionar o dropdown após o botão
        this.notificationBtn.parentNode.insertBefore(dropdown, this.notificationBtn.nextSibling);

        // Adicionar evento de clique no botão
        this.notificationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notification-btn') && !e.target.closest('.notification-dropdown')) {
                dropdown.classList.remove('active');
            }
        });

        // Marcar todas como lidas
        dropdown.querySelector('.mark-all-read').addEventListener('click', () => {
            this.markAllAsRead();
        });
    }

    loadNotifications() {
        // Simular carregamento de notificações (substitua por sua lógica real)
        this.notifications = [
            {
                id: 1,
                title: 'Nova atualização do sistema',
                message: 'Uma nova versão do sistema está disponível',
                time: '5 minutos atrás',
                read: false,
                type: 'info'
            },
            {
                id: 2,
                title: 'Alerta de manutenção',
                message: 'Manutenção programada para amanhã às 22h',
                time: '1 hora atrás',
                read: false,
                type: 'warning'
            },
            {
                id: 3,
                title: 'Novo usuário registrado',
                message: 'João Silva foi adicionado ao sistema',
                time: '2 horas atrás',
                read: true,
                type: 'success'
            }
        ];

        this.updateNotificationList();
        this.updateNotificationBadge();
    }

    updateNotificationList() {
        const list = document.querySelector('.notification-list');
        list.innerHTML = '';

        if (this.notifications.length === 0) {
            list.innerHTML = '<div class="no-notifications">Nenhuma notificação</div>';
            return;
        }

        this.notifications.forEach(notification => {
            const item = document.createElement('div');
            item.className = `notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`;
            item.innerHTML = `
                <div class="notification-content">
                    <h4>${notification.title}</h4>
                    <p>${notification.message}</p>
                    <span class="notification-time">${notification.time}</span>
                </div>
                ${!notification.read ? '<div class="notification-dot"></div>' : ''}
            `;

            item.addEventListener('click', () => {
                this.markAsRead(notification.id);
            });

            list.appendChild(item);
        });
    }

    updateNotificationBadge() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = this.notificationBtn.querySelector('.notification-badge');
        
        if (unreadCount > 0) {
            if (!badge) {
                const newBadge = document.createElement('span');
                newBadge.className = 'notification-badge';
                newBadge.textContent = unreadCount;
                this.notificationBtn.appendChild(newBadge);
            } else {
                badge.textContent = unreadCount;
            }
        } else if (badge) {
            badge.remove();
        }
    }

    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.updateNotificationList();
            this.updateNotificationBadge();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.updateNotificationList();
        this.updateNotificationBadge();
    }

    addNotification(notification) {
        this.notifications.unshift(notification);
        this.updateNotificationList();
        this.updateNotificationBadge();
    }
}

// Inicializar o sistema de notificações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.notificationSystem = new NotificationSystem();
}); 