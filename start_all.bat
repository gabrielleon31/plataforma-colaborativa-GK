@echo off
title Plataforma Colaborativa - Arranque Total

echo Iniciando Backend (Daphne)...
start cmd /k "cd /d backend && call venv\Scripts\activate.bat && daphne plataforma.asgi:application"

echo Iniciando Frontend (React)...
start cmd /k "cd /d frontend && npm start"

echo Todo arrancando... 
exit
