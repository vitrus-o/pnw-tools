@echo off
echo Setting up PnW Alliance Tracker schedule...
cd /d "%~dp0"
mkdir logs 2>nul

powershell -ExecutionPolicy Bypass -File "%~dp0scripts\setup-schedule.ps1"
echo.
echo Task scheduler setup complete. The alliance tracker will run daily at midnight.
pause