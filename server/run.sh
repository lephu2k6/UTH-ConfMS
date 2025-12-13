#!/bin/bash

# Script để chạy FastAPI server
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/src"

# Export PYTHONPATH để Python tìm được các modules
export PYTHONPATH="$SCRIPT_DIR/src:$PYTHONPATH"

# Kiểm tra xem có fastapi CLI không
if command -v fastapi &> /dev/null; then
    # Sử dụng FastAPI CLI (FastAPI 0.100+)
    # Chạy từ thư mục src với PYTHONPATH đã set
    fastapi dev main.py
else
    # Fallback về uvicorn
    python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
fi

