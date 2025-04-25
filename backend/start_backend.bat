@echo off
cd /d "%~dp0"

echo Activando entorno virtual...
call venv\Scripts\activate.bat

echo Iniciando servidor Daphne...
daphne plataforma.asgi:application

pause
