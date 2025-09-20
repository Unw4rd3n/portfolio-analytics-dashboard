// Обработчик формы контактов с EmailJS
class ContactHandler {
    constructor() {
        this.form = document.querySelector('.contact-form');
        
        // 🔑 НАСТРОЙКИ EMAILJS - ЗАМЕНИТЕ НА СВОИ КЛЮЧИ
        this.config = {
            serviceId: 'service_snad316',        // Замените на ваш Service ID
            templateId: 'template_ynizv1c',      // Замените на ваш Template ID  
            publicKey: 'Dyvdc5SstIoFQA2NV',        // Замените на ваш Public Key
            toEmail: 'nickfgh@mail.ru'           // Ваш email для получения сообщений
        };
        
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name') || this.form.querySelector('input[type="text"]').value,
            email: formData.get('email') || this.form.querySelector('input[type="email"]').value,
            message: formData.get('message') || this.form.querySelector('textarea').value
        };

        // Валидация
        if (!data.name || !data.email || !data.message) {
            this.showNotification('Пожалуйста, заполните все поля', 'error');
            return;
        }

        if (!this.isValidEmail(data.email)) {
            this.showNotification('Пожалуйста, введите корректный email', 'error');
            return;
        }

        try {
            // Показываем загрузку
            this.showLoading(true);
            
            // Отправляем данные (здесь можно добавить реальную отправку на сервер)
            await this.sendMessage(data);
            
            this.showNotification('Сообщение отправлено успешно!', 'success');
            this.form.reset();
            
        } catch (error) {
            console.error('Ошибка отправки:', error);
            this.showNotification('Ошибка отправки сообщения. Попробуйте еще раз.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async sendMessage(data) {
        // Проверяем, что EmailJS загружен
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS не загружен. Проверьте подключение скрипта.');
        }

        // Проверяем, что ключи настроены
        if (this.config.serviceId === 'YOUR_SERVICE_ID' || 
            this.config.templateId === 'YOUR_TEMPLATE_ID' || 
            this.config.publicKey === 'YOUR_PUBLIC_KEY') {
            throw new Error('Пожалуйста, настройте ваши EmailJS ключи в файле contact-handler.js');
        }

        try {
            // Отправляем через EmailJS
            const result = await emailjs.send(
                this.config.serviceId,
                this.config.templateId,
                {
                    from_name: data.name,
                    from_email: data.email,
                    message: data.message,
                    to_email: this.config.toEmail,
                    reply_to: data.email
                },
                this.config.publicKey
            );

            console.log('Сообщение отправлено:', result);
            return result;
            
        } catch (error) {
            console.error('Ошибка EmailJS:', error);
            throw new Error('Ошибка отправки сообщения через EmailJS');
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showLoading(show) {
        const submitBtn = this.form.querySelector('.submit-btn');
        if (show) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
        } else {
            submitBtn.innerHTML = 'Отправить';
            submitBtn.disabled = false;
        }
    }

    showNotification(message, type = 'info') {
        // Удаляем предыдущие уведомления
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#45b7d1'};
            color: white;
            border-radius: 10px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }
}

// Добавляем CSS для уведомлений
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Инициализируем EmailJS и обработчик формы
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем EmailJS с вашим Public Key
    // Замените 'YOUR_PUBLIC_KEY' на ваш реальный ключ
    emailjs.init('Dyvdc5SstIoFQA2NV');
    
    // Создаем обработчик формы
    new ContactHandler();
});
