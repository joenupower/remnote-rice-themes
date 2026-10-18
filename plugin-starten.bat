@echo off
REM Startet das RemNote-Plugin "Rice Themes" auf http://localhost:8082
cd /d "%~dp0"
where npm 1>NUL 2>NUL
if errorlevel 1 (
  echo Node.js ist nicht installiert. Bitte zuerst die LTS-Version von https://nodejs.org installieren.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Erster Start: installiere Abhaengigkeiten ...
  call npm install
)
echo.
echo Plugin laeuft auf http://localhost:8082 - dieses Fenster offen lassen.
echo.
call npm run dev
pause
