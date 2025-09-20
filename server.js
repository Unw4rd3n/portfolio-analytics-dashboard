const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Получаем IP адрес для доступа из сети
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

// Статические файлы
app.use(express.static(path.join(__dirname)));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
app.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIP();
    console.log('\n🚀 Сервер запущен!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📱 Локальный доступ: http://localhost:${PORT}`);
    console.log(`🌐 Сетевой доступ:    http://${localIP}:${PORT}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n💡 Для доступа с других устройств в сети:');
    console.log(`   - Убедитесь, что устройства в одной сети`);
    console.log(`   - Откройте браузер и перейдите по адресу: http://${localIP}:${PORT}`);
    console.log('\n⏹️  Для остановки сервера нажмите Ctrl+C\n');
});

// Обработка ошибок
process.on('SIGINT', () => {
    console.log('\n\n👋 Сервер остановлен. До свидания!');
    process.exit(0);
});
