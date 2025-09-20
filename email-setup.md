# 📧 Настройка отправки сообщений

## 🚀 Быстрые решения

### 1. EmailJS (Рекомендуется - бесплатно)

1. Зайдите на [emailjs.com](https://emailjs.com)
2. Создайте аккаунт
3. Подключите ваш email (Gmail, Outlook, etc.)
4. Получите:
   - Public Key
   - Service ID
   - Template ID

5. Замените в `contact-handler.js`:

```javascript
async sendMessage(data) {
    // Замените на ваши данные
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';
    
    try {
        await emailjs.send(serviceId, templateId, {
            from_name: data.name,
            from_email: data.email,
            message: data.message,
            to_email: 'nickfgh@mail.ru' // ваш email
        }, publicKey);
        
        return true;
    } catch (error) {
        throw new Error('Ошибка отправки');
    }
}
```

6. Добавьте в HTML перед `</head>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

### 2. Formspree (Простое решение)

1. Зайдите на [formspree.io](https://formspree.io)
2. Создайте форму
3. Получите endpoint URL
4. Замените в `contact-handler.js`:

```javascript
async sendMessage(data) {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Ошибка отправки');
    }
}
```

### 3. Netlify Forms (Если хостите на Netlify)

1. Добавьте в форму атрибут `netlify`:
```html
<form class="contact-form" netlify>
```

2. Netlify автоматически обработает форму!

### 4. Собственный сервер

Создайте файл `email-server.js`:

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Настройка почты
const transporter = nodemailer.createTransporter({
    service: 'gmail', // или другой провайдер
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
    }
});

app.post('/send-email', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        await transporter.sendMail({
            from: email,
            to: 'nickfgh@mail.ru',
            subject: `Сообщение от ${name}`,
            text: message
        });
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка отправки' });
    }
});

app.listen(3001, () => {
    console.log('Email сервер запущен на порту 3001');
});
```

## 🔧 Текущее состояние

Сейчас форма работает в демо-режиме:
- ✅ Валидация полей
- ✅ Красивые уведомления
- ✅ Анимация загрузки
- ❌ Реальная отправка (только в консоль)

## 💡 Рекомендации

**Для быстрого старта:** EmailJS
**Для простоты:** Formspree  
**Для контроля:** Собственный сервер

Выберите любой вариант и следуйте инструкциям выше!
