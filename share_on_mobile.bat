@echo off
COLOR 0D
echo.
echo ======================================================
echo    PORTFOLIO 2026 - SECURE MOBILE ACCESS (CF)
echo ======================================================
echo.

echo [!] IMPORTANT INSTRUCTIONS:
echo 1. Two separate cloudflared windows will open.
echo 2. COPY the generated URL from the BACKEND window (localhost:5000).
echo 3. Update the API_BASE_URL in your code with that URL.
echo 4. OPEN the generated URL from the FRONTEND window (localhost:5173) on your mobile.
echo.
pause

echo [+] Starting Cloudflare Tunnel for Backend (5000)...
start "CF BACKEND TUNNEL" cmd /k "cloudflared tunnel --url http://localhost:5000"

echo [+] Starting Cloudflare Tunnel for Frontend (5173)...
start "CF FRONTEND TUNNEL" cmd /k "cloudflared tunnel --url http://localhost:5173"

echo.
echo Tunnels are initializing. Look for the "trycloudflare.com" URLs in the new windows.
echo.
pause
