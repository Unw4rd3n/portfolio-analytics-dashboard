@echo off
echo.
echo ========================================
echo  🌍 Запуск с публичной ссылкой 🌍
echo ========================================
echo.

REM Проверяем, установлен ли Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js не найден!
    echo.
    echo 📥 Скачайте и установите Node.js с https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Проверяем, установлены ли зависимости
if not exist "node_modules" (
    echo 📦 Устанавливаем зависимости...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Ошибка при установке зависимостей!
        pause
        exit /b 1
    )
    echo.
)

echo 🌍 Запускаем сервер с публичным туннелем...
echo.
echo ⏳ Создаем публичную ссылку...
echo    (Это может занять несколько секунд)
echo.

REM Запускаем сервер с туннелем
node server-with-tunnel.js

pause
