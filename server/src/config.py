from dotenv import load_dotenv
import os

load_dotenv()  

class Settings:
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "5432")
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "123456")
    DB_NAME = os.getenv("DB_NAME", "ConfMS123")

    @property
    def DATABASE_URL(self):
        return (
            f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )
    # --- Cấu hình Bảo mật  ---
    # KHÓA BÍ MẬT DÙNG CHO JWT
    SECRET_KEY = os.getenv("SECRET_KEY") 
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 
    REFRESH_TOKEN_EXPIRE_DAYS = 60 * 24 * 10
settings = Settings()
