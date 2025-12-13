@echo off
REM Script để chạy FastAPI server trên Windows
cd /d "%~dp0src"

REM Set PYTHONPATH để Python tìm được các modules
set PYTHONPATH=%~dp0src;%PYTHONPATH%

REM Thử dùng FastAPI CLI trước, nếu không có thì dùng uvicorn
where fastapi >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    fastapi dev main.py
) else (
    python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
)

