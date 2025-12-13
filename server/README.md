# UTH-ConfMS Server

FastAPI server cho hệ thống quản lý hội nghị (Conference Management System).

## Yêu cầu

- Python 3.11+
- PostgreSQL
- Các dependencies trong `requirements.txt`

## Cài đặt

1. Tạo virtual environment (nếu chưa có):
```bash
python -m venv venv
```

2. Kích hoạt virtual environment:
```bash
# macOS/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

3. Cài đặt dependencies:
```bash
pip install -r requirements.txt
```

4. Tạo file `.env` trong thư mục `server` với các biến môi trường:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=ConfMS123
SECRET_KEY=your-secret-key-here
```

## Chạy Server

### Cách 1: Dùng script (Khuyến nghị)

**macOS/Linux:**
```bash
./run.sh
```

**Windows:**
```bash
run.bat
```

### Cách 2: Dùng FastAPI CLI

```bash
cd src
export PYTHONPATH=$(pwd):$PYTHONPATH  # macOS/Linux
# hoặc
set PYTHONPATH=%CD%;%PYTHONPATH%       # Windows

fastapi dev main.py
```

### Cách 3: Dùng uvicorn trực tiếp

```bash
cd src
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Cách 4: Dùng uvicorn từ thư mục server

```bash
# macOS/Linux
PYTHONPATH=src python -m uvicorn src.main:app --reload

# Windows
set PYTHONPATH=src
python -m uvicorn src.main:app --reload
```

## Truy cập API

- **API Base URL**: http://localhost:8000
- **Interactive API Docs (Swagger UI)**: http://localhost:8000/docs
- **Alternative API Docs (ReDoc)**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /auth/register` - Đăng ký user mới
- `POST /auth/login` - Đăng nhập
- `POST /auth/refresh` - Làm mới token
- `POST /auth/initial-chair-setup` - Tạo chair đầu tiên

### User Management (CRUD)
- `POST /users` - Tạo user mới
- `GET /users` - Danh sách users (có phân trang)
- `GET /users/{user_id}` - Chi tiết user
- `PUT /users/{user_id}` - Cập nhật user
- `DELETE /users/{user_id}` - Xóa user
- `PATCH /users/{user_id}/activate` - Kích hoạt user
- `PATCH /users/{user_id}/deactivate` - Vô hiệu hóa user
- `PATCH /users/{user_id}/roles` - Cập nhật roles

## Cấu trúc Project

```
server/
├── src/
│   ├── api/              # API layer (controllers, schemas)
│   ├── domain/           # Domain layer (models, exceptions)
│   ├── infrastructure/   # Infrastructure layer (database, repositories)
│   ├── services/         # Service layer (business logic)
│   ├── config.py         # Configuration
│   ├── dependency_container.py  # Dependency injection
│   └── main.py           # Application entry point
├── migrations/           # Alembic migrations
├── requirements.txt      # Python dependencies
├── run.sh               # Run script (macOS/Linux)
└── run.bat              # Run script (Windows)
```

## Troubleshooting

### Lỗi "Path does not exist main"
- Đảm bảo đang chạy từ thư mục `src` hoặc set PYTHONPATH đúng
- Sử dụng `fastapi dev main.py` (có extension .py)

### Lỗi "No module named 'infrastructure'"
- Set PYTHONPATH: `export PYTHONPATH=$(pwd):$PYTHONPATH` (từ thư mục src)
- Hoặc dùng script `run.sh`/`run.bat` đã có sẵn cấu hình

### Lỗi kết nối database
- Kiểm tra PostgreSQL đang chạy
- Kiểm tra thông tin trong file `.env`
- Kiểm tra database đã được tạo chưa

