const express = require('express');
const ngrok = require('ngrok');
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

// Запуск сервера с туннелем
async function startServer() {
    try {
        // Запускаем локальный сервер
        app.listen(PORT, '0.0.0.0', async () => {
            const localIP = getLocalIP();
            
            console.log('\n🚀 Сервер запущен!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`📱 Локальный доступ: http://localhost:${PORT}`);
            console.log(`🌐 Сетевой доступ:    http://${localIP}:${PORT}`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            
            console.log('\n🌍 Создаем публичный туннель...');
            console.log('⏳ Пожалуйста, подождите...\n');
            
            try {
                // Создаем публичный туннель
                const url = await ngrok.connect({
                    addr: PORT,
                    region: 'us' // Можно изменить на 'eu', 'ap', 'au', 'sa', 'jp', 'in'
                });
                
                console.log('🎉 Туннель создан успешно!');
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log(`🌍 Публичная ссылка: ${url}`);
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log('\n💡 Теперь вы можете:');
                console.log(`   - Поделиться ссылкой с клиентами: ${url}`);
                console.log('   - Открыть сайт на любом устройстве');
                console.log('   - Показать портфолио в любой точке мира');
                console.log('\n⏹️  Для остановки нажмите Ctrl+C\n');
                
            } catch (tunnelError) {
                console.log('❌ Ошибка при создании туннеля:');
                console.log(tunnelError.message);
                console.log('\n💡 Попробуйте:');
                console.log('   1. Проверить интернет-соединение');
                console.log('   2. Запустить снова через несколько минут');
                console.log('   3. Использовать локальный доступ для тестирования');
            }
        });
        
    } catch (error) {
        console.error('❌ Ошибка запуска сервера:', error.message);
        process.exit(1);
    }
}

// Обработка завершения
process.on('SIGINT', async () => {
    console.log('\n\n🛑 Останавливаем сервер и туннель...');
    try {
        await ngrok.kill();
        console.log('👋 Все остановлено. До свидания!');
    } catch (error) {
        console.log('👋 Сервер остановлен. До свидания!');
    }
    process.exit(0);
});

// Запускаем сервер
startServer();
