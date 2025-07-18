@echo off
echo.
echo ========================================
echo  Visual WebdriverIO Test Runner
echo ========================================
echo.

echo Starting development server...
start /b npm run dev

echo Waiting for server to start...
timeout /t 5 /nobreak >nul

echo.
echo Opening Chrome browser for visual testing...
echo You will see Chrome open and automatically interact with your todo app!
echo.

npm run test:visual

echo.
echo ========================================
echo  Visual Testing Complete!
echo ========================================
echo.
pause
