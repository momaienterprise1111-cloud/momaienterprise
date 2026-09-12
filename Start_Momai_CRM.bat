@echo off
title Starting Momai Enterprise CRM...
cd /d "%~dp0"

:: Check if Node server is running on port 3000; if not, launch it in background
netstat -ano | findstr :3000 >nul
if errorlevel 1 (
    start /min "Momai CRM Local Server" node server.js
    timeout /t 2 /nobreak >nul
)

:: Launch as a standalone Desktop App Window using Edge or Chrome
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="http://localhost:3000/"
    exit
)
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="http://localhost:3000/"
    exit
)

:: Fallback: Open in default browser
start http://localhost:3000/
exit
