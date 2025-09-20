@echo off
echo.
echo ========================================
echo    🌟 Запуск сайта-портфолио 🌟
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

echo 🚀 Запускаем сервер...
echo.
echo ⏳ Пожалуйста, подождите...
echo.

REM Запускаем сервер
node server.js

pause
