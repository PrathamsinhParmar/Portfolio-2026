@echo off
COLOR 0B
echo.
echo ======================================================
echo    PRATHAMSINH PARMAR - PORTFOLIO 2026 STARTUP
echo ======================================================
echo.

echo [+] Starting Backend Server...
start "PORTFOLIO BACKEND" cmd /k "cd server && node index.js"

echo [+] Starting Frontend Client...
start "PORTFOLIO FRONTEND" cmd /k "cd client_app && npm run dev -- --host"

echo.
echo ------------------------------------------------------
echo  Backend:  http://localhost:5000
echo  Frontend: http://localhost:5173
echo ------------------------------------------------------
echo.
echo Project is booting up in separate terminal windows.
echo Keep this window open if you want to see these logs.
echo.
pause
