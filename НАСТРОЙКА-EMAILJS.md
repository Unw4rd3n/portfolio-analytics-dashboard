# 🔑 Настройка EmailJS - Простая инструкция

## 📋 Что нужно сделать:

### 1. Зарегистрируйтесь на EmailJS
- Зайдите на [emailjs.com](https://emailjs.com)
- Нажмите "Sign Up" и создайте аккаунт
- Подтвердите email

### 2. Подключите ваш email
- В панели управления нажмите "Email Services"
- Выберите ваш провайдер (Gmail, Outlook, Yahoo и т.д.)
- Следуйте инструкциям для подключения
- **Запомните Service ID** (например: `service_abc123`)

### 3. Создайте шаблон письма
- Перейдите в "Email Templates"
- Нажмите "Create New Template"
- Используйте этот шаблон:

```
Тема: Новое сообщение от {{from_name}}

От: {{from_name}} ({{from_email}})
Email: {{from_email}}

Сообщение:
{{message}}

---
Это сообщение отправлено с вашего сайта-портфолио.
```

- **Запомните Template ID** (например: `template_xyz789`)

### 4. Получите Public Key
- Перейдите в "Account" → "General"
- Найдите "Public Key"
- **Скопируйте Public Key** (например: `abc123def456`)

### 5. Замените ключи в коде

Откройте файл `contact-handler.js` и замените:

```javascript
// Строка 8-12:
this.config = {
    serviceId: 'YOUR_SERVICE_ID',        // ← Замените на ваш Service ID
    templateId: 'YOUR_TEMPLATE_ID',      // ← Замените на ваш Template ID  
    publicKey: 'YOUR_PUBLIC_KEY',        // ← Замените на ваш Public Key
    toEmail: 'nickfgh@mail.ru'           // ← Ваш email (уже настроен)
};

// Строка 194:
emailjs.init('YOUR_PUBLIC_KEY');        // ← Замените на ваш Public Key
```

## ✅ Пример готовой настройки:

```javascript
this.config = {
    serviceId: 'service_abc123',
    templateId: 'template_xyz789', 
    publicKey: 'abc123def456',
    toEmail: 'nickfgh@mail.ru'
};

emailjs.init('abc123def456');
```

## 🚀 Готово!

После настройки:
1. Сохраните файл
2. Запустите сайт
3. Протестируйте форму
4. Проверьте почту - сообщения должны приходить!

## ❓ Если что-то не работает:

1. **Проверьте консоль браузера** (F12) на ошибки
2. **Убедитесь, что все ключи заменены** правильно
3. **Проверьте настройки EmailJS** в панели управления
4. **Убедитесь, что email подтвержден** в EmailJS

## 💡 Полезные ссылки:

- [EmailJS Dashboard](https://dashboard.emailjs.com)
- [Документация EmailJS](https://www.emailjs.com/docs/)
- [Примеры шаблонов](https://www.emailjs.com/docs/templates/)

---
**Время настройки: 5-10 минут** ⏱️
