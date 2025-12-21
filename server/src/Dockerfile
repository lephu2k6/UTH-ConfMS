# 1. Tải môi trường Python có sẵn trên mạng về
FROM python:3.11-slim

# 2. Đặt thư mục làm việc bên trong Docker là /app
WORKDIR /app

# 3. Copy file danh sách thư viện vào Docker
COPY requirements.txt .

# 4. Ra lệnh cho Docker cài đặt các thư viện này
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy toàn bộ code (bao gồm main.py) vào trong Docker
COPY . .

# 6. Mở cổng 8000 để máy ngoài có thể truy cập
EXPOSE 8000

# 7. Lệnh để khởi động Backend khi bật Docker lên
# --reload giúp server tự khởi động lại khi bạn sửa code (chế độ dev)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]