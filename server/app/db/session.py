from sqlmodel import SQLModel, create_engine
from app.core.config import settings
from sqlalchemy import text

# Tạo engine
engine = create_engine(settings.DATABASE_URL, echo=True)


def connection():
    try:
        with engine.connect() as conn:
            print("Kết Nối Thành Công :)))) !!!") 
    except Exception as e:
        print("Kết nối thất bại", e)
